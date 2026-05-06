using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Net.Mail;
using Abp.UI;
using Moipone.PublicSite.Services.Emails.Rendering;
using Moipone.PublicSite.Services.Emails.TemplateModels;

namespace Moipone.PublicSite.Services.Emails
{
    public class EmailAppService : ApplicationService, IEmailAppService
    {
        private readonly IEmailSender _emailSender;
        private readonly IEmailTemplateRenderer _emailRenderer;

        public EmailAppService(IEmailSender emailSender, IEmailTemplateRenderer emailRenderer)
        {
            _emailSender = emailSender;
            _emailRenderer = emailRenderer;
        }

        public async Task SendCourseReminderEmail(string emailAddress)
        {
            try
            {
                var model = new Reminder
                {
                    FirstName = "Learner",
                    CourseTitle = "Your Upcoming Course",
                    StartDate = "To be confirmed",
                    Duration = "As communicated",
                    CourseDescription = "Please check your learner portal for the latest course details.",
                    WithdrawLink = "https://www.moiponeacademy.org/"
                };

                var emailBody = await _emailRenderer.RenderAsync<Reminder>("moipone-reminder", model);

                await _emailSender.SendAsync(
                    emailAddress,
                    "Course Reminder",
                    emailBody,
                    true
                );
            }
            catch (Exception ex)
            {
                Logger.Error(
                    $"Failed to send course reminder to {emailAddress}",
                    ex
                );

                throw;
            }
        }

        public async Task SendWelcomeEmail(string emailAddress, string firstName)
        {
            try
            {
                WelcomeEmail model = new WelcomeEmail(firstName);
                var emailBody = await _emailRenderer.RenderAsync<WelcomeEmail>("welcome", model);

                await _emailSender.SendAsync(
                    emailAddress,
                    "Welcome to Moipone",
                    emailBody,
                    true
                );
            }
            catch (Exception ex)
            {
                Logger.Error(
                    $"Failed to send welcome email to {emailAddress}",
                    ex
                );

                throw new UserFriendlyException("Email sending failed", ex.Message);
            }
        }

        public async Task SendCustomEmail(string emailAddress, string emailBody)
        {
            try
            {
                var model = new CustomEmail
                {
                    EmailSubjectLineOne = "Moipone",
                    EmailSubjectLineTwo = "Notification",
                    HeroSubheading = "A message from our team.",
                    FirstName = "Learner",
                    OpeningParagraph = "Please find your message below.",
                    CustomBody = emailBody,
                    ClosingLine = "Thank you for being part of Moipone."
                };

                var renderedBody = await _emailRenderer.RenderAsync<CustomEmail>("moipone-custom-email", model);

                await _emailSender.SendAsync(
                    emailAddress,
                    "Moipone Notification",
                    renderedBody,
                    true
                );
            }
            catch (Exception ex)
            {
                Logger.Error(
                    $"Failed to send custom email to {emailAddress}",
                    ex
                );

                throw;
            }
        }

        public async Task SendAdmissionEmail(string emailAddress)
        {
            try
            {
                var model = new Admission
                {
                    FirstName = "Learner",
                    LastName = "",
                    CourseTitle = "Your Enrolled Course",
                    StartDate = "To be confirmed",
                    CourseDuration = "As communicated"
                };

                var emailBody = await _emailRenderer.RenderAsync<Admission>("moipone-admission", model);

                await _emailSender.SendAsync(
                    emailAddress,
                    "Admission Confirmed",
                    emailBody,
                    true
                );
            }
            catch (Exception ex)
            {
                Logger.Error(
                    $"Failed to send admission email to {emailAddress}",
                    ex
                );

                throw;
            }
        }

        public async Task SendRejectionEmail(string emailAddress, string? rejectionReason)
        {
            try
            {
                var model = new Rejection
                {
                    FirstName = "Applicant",
                    RejectionReason = rejectionReason
                };

                var emailBody = await _emailRenderer.RenderAsync<Rejection>("moipone-rejection", model);

                await _emailSender.SendAsync(
                    emailAddress,
                    "Application Update",
                    emailBody,
                    true
                );
            }
            catch (Exception ex)
            {
                Logger.Error(
                    $"Failed to send rejection email to {emailAddress}",
                    ex
                );

                throw;
            }
        }
    }
}
