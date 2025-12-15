using Abp.Domain.Entities.Auditing;
using Microsoft.EntityFrameworkCore;
using Moipone.PublicSite.Domain.CourseApplications;
using Moipone.PublicSite.Domain.ShortCourses;
using Moipone.PublicSite.Domain.Students;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Moipone.PublicSite.Domain.CourseApplications;

[Table("CourseApplications")]
[Index(nameof(StudentId), nameof(ShortCourseId), IsUnique = true)]
public class CourseApplication : FullAuditedEntity<Guid>
{
    #region Application Data
    [Required]
    public Guid StudentId { get; set; }

    [ForeignKey(nameof(StudentId))]
    public Student Student { get; set; }

    [Required]
    public Guid ShortCourseId { get; set; }

    [ForeignKey(nameof(ShortCourseId))]
    public ShortCourse ShortCourse { get; set; }

    [Required]
    public RefListApplicationStatus Status { get; set; }

    [StringLength(500)]
    public string? DecisionReason { get; set; }

    public DateTime? DecisionDate { get; set; }
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
    #endregion
}
