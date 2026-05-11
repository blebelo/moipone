using Moipone.PublicSite.Services.Emails.TemplateModels;
using Moipone.PublicSite.ShortCourses.Dto;
using Moipone.PublicSite.Students.Dto;

namespace Moipone.PublicSite.Services.Emails.BackgroundJobs
{
    public class EmailJobParameters
    {
        public RefListEmailType EmailType { get; set; }  
        public StudentEmailDto Student { get; set; }
        public ShortCourseEmailDto Course { get; set; }
        public string RejectionReason { get; set; }
        public CustomEmail CustomEmail { get; set; }
    }
}