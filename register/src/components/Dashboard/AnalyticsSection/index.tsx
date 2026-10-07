"use client";
import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid,
  Line, LineChart, ResponsiveContainer,
  Tooltip, XAxis, YAxis,
} from "recharts";
import { buildAnalytics, type AnalyticsRange } from "@/lib/utils/analytics";
import type { IVisit } from "@/providers/VisitProvider/context";
import AnalyticsCard from "../AnalyticsCard";
import Stat from "../Stat";
import { IVisitor } from "@/providers/VisitorProvider/context";


const AnalyticsSection: React.FC<Readonly<{visits: IVisit[]; visitors: IVisitor[]; loading: boolean; error: string | null; onRetry: () => void;}>> = ({
  visits, visitors, loading, error, onRetry, }: Readonly<{visits: IVisit[]; visitors: IVisitor[]; loading: boolean; error: string | null; onRetry: () => void; }>) => {
    
  const [range, setRange] = useState<AnalyticsRange>(7);
  const stats = useMemo(() => buildAnalytics(visits, visitors, range), [visits, visitors, range]);
  const duration = stats.averageDuration == null
    ? "—"
    : stats.averageDuration >= 60
      ? `${Math.floor(stats.averageDuration / 60)}h ${stats.averageDuration % 60}m`
      : `${stats.averageDuration} min`;

  return (
    <section className="mt-10" aria-labelledby="analytics-heading">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="analytics-heading" className="font-display text-xl font-extrabold tracking-tight">
            Visit trends &amp; visitors
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Derived from the visit and visitor records in the dashboard state.
          </p>
        </div>
        <div role="group" aria-label="Analytics date range" className="inline-flex rounded-md border bg-card p-1">
          {([7, 14, 30] as const).map((days) => (
            <button
              key={days}
              type="button"
              aria-pressed={range === days}
              onClick={() => setRange(days)}
              className={range === days
                ? "h-8 rounded px-3 text-xs font-semibold text-primary-foreground bg-primary"
                : "h-8 rounded px-3 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"}
            >
              {days} days
            </button>
          ))}
        </div>
      </div>

      {error ? (
        <div role="alert" className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          <span>{error}</span>
          <button type="button" onClick={onRetry} className="font-semibold underline underline-offset-2">
            Try again
          </button>
        </div>
      ) : loading ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Loading analytics">
          {[1, 2, 3, 4].map((item) => <div key={item} className="h-24 animate-pulse rounded-lg bg-muted" />)}
          <div className="h-64 animate-pulse rounded-lg bg-muted sm:col-span-2 lg:col-span-4" />
        </div>
      ) : (
        <>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="Visits" value={String(stats.total)} hint={`${stats.perDay} per day on average`} />
            <Stat label="Unique visitors" value={String(stats.unique)} hint={`In the last ${range} days`} />
            <Stat label="Returning visitors" value={String(stats.returning)} hint="Visited more than once in this range" />
            <Stat label="Average visit length" value={duration} hint="From check-in to check-out" />
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <article className="rounded-lg border bg-card p-4 lg:col-span-2">
              <h3 className="font-display text-sm font-bold">Daily visits</h3>
              <div role="img" aria-label={`Daily visits over the last ${range} days`} className="mt-3 h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stats.trend} margin={{ left: -20, right: 8, top: 8, bottom: 0 }}>
                    <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
                    <XAxis dataKey="label" tickLine={false} axisLine={false} minTickGap={16} tick={{ fontSize: 11 }} />
                    <YAxis allowDecimals={false} tickLine={false} axisLine={false} width={36} tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Line dataKey="visits" name="Visits" type="monotone" stroke="var(--primary)" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </article>
            <article className="rounded-lg border bg-card p-4">
              <h3 className="font-display text-sm font-bold">Busiest hours</h3>
              <div role="img" aria-label="Visits by check-in hour, 7 am to 6 pm" className="mt-3 h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.hourly} margin={{ left: -20, right: 8, top: 8, bottom: 0 }}>
                    <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
                    <XAxis dataKey="hour" tickLine={false} axisLine={false} minTickGap={8} tick={{ fontSize: 10 }} />
                    <YAxis allowDecimals={false} tickLine={false} axisLine={false} width={36} tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="visits" name="Visits" fill="var(--primary)" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </article>
          </div>

          <h3 className="label-caps mt-8">Visitor profile · {stats.visitorCount} visitors in range</h3>
          <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnalyticsCard title="Visit reasons" rows={stats.reasons} />
            <AnalyticsCard title="Age groups" rows={stats.ages} />
            <AnalyticsCard title="Sex" rows={stats.sex} />
            <AnalyticsCard title="Residence" rows={stats.residence} />
            <AnalyticsCard title="Top wards" rows={stats.wards} />
            <AnalyticsCard
              title="Support status"
              rows={[{ name: "Child Support Grant", value: stats.csg }]}
            />
          </div>
        </>
      )}
    </section>
  );
};

export default AnalyticsSection;