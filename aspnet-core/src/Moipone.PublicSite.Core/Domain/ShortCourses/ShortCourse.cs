using Abp.Domain.Entities.Auditing;
using Microsoft.EntityFrameworkCore;
using Moipone.PublicSite.Domain.CourseApplications;
using Moipone.PublicSite.Domain.Students;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Moipone.PublicSite.Domain.ShortCourses
{
    [Table("ShortCourses")]
    [Index(nameof(Code), IsUnique = true)]
    public class ShortCourse : FullAuditedEntity<Guid>
    {
        #region Core Details

        [Required]
        [StringLength(100, MinimumLength = 5)]
        public string Title { get; set; }

        [Required]
        [StringLength(1000)]
        public string Description { get; set; }

        [Required]
        [Range(1, 1000)]
        public int Capacity { get; set; }

        [StringLength(1000)]
        public string Requirements { get; set; }

        [Required]
        [StringLength(20)]
        [RegularExpression(@"^[A-Z0-9\-]+$", ErrorMessage = "Invalid course code format.")]
        public string Code { get; set; }

        [Required]
        public bool IsActive { get; set; } = true;

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public TimeSpan Duration { get; set; }

        #endregion

        #region Navigation
        public ICollection<Student> EnrolledStudents { get; set; } = new List<Student>();

        public ICollection<CourseApplication> Applications { get; set; } = new List<CourseApplication>();

        #endregion
    }
}
