using Abp.BackgroundJobs;
using Abp.Dependency;

namespace Moipone.PublicSite.Services.Emails.BackgroundJobs
{
    public class SendEmailBackgroundJob : BackgroundJob<EmailJobParameters>, ITransientDependency
    {
        private readonly IEmailAppService _emailAppService;

        public SendEmailBackgroundJob(IEmailAppService emailAppService)
        {
            _emailAppService = emailAppService;
        }

        public override void Execute(EmailJobParameters args)
        {
            switch (args.EmailType)
            {
                case RefListEmailType.Welcome:
                    _emailAppService.SendWelcomeEmail(args.Student).GetAwaiter().GetResult();
                    break;

                case RefListEmailType.Admission:
                    _emailAppService.SendAdmissionEmail(args.Student, args.Course).GetAwaiter().GetResult();
                    break;

                case RefListEmailType.Rejection:
                    _emailAppService.SendRejectionEmail(args.Student, args.RejectionReason).GetAwaiter().GetResult();
                    break;

                case RefListEmailType.Reminder:
                    _emailAppService.SendCourseReminderEmail(args.Student, args.Course).GetAwaiter().GetResult();
                    break;

                case RefListEmailType.Custom:
                    _emailAppService.SendCustomEmail(args.Student, args.CustomEmail).GetAwaiter().GetResult();
                    break;
            }
        }
    }
}