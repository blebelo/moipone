using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.BackgroundJobs;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.UI;
using Microsoft.EntityFrameworkCore;
using Moipone.PublicSite.CourseApplications.Dto;
using Moipone.PublicSite.Domain.CourseApplications;
using Moipone.PublicSite.Domain.ShortCourses;
using Moipone.PublicSite.Domain.Students;
using Moipone.PublicSite.Services.Emails.BackgroundJobs;
using Moipone.PublicSite.ShortCourses.Dto;
using Moipone.PublicSite.Students.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Moipone.PublicSite.CourseApplications
{
    public class CourseApplicationAppService
        : AsyncCrudAppService<CourseApplication, CourseApplicationDto, Guid, PagedAndSortedResultRequestDto, CourseApplicationDto, CourseApplicationDto>,
          ICourseApplicationAppService
    {
        private readonly IBackgroundJobManager _backgroundJobManager;
        private readonly IRepository<Student, Guid> _studentRepository;
        private readonly IRepository<ShortCourse, Guid> _shortCourseRepository;
        private readonly IRepository<CourseApplication, Guid> _courseApplicationRepository;

        public CourseApplicationAppService(IRepository<CourseApplication, Guid> courseApplicationRepository, IRepository<ShortCourse, Guid> shortCourseRepository, IRepository<Student, Guid> studentRepository, IBackgroundJobManager backgroundJobManager)
            : base(courseApplicationRepository)
        {
            _backgroundJobManager = backgroundJobManager;
            _studentRepository = studentRepository;
            _shortCourseRepository = shortCourseRepository;
            _courseApplicationRepository = courseApplicationRepository;
        }

        public override async Task<CourseApplicationDto> CreateAsync(CourseApplicationDto input)
        {
            if (input == null)
            {
                throw new UserFriendlyException("CourseApplication data cannot be null.");
            }

            if (!input.StudentId.HasValue || !input.ShortCourseId.HasValue)
            {
                throw new UserFriendlyException("Student and Course are required.");
            }

            var alreadyApplied = await _courseApplicationRepository
                .FirstOrDefaultAsync(x =>
                    x.StudentId == input.StudentId &&
                    x.ShortCourseId == input.ShortCourseId
                );

            if (alreadyApplied != null)
            {
                throw new UserFriendlyException("You have already applied for this course.");
            }

            var entity = ObjectMapper.Map<CourseApplication>(input);
            var result = await _courseApplicationRepository.InsertAsync(entity);

            return ObjectMapper.Map<CourseApplicationDto>(result);
        }

        [AbpAuthorize]
        public override async Task<PagedResultDto<CourseApplicationDto>> GetAllAsync(PagedAndSortedResultRequestDto input)
        {
            var query = Repository.GetAll();
            var totalCount = await AsyncQueryableExecuter.CountAsync(query);

            var items = await AsyncQueryableExecuter.ToListAsync(
                query.OrderBy(x => x.Id)
                     .Skip(input.SkipCount)
                     .Take(input.MaxResultCount)
            );

            return new PagedResultDto<CourseApplicationDto>(
                totalCount,
                ObjectMapper.Map<List<CourseApplicationDto>>(items)
            );
        }

        public override async Task<CourseApplicationDto> GetAsync(EntityDto<Guid> input)
        {
            if (input == null || input.Id == Guid.Empty)
            {
                throw new UserFriendlyException("Invalid ID.");
            }

            var entity = await _courseApplicationRepository.GetAsync(input.Id);
            return ObjectMapper.Map<CourseApplicationDto>(entity);
        }

        [AbpAuthorize]
        public override async Task<CourseApplicationDto> UpdateAsync(CourseApplicationDto input)
        {
            if (input == null || input.Id == Guid.Empty)
            {
                throw new UserFriendlyException("Invalid ID.");
            }

            var entity = await _courseApplicationRepository.GetAsync(input.Id);
            ObjectMapper.Map(input, entity);

            var updated = await _courseApplicationRepository.UpdateAsync(entity);
            return ObjectMapper.Map<CourseApplicationDto>(updated);
        }

        public override async Task DeleteAsync(EntityDto<Guid> input)
        {
            if (input == null || input.Id == Guid.Empty)
            {
                throw new UserFriendlyException("Invalid ID.");
            }

            await _courseApplicationRepository.DeleteAsync(input.Id);
        }

        [AbpAuthorize]
        public async Task<List<CourseApplicationDto>> GetApplicationsByCourseIdAsync(Guid courseId)
        {
            if (courseId == Guid.Empty)
            {
                throw new UserFriendlyException("Invalid Course ID.");
            }
            var query = _courseApplicationRepository.GetAll()
                .Where(app => app.ShortCourseId == courseId);
            var applications = await AsyncQueryableExecuter.ToListAsync(query);
            return ObjectMapper.Map<List<CourseApplicationDto>>(applications);
        }

        [AbpAuthorize]
        public async Task<CourseApplicationDto> ApproveApplication(Guid input)
        {
            if (input == Guid.Empty)
                throw new UserFriendlyException("Invalid Application ID.");

            var application = await _courseApplicationRepository.GetAsync(input);

            if (application.Status == RefListApplicationStatus.Approved)
                throw new UserFriendlyException("Application is already approved.");

            var shortCourse = await _shortCourseRepository
                .GetAll()
                .Include(c => c.EnrolledStudents)
                .FirstOrDefaultAsync(c => c.Id == application.ShortCourseId);

            if (shortCourse == null)
                throw new UserFriendlyException("Short course not found.");

            if (shortCourse.EnrolledStudents.Count >= shortCourse.Capacity)
            {
                application.Status = RefListApplicationStatus.Declined;
                application.DecisionDate = DateTime.UtcNow;
                application.DecisionReason = "Course is full. Application declined.";
                await _courseApplicationRepository.UpdateAsync(application);
                throw new UserFriendlyException("Course is already full.");
            }

            var student = await _studentRepository.GetAsync(application.StudentId);

            if (shortCourse.EnrolledStudents.Any(s => s.Id == student.Id))
                throw new UserFriendlyException("Student already enrolled.");

            shortCourse.EnrolledStudents.Add(student);

            application.Status = RefListApplicationStatus.Approved;
            application.DecisionDate = DateTime.UtcNow;
            application.DecisionReason = "Application approved - Candidate Successful";

            await _shortCourseRepository.UpdateAsync(shortCourse);
            var updated = await _courseApplicationRepository.UpdateAsync(application);

            _backgroundJobManager.Enqueue<SendEmailBackgroundJob, EmailJobParameters>(
                new EmailJobParameters
                {
                    EmailType = RefListEmailType.Admission,
                    Student = ObjectMapper.Map<StudentEmailDto>(student),
                    Course = ObjectMapper.Map<ShortCourseEmailDto>(shortCourse)
                });
            return ObjectMapper.Map<CourseApplicationDto>(updated);
        }

        [AbpAuthorize]
        public async Task<CourseApplicationDto> RejectApplication(Guid input, string? reason)
        {
            if (input == Guid.Empty)
            {
                throw new UserFriendlyException("Invalid Application ID.");
            }

            var application = await _courseApplicationRepository.GetAsync(input);

            if (application.Status == RefListApplicationStatus.Declined)
            {
                throw new UserFriendlyException("Application is already declined.");
            }

            application.Status = RefListApplicationStatus.Declined;
            application.DecisionDate = DateTime.UtcNow;
            application.DecisionReason = reason ?? "Application Declined";

            var updated = await _courseApplicationRepository.UpdateAsync(application);
            var student = await _studentRepository.GetAsync(application.StudentId);
            var shortCourse = await _shortCourseRepository.GetAsync(application.ShortCourseId);

            _backgroundJobManager.Enqueue<SendEmailBackgroundJob, EmailJobParameters>(
                new EmailJobParameters
                {
                    EmailType = RefListEmailType.Rejection,
                    Student = ObjectMapper.Map<StudentEmailDto>(student),
                    Course = ObjectMapper.Map<ShortCourseEmailDto>(shortCourse),
                    RejectionReason = reason ?? "We decided to pursue other candidacy. Please try again in the future"
                });
            return ObjectMapper.Map<CourseApplicationDto>(updated);
        }

        public async Task<CourseApplicationDto> WithdrawApplication(Guid input, string? reason)
        {
            if (input == Guid.Empty)
                throw new UserFriendlyException("Invalid Application ID.");

            var application = await _courseApplicationRepository.GetAsync(input);

            if (application.Status == RefListApplicationStatus.Withdrawn)
                throw new UserFriendlyException("Application is already withdrawn.");

            var shortCourse = await _shortCourseRepository
                .GetAll()
                .Include(c => c.EnrolledStudents)
                .FirstOrDefaultAsync(c => c.Id == application.ShortCourseId);

            if (shortCourse == null)
                throw new UserFriendlyException("Short course not found.");

            application.Status = RefListApplicationStatus.Withdrawn;
            application.DecisionDate = DateTime.UtcNow;
            application.DecisionReason = reason.IsNullOrWhiteSpace() ? "Student withdrew application voluntarily" : reason;
            await _courseApplicationRepository.UpdateAsync(application);

            var student = await _studentRepository.GetAsync(application.StudentId);

            await _shortCourseRepository.UpdateAsync(shortCourse);
            var updated = await _courseApplicationRepository.UpdateAsync(application);

            _backgroundJobManager.Enqueue<SendEmailBackgroundJob, EmailJobParameters>(
                new EmailJobParameters
                {
                    EmailType = RefListEmailType.Rejection,
                    Student = ObjectMapper.Map<StudentEmailDto>(student),
                    Course = ObjectMapper.Map<ShortCourseEmailDto>(shortCourse)
                });
            return ObjectMapper.Map<CourseApplicationDto>(updated);
        }
    }
}
