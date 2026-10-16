using AutoMapper;
using Moipone.PublicSite.AttendanceRegisters.Models;
using Moipone.PublicSite.Domain.Visits;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Text;

namespace Moipone.PublicSite.AttendanceRegisters
{
    public class WeeklyAttendanceReportMapProfile : Profile
    {
        public WeeklyAttendanceReportMapProfile()
        {
            CreateMap<IEnumerable<AttendanceRegister>, WeeklyAttendanceReportModel>()
                .AfterMap(MapWeeklyReport);
        }

        private static void MapWeeklyReport(IEnumerable<AttendanceRegister> source, WeeklyAttendanceReportModel destination)
        {
            var registers = source
                .OrderBy(register => register.Date)
                .ToList();

            if (registers.Count == 0)
            {
                return;
            }

            var firstDate = registers[0].Date;
            var monday = firstDate.AddDays(
                -(((int)firstDate.DayOfWeek + 6) % 7));

            var weekdays = Enumerable.Range(0, 5)
                .Select(offset => monday.AddDays(offset))
                .ToList();

            var registersByDate = registers
                .GroupBy(register => register.Date)
                .ToDictionary(group => group.Key, group => group.First());

            var regionNames = new[]
            {
                "Day1", "Day2", "Day3", "Day4", "Day5"
            };

            for (var i = 0; i < weekdays.Count; i++)
            {
                var date = weekdays[i];
                var prefix = regionNames[i];

                var visits = new DataTable();
                foreach (var column in new[]
                {
                    "Name", "Surname", "Address", "Residence", "WardNumber",
                    "IsDisabled", "IsCsg", "Sexuality", "DateOfBirth",
                    "ContactNumber", "EmailAddress", "Reason", "VisitDate"
                })
                {
                    visits.Columns.Add(column, typeof(string));
                }

                if (registersByDate.TryGetValue(date, out var register))
                {
                    foreach (var visit in register.Visits
                                 .OrderBy(visit => visit.CreationTime)
                                 .Select(MapVisit))
                    {
                        var row = visits.NewRow();
                        foreach (var column in visits.Columns.Cast<DataColumn>())
                        {
                            row[column] = visit[column.ColumnName];
                        }

                        visits.Rows.Add(row);
                    }
                }

                SetDay(destination, prefix, date, visits);
            }
        }

        private static void SetDay(WeeklyAttendanceReportModel report, string prefix, DateOnly date, DataTable visits)
        {
            var dayName = date.ToString("dddd", CultureInfo.InvariantCulture);
            var dayDate = date.ToString("dd MMM yyyy", CultureInfo.InvariantCulture);

            switch (prefix)
            {
                case "Day1":
                    report.Day1Name = dayName;
                    report.Day1Date = dayDate;
                    report.Day1 = visits;
                    break;
                case "Day2":
                    report.Day2Name = dayName;
                    report.Day2Date = dayDate;
                    report.Day2= visits ;
                    break;
                case "Day3":
                    report.Day3Name = dayName;
                    report.Day3Date = dayDate;
                    report.Day3= visits;
                    break;
                case "Day4":
                    report.Day4Name = dayName;
                    report.Day4Date = dayDate;
                    report.Day4= visits;
                    break;
                case "Day5":
                    report.Day5Name = dayName;
                    report.Day5Date = dayDate;
                    report.Day5= visits;
                    break;
            }
        }

        private static Dictionary<string, string> MapVisit(Visit visit)
        {
            var visitor = visit.Visitor;
            var address = visitor?.VisitorAddress;

            return new Dictionary<string, string>
            {
                ["Name"] = visitor?.Name ?? string.Empty,
                ["Surname"] = visitor?.Surname ?? string.Empty,

                ["Address"] = address == null
                    ? string.Empty
                    : string.Join(", ", new[]
                    {
                        address.Street,
                        address.Suburb,
                        address.City,
                        address.PostalCode,
                        address.Province,
                        address.Country
                    }.Where(value => !string.IsNullOrWhiteSpace(value))),

                ["Residence"] = GetDescription(visitor?.Residence),
                ["WardNumber"] = visitor?.WardNumber.ToString() ?? string.Empty,
                ["IsDisabled"] = YesNo(visitor?.IsDisabled),
                ["IsCsg"] = YesNo(visitor?.IsCsg),

                ["Sexuality"] = $"{visitor.Sex} - {GetDescription(visitor.Sexuality)}",

                ["DateOfBirth"] = visitor.DateOfBirth.ToString(
                        "dd MMM yyyy",
                        CultureInfo.InvariantCulture),

                ["ContactNumber"] = visitor?.ContactNumber ?? string.Empty,
                ["EmailAddress"] = visitor?.EmailAddress ?? string.Empty,

                ["Reason"] = visit.VisitReason == RefListVisitReason.Other
                    ? visit.OtherReason ?? "Other"
                    : visit.VisitReason.ToString(),

                ["VisitDate"] = visit.CreationTime.ToString(
                    "dd MMM yyyy",
                    CultureInfo.InvariantCulture)
            };
        }

        private static string YesNo(bool? value)
        {
            return value switch
            {
                true => "Yes",
                false => "No",
                null => string.Empty
            };
        }
        private static string GetDescription(Enum value) =>
            value.GetType().GetField(value.ToString())?
                .GetCustomAttribute<System.ComponentModel.DescriptionAttribute>()?.Description
            ?? value.ToString();
    }
}
