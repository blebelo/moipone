import { ResidenceType, SexType, VisitReason } from "@/lib/common/data";
import type { IVisit } from "@/providers/VisitProvider/context";
import type { IVisitor } from "@/providers/VisitorProvider/context";

export type AnalyticsRange = 7 | 14 | 30;

export interface AnalyticsBreakdownItem {
  name: string;
  value: number;
}

const labelsFor = (values: Record<string, { value: number; label: string }>) => {
  return Object.fromEntries(
    Object.values(values).map(({ value, label }) => [value, label]),
  ) as Record<number, string>;
};

const visitReasonLabels = labelsFor(VisitReason);
const sexLabels = labelsFor(SexType);
const residenceLabels = labelsFor(ResidenceType);

const localDayKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const dayKey = (value?: string | null) => {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : localDayKey(date);
};

export const visitTime = (visit: IVisit) => {
  return visit.checkinDate ?? null;
};

export const dailyTrend = (visits: IVisit[], days: AnalyticsRange, now = new Date()) => {
  const counts = new Map<string, number>();
  for (const visit of visits) {
    const key = dayKey(visitTime(visit));
    if (key) counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  return Array.from({ length: days }, (_, index) => {
    const date = new Date(now);
    date.setDate(date.getDate() - (days - index - 1));
    const key = localDayKey(date);
    return {
      date: key,
      label: date.toLocaleDateString("en-ZA", { day: "numeric", month: "short" }),
      visits: counts.get(key) ?? 0,
    };
  });
};

export const hourlyDistribution = (visits: IVisit[]) => {
  const buckets = Array.from({ length: 12 }, (_, index) => ({
    hour: `${String(index + 7).padStart(2, "0")}:00`,
    visits: 0,
  }));

  for (const visit of visits) {
    const value = visitTime(visit);
    if (!value) continue;
    const hour = new Date(value).getHours();
    const bucket = buckets[hour - 7];
    if (bucket) bucket.visits += 1;
  }

  return buckets;
};

export const countBy = <T,>(
  items: T[],
  pick: (item: T) => number | undefined | null,
  labels: Record<number, string>,
): AnalyticsBreakdownItem[] => {
  const counts = new Map<string, number>();
  for (const item of items) {
    const value = pick(item);
    const label = value == null ? "Not specified" : (labels[value] ?? "Unknown");
    counts.set(label, (counts.get(label) ?? 0) + 1);
  }
  return Array.from(counts, ([name, value]) => ({ name, value })).sort(
    (left, right) => right.value - left.value,
  );
};

export const ageBand = (dateOfBirth?: string, now = new Date()) => {
  if (!dateOfBirth) return "Unknown";
  const date = new Date(dateOfBirth);
  if (Number.isNaN(date.getTime())) return "Unknown";

  let age = now.getFullYear() - date.getFullYear();
  if (now < new Date(now.getFullYear(), date.getMonth(), date.getDate())) age -= 1;
  if (age < 18) return "Under 18";
  if (age <= 24) return "18-24";
  if (age <= 35) return "25-35";
  if (age <= 50) return "36-50";
  return "51+";
};

export const averageDurationMinutes = (visits: IVisit[]) => {
  const durations = visits
    .filter((visit) => visit.checkOutDate && visitTime(visit))
    .map((visit) =>
      (new Date(visit.checkOutDate!).getTime() - new Date(visitTime(visit)!).getTime()) /
      60_000,
    )
    .filter((minutes) => minutes >= 0 && minutes < 24 * 60);

  if (durations.length === 0) return null;
  return Math.round(durations.reduce((total, minutes) => total + minutes, 0) / durations.length);
};

export const returningVisitorCount = (visits: IVisit[]) => {
  const counts = new Map<string, number>();
  for (const visit of visits) {
    counts.set(visit.visitorId, (counts.get(visit.visitorId) ?? 0) + 1);
  }
  return Array.from(counts.values()).filter((count) => count > 1).length;
};

export const buildAnalytics = (
  visits: IVisit[],
  visitors: IVisitor[],
  range: AnalyticsRange,
  now = new Date(),
) => {
  const today = localDayKey(now);
  const firstDay = new Date(now);
  firstDay.setDate(firstDay.getDate() - range + 1);
  const firstDayKey = localDayKey(firstDay);
  const rangeVisits = visits.filter((visit) => {
    const key = dayKey(visitTime(visit));
    return key >= firstDayKey && key <= today;
  });
  const visitorIds = new Set(rangeVisits.map((visit) => visit.visitorId));
  const profileVisitors = visitors.filter((visitor) => visitor.id && visitorIds.has(visitor.id));
  const unique = visitorIds.size;
  const average = averageDurationMinutes(rangeVisits);

  const ageCounts = new Map<string, number>();
  for (const visitor of profileVisitors) {
    const label = ageBand(visitor.dateOfBirth, now);
    ageCounts.set(label, (ageCounts.get(label) ?? 0) + 1);
  }

  const wardCounts = new Map<string, number>();
  for (const visitor of profileVisitors) {
    const label = visitor.wardNumber == null ? "Not specified" : `Ward ${visitor.wardNumber}`;
    wardCounts.set(label, (wardCounts.get(label) ?? 0) + 1);
  }

  return {
    total: rangeVisits.length,
    unique,
    returning: returningVisitorCount(rangeVisits),
    averageDuration: average,
    perDay: (rangeVisits.length / range).toFixed(1),
    trend: dailyTrend(rangeVisits, range, now),
    hourly: hourlyDistribution(rangeVisits),
    reasons: countBy(rangeVisits, (visit) => visit.visitReason, visitReasonLabels),
    sex: countBy(profileVisitors, (visitor) => visitor.sex, sexLabels),
    residence: countBy(profileVisitors, (visitor) => visitor.residence, residenceLabels),
    ages: Array.from(ageCounts, ([name, value]) => ({ name, value })).sort(
      (left, right) => right.value - left.value,
    ),
    wards: Array.from(wardCounts, ([name, value]) => ({ name, value }))
      .sort((left, right) => right.value - left.value)
      .slice(0, 6),
    csg: profileVisitors.filter((visitor) => visitor.isCsg).length,
    visitorCount: profileVisitors.length,
  };
};