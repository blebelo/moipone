using Abp.Domain.Entities.Auditing;
using Microsoft.EntityFrameworkCore;
using Moipone.PublicSite.Domain.Addresses;
using Moipone.PublicSite.Domain.Students;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Moipone.PublicSite.Domain.Employees
{
    [Table("Employees")]
    [Index(nameof(PersonalEmail), IsUnique = true)]
    [Index(nameof(EmployeeEmail), IsUnique = true)]
    [Index(nameof(IdNumber), IsUnique = true)]
    public class Employee : FullAuditedEntity<Guid>
    {
        #region Personal Information
        [Required]
        [StringLength(50, MinimumLength = 2)]
        [RegularExpression(@"^[a-zA-Z\s'-]+$", ErrorMessage = "First name contains invalid characters.")]
        public string FirstName { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 2)]
        [RegularExpression(@"^[a-zA-Z\s'-]+$", ErrorMessage = "Last name contains invalid characters.")]
        public string LastName { get; set; }

        [Required]
        [Range(18, 75, ErrorMessage = "Age must be between 18 and 75.")]
        public int Age { get; set; }

        [Required]
        public RefListGender Gender { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(100)]
        public string PersonalEmail { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(100)]
        public string EmployeeEmail { get; set; }

        [Required]
        [StringLength(13)]
        [RegularExpression(@"^\d{13}$", ErrorMessage = "ID Number must be 13 digits.")]
        public string IdNumber { get; set; }

        [Required]
        [Column(TypeName = "date")]
        public DateOnly DateOfBirth { get; set; }

        [Required]
        [Phone]
        [StringLength(20)]
        [RegularExpression(@"^\+?\d{9,15}$", ErrorMessage = "Invalid phone number format.")]
        public string PhoneNumber { get; set; }

        public Address Address { get; set; }
        #endregion

        #region Employment Information
        [Required]
        [Column(TypeName = "date")]
        public DateOnly HireDate { get; set; }

        [Column(TypeName = "date")]
        public DateOnly? EndDate { get; set; }

        [Required]
        [StringLength(100)]
        public string Position { get; set; }

        [Required]
        public RefListDepartment Department { get; set; }

        [Required]
        public RefListEmploymentStatus EmploymentStatus { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal? Salary { get; set; }

        [StringLength(50)]
        public string EmployeeNumber { get; set; }
        #endregion

        #region Emergency Contact
        [StringLength(100)]
        public string EmergencyContactName { get; set; }

        [Phone]
        [StringLength(20)]
        [RegularExpression(@"^\+?\d{9,15}$", ErrorMessage = "Invalid phone number format.")]
        public string EmergencyContactPhone { get; set; }

        public RefListRelationship EmergencyContactRelationship { get; set; }
        #endregion

        #region Submitted Documents
        [Required]
        [StringLength(255)]
        [Url]
        public string CertifiedId { get; set; }

        [Required]
        [StringLength(255)]
        [Url]
        public string ProofOfResidence { get; set; }

        [Required]
        [StringLength(255)]
        [Url]
        public string CurriculumVitae { get; set; }

        [Required]
        [StringLength(255)]
        [Url]
        public string CertifiedHighestQualification { get; set; }

        [StringLength(255)]
        [Url]
        public string PoliceClearance { get; set; }
        #endregion

    }
}