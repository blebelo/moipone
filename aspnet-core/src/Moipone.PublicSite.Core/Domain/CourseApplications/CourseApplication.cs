using Abp.Domain.Entities.Auditing;
using Moipone.PublicSite.Domain.ShortCourses;
using Moipone.PublicSite.Domain.Students;
using Moipone.PublicSite.Domain.CourseApplications;
using System;

public class CourseApplication : FullAuditedEntity<Guid>
{
    public Student Student { get; set; }
    public ShortCourse ShortCourse { get; set; }
    public RefListApplicationStatus Status { get; set; }
    public string DecisionReason { get; set; }
    public DateTime DecisionDate { get; set; }
}
