using Abp.Application.Services;
using Moipone.PublicSite.Services.Emails.TemplateModels;
using Moipone.PublicSite.ShortCourses.Dto;
using Moipone.PublicSite.Students.Dto;
using System.Threading.Tasks;

namespace Moipone.PublicSite.Services.Emails
{
    public interface IEmailAppService : IApplicationService
    {
        Task SendWelcomeEmail(StudentDto student); 
        Task SendCourseReminderEmail(StudentDto student, ShortCourseDto course);
        Task SendCustomEmail(StudentDto student, CustomEmail customEmailDto);
        Task SendAdmissionEmail(StudentDto student, ShortCourseDto course);
        Task SendRejectionEmail(StudentDto student, string? rejectionReason);

    }
}
