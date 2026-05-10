using Abp.Application.Services;
using Moipone.PublicSite.Services.Emails.TemplateModels;
using Moipone.PublicSite.ShortCourses.Dto;
using Moipone.PublicSite.Students.Dto;
using System.Threading.Tasks;

namespace Moipone.PublicSite.Services.Emails
{
    public interface IEmailAppService : IApplicationService
    {
        Task SendWelcomeEmail(StudentEmailDto student); 
        Task SendCourseReminderEmail(StudentEmailDto student, ShortCourseEmailDto course);
        Task SendCustomEmail(StudentEmailDto student, CustomEmail customEmailDto);
        Task SendAdmissionEmail(StudentEmailDto student, ShortCourseEmailDto course);
        Task SendRejectionEmail(StudentEmailDto student, string? rejectionReason);

    }
}
