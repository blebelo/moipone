using System;
using Abp.UI;
using Abp.Net.Mail;
using System.Threading.Tasks;
using Abp.Application.Services;
using Moipone.PublicSite.Students.Dto;
using Moipone.PublicSite.ShortCourses.Dto;
using Moipone.PublicSite.Services.Emails.Rendering;
using Moipone.PublicSite.Services.Emails.TemplateModels;
using Abp.Authorization;
using Moipone.PublicSite.Authorization;

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

        [RemoteService(false)]
        [AbpAuthorize(PermissionNames.Admin, PermissionNames.Instructor)]
        public async Task SendCourseReminderEmail(StudentDto student, ShortCourseDto course)
        {
            try
            {
                var model = new Reminder
                {
                    FirstName = student.Name + " " + student.Surname,
                    CourseTitle = course.Title,
                    StartDate = course.StartDate.ToString(),
                    Duration = course.Duration.ToString(),
                    CourseDescription = course.Description,
                    WithdrawLink = "https://www.moiponeacademy.org/"
                };

                var emailBody = await _emailRenderer.RenderAsync<Reminder>("moipone-reminder", model);

                await _emailSender.SendAsync(
                    student.EmailAddress,
                    "Course Reminder",
                    emailBody,
                    true
                );
            }
            catch (Exception ex)
            {
                Logger.Error($"Failed to send course reminder email");
                throw new UserFriendlyException("Failed to send course reminder", ex.Message);
            }
        }

        [RemoteService(false)]
        [AbpAuthorize(PermissionNames.Admin, PermissionNames.Instructor)]
        public async Task SendWelcomeEmail(StudentDto student)
        {
            try
            {
                WelcomeEmail model = new WelcomeEmail(student.Name);
                var emailBody = await _emailRenderer.RenderAsync<WelcomeEmail>("welcome", model);

                await _emailSender.SendAsync(
                    student.EmailAddress,
                    "Welcome to Moipone",
                    emailBody,
                    true
                );
            }
            catch (Exception ex)
            {
                Logger.Error($"Failed to send welcome email");
                throw new UserFriendlyException("Failed to send welcome email", ex.Message);
            }
        }

        [AbpAuthorize(PermissionNames.Admin, PermissionNames.Instructor)]
        public async Task SendCustomEmail(StudentDto student, CustomEmail customEmailDto)
        {
            try
            {
                var model = new CustomEmail
                {
                    EmailSubjectLineOne = customEmailDto.EmailSubjectLineOne,
                    EmailSubjectLineTwo = customEmailDto.EmailSubjectLineTwo,
                    HeroSubheading = customEmailDto.HeroSubheading ?? "A message from our team.",
                    FirstName = student.Name,
                    OpeningParagraph = customEmailDto.OpeningParagraph ?? "Please find your message below.",
                    CustomBody = customEmailDto.CustomBody,
                    ClosingLine = customEmailDto.ClosingLine ?? "Thank you for being part of Moipone."
                };

                var renderedBody = await _emailRenderer.RenderAsync<CustomEmail>("moipone-custom-email", model);

                await _emailSender.SendAsync(
                    student.EmailAddress,
                    "Moipone Notification",
                    renderedBody,
                    true
                );
            }
            catch (Exception ex)
            {
                Logger.Error($"Failed to send custom email");
                throw new UserFriendlyException("Failed to send custom email", ex.Message);
            }
        }

        [RemoteService(false)]
        [AbpAuthorize(PermissionNames.Admin, PermissionNames.Instructor)]
        public async Task SendAdmissionEmail(StudentDto student, ShortCourseDto course)
        {
            try
            {
                var model = new Admission
                {
                    FirstName = student.Name,
                    LastName = student.Surname,
                    CourseTitle = course.Title,
                    StartDate = course.StartDate.ToString(),
                    CourseDuration = course.Duration.ToString(),
                };

                var emailBody = await _emailRenderer.RenderAsync<Admission>("moipone-admission", model);

                await _emailSender.SendAsync(
                    student.EmailAddress,
                    "Admission Confirmed",
                    emailBody,
                    true
                );
            }
            catch (Exception ex)
            {
                Logger.Error($"Failed to send admission email");
                throw new UserFriendlyException("Failed to send admission email", ex.Message);
            }
        }

        [RemoteService(false)]
        [AbpAuthorize(PermissionNames.Admin, PermissionNames.Instructor)]
        public async Task SendRejectionEmail(StudentDto student, string? rejectionReason)
        {
            try
            {
                var model = new Rejection
                {
                    FirstName = student.Name,
                    RejectionReason = rejectionReason ?? ""
                };

                var emailBody = await _emailRenderer.RenderAsync<Rejection>("moipone-rejection", model);

                await _emailSender.SendAsync(
                    student.EmailAddress,
                    "Application Update",
                    emailBody,
                    true
                );
            }
            catch (Exception ex)
            {
                Logger.Error($"Failed to send rejection email");
                throw new UserFriendlyException("Failed to send rejection email", ex.Message);
            }
        }
    }
}
