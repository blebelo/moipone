using Abp.Domain.Entities.Auditing;
using Abp.Timing;
using Moipone.PublicSite.Domain.Students;
using System;
using System.Collections.Generic;

namespace Moipone.PublicSite.Domain.ShortCourses
{
    public class ShortCourse : FullAuditedEntity<Guid>
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int Capacity { get; set; }
        public string Requirements { get; set; }
        public string Code { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime StartDate { get; set; }
        public TimeSpan Duration { get; set; }
        public List<Student> EnrolledStudents { get; set; }
        public List<CourseApplication> Applications { get; set; }

    }
}
