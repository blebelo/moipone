using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Moipone.PublicSite.Domain.Addresses;
using Moipone.PublicSite.Domain.Employees;
using Moipone.PublicSite.Domain.Students;
using System;

namespace Moipone.PublicSite.Employees.Dto
{
    [AutoMap(typeof(Employee))]
    public class EmployeeDto : EntityDto<Guid>
    {
        #region Personal Information
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public int? Age { get; set; }
        public RefListGender? Gender { get; set; }
        public string? PersonalEmail { get; set; }
        public string? EmployeeEmail { get; set; }
        public string? IdNumber { get; set; }
        public DateOnly? DateOfBirth { get; set; }
        public string? PhoneNumber { get; set; }
        public Address? Address { get; set; }
        #endregion

        #region Employment Information
        public DateOnly? HireDate { get; set; }
        public DateOnly? EndDate { get; set; }
        public string? Position { get; set; }
        public RefListDepartment? Department { get; set; }
        public RefListEmploymentStatus? EmploymentStatus { get; set; }
        public decimal? Salary { get; set; }
        public string? EmployeeNumber { get; set; }
        #endregion

        #region Emergency Contact
        public string? EmergencyContactName { get; set; }
        public string? EmergencyContactPhone { get; set; }
        public RefListRelationship? EmergencyContactRelationship { get; set; }
        #endregion

        #region Submitted Documents
        public string? CertifiedId { get; set; }
        public string? ProofOfResidence { get; set; }
        public string? CurriculumVitae { get; set; }
        public string? CertifiedHighestQualification { get; set; }
        public string? PoliceClearance { get; set; }
        #endregion
    }
}
