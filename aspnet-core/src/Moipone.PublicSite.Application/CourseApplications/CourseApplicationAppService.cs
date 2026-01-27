using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using Moipone.PublicSite.Domain.CourseApplications;
using Moipone.PublicSite.CourseApplications.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Authorization;

namespace Moipone.PublicSite.CourseApplications
{
    public class CourseApplicationAppService
        : AsyncCrudAppService<CourseApplication, CourseApplicationDto, Guid, PagedAndSortedResultRequestDto, CourseApplicationDto, CourseApplicationDto>,
          ICourseApplicationAppService
    {
        private readonly IRepository<CourseApplication, Guid> _courseApplicationRepository;

        public CourseApplicationAppService(IRepository<CourseApplication, Guid> courseApplicationRepository)
            : base(courseApplicationRepository)
        {
            _courseApplicationRepository = courseApplicationRepository;
        }

        public override async Task<CourseApplicationDto> CreateAsync(CourseApplicationDto input)
        {
            if (input == null)
            {
                throw new UserFriendlyException("CourseApplication data cannot be null.");
            }

            var entity = ObjectMapper.Map<CourseApplication>(input);
            var result = await _courseApplicationRepository.InsertAsync(entity);

            return ObjectMapper.Map<CourseApplicationDto>(result);
        }

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
        public async Task<CourseApplicationDto> ApproveApplication(Guid input, string? reason)
        {
            if (input == Guid.Empty)
            {
                throw new UserFriendlyException("Invalid Application ID.");
            }

            var application = await _courseApplicationRepository.GetAsync(input);

            if (application.Status == RefListApplicationStatus.Approved)
            {
                throw new UserFriendlyException("Application is already approved.");
            }

            application.Status = RefListApplicationStatus.Approved;
            application.DecisionDate = DateTime.UtcNow;
            application.DecisionReason = reason ?? "Application approved";

            var updated = await _courseApplicationRepository.UpdateAsync(application);
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
            return ObjectMapper.Map<CourseApplicationDto>(updated);
        }
    }
}
