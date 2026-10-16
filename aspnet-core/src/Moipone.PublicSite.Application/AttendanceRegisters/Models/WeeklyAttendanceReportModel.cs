using System;
using System.Data;

namespace Moipone.PublicSite.AttendanceRegisters.Models
{
    public class WeeklyAttendanceReportModel
    {
        #region Header
        public string Region { get; set; } = string.Empty;
        public string OrganisationName { get; set; } = "Moipone Academy";
        public string ReportingPeriod { get; set; } = string.Empty;
        #endregion

        #region Day Headings
        public string Day1Name { get; set; } = string.Empty;
        public string Day1Date { get; set; } = string.Empty;
        public string Day2Name { get; set; } = string.Empty;
        public string Day2Date { get; set; } = string.Empty;
        public string Day3Name { get; set; } = string.Empty;
        public string Day3Date { get; set; } = string.Empty;
        public string Day4Name { get; set; } = string.Empty;
        public string Day4Date { get; set; } = string.Empty;
        public string Day5Name { get; set; } = string.Empty;
        public string Day5Date { get; set; } = string.Empty;
        #endregion

        #region Visit Data
        public DataTable Day1 { get; set; } = CreateVisitsTable();
        public DataTable Day2 { get; set; } = CreateVisitsTable();
        public DataTable Day3 { get; set; } = CreateVisitsTable();
        public DataTable Day4 { get; set; } = CreateVisitsTable();
        public DataTable Day5 { get; set; } = CreateVisitsTable();
        #endregion

        #region Audit Data
        public string ProjectName { get; set; } = string.Empty;
        public string CompiledBy { get; set; } = string.Empty;
        public string CompiledSignature { get; set; } = string.Empty;
        public string CompiledDate { get; set; } = string.Empty;
        public string VerifiedBy { get; set; } = string.Empty;
        public string VerifiedSignature { get; set; } = string.Empty;
        public string VerifiedDate { get; set; } = string.Empty;
        #endregion

        private static DataTable CreateVisitsTable()
        {
            var table = new DataTable();
            foreach (var column in new[]
            {
                "Name", "Surname", "Address", "Residence", "WardNumber",
                "IsDisabled", "IsCsg", "Sexuality", "DateOfBirth",
                "ContactNumber", "EmailAddress", "Reason", "VisitDate"
            })
            {
                table.Columns.Add(column, typeof(string));
            }

            return table;
        }
    }
}
