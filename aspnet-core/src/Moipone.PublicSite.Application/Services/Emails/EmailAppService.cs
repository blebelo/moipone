using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Logging;
using Abp.Net.Mail;

namespace Moipone.PublicSite.Services.Emails
{
    public class EmailAppService : ApplicationService, IEmailAppService
    {
        private readonly IEmailSender _emailSender;

        public EmailAppService(
            IEmailSender emailSender)
        {
            _emailSender = emailSender;
        }

        public async Task SendCourseReminderEmail(string emailAddress)
        {
            try
            {
                await _emailSender.SendAsync(
                    emailAddress,
                    "Course Reminder",
                    @"
                    <h2>Course Reminder</h2>
                    <p>
                        This is a reminder that your course is coming up.
                    </p>
                    ",
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

        public async Task SendWelcomeEmail(string emailAddress)
        {
            try
            {
                await _emailSender.SendAsync(
                    emailAddress,
                    "Welcome to Moipone",
                    @"
                    <h2>Welcome to Moipone</h2>
                    <p>
                        Your registration was successful.
                    </p>
                    ",
                    true
                );
            }
            catch (Exception ex)
            {
                Logger.Error(
                    $"Failed to send welcome email to {emailAddress}",
                    ex
                );

                throw;
            }
        }

        public async Task SendCustomEmail(string emailAddress, string emailBody)
        {
            try
            {
                await _emailSender.SendAsync(
                    emailAddress,
                    "Moipone Notification",
                    emailBody,
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
    }
}