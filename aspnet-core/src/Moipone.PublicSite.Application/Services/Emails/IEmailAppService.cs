using Abp.Application.Services;
using System.Threading.Tasks;

namespace Moipone.PublicSite.Services.Emails
{
    public interface IEmailAppService : IApplicationService
    {
        Task SendWelcomeEmail(string emailAddress); 
        Task SendCourseReminderEmail(string emailAddress);
        Task SendCustomEmail(string emailAddress, string emailBody);
        Task SendAdmissionEmail(string emailAddress);
        Task SendRejectionEmail(string emailAddress, string? rejectionReason);

    }
}
