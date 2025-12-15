using Abp.Domain.Entities.Auditing;
using Microsoft.EntityFrameworkCore;
using Moipone.PublicSite.Domain.Addresses;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Moipone.PublicSite.Domain.Students;

[Table("Students")]
[Index(nameof(EmailAddress), IsUnique = true)]
[Index(nameof(IdNumber), IsUnique = true)]
public class Student : FullAuditedEntity<Guid>
{
    [Required]
    [StringLength(50, MinimumLength = 2)]
    [RegularExpression(@"^[a-zA-Z\s'-]+$", ErrorMessage = "Name contains invalid characters.")]
    public string Name { get; set; }

    [Required]
    [StringLength(50, MinimumLength = 2)]
    [RegularExpression(@"^[a-zA-Z\s'-]+$", ErrorMessage = "Surname contains invalid characters.")]
    public string Surname { get; set; }

    [Required]
    [Range(10, 120)]
    public int Age { get; set; }

    [Required]
    public RefListGender Gender { get; set; }

    [Required]
    [EmailAddress]
    [StringLength(100)]
    public string EmailAddress { get; set; }

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

    public Address ResidentialAddress { get; set; }
}
