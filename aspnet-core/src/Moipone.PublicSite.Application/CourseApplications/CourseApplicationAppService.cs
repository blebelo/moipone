using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using Moipone.PublicSite.CourseApplications.Dto;
using Moipone.PublicSite.Domain.CourseApplications;
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
        private readonly IRepository<CourseApplication, Guid> _courseApplicationRepository;

        public CourseApplicationAppService(IRepository<CourseApplication, Guid> courseApplicationRepository)
            : base(courseApplicationRepository)
        {
            _courseApplicationRepository = courseApplicationRepository;
        }

        public async override Task<CourseApplicationDto> CreateAsync(CourseApplicationDto input)
        {
            try
            {
                if (input == null)
                {
                    throw new UserFriendlyException(
                        "Course application data cannot be null.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var application = ObjectMapper.Map<CourseApplication>(input);
                var result = await _courseApplicationRepository.InsertAsync(application);
                return ObjectMapper.Map<CourseApplicationDto>(result);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error("Error creating course application", ex);
                throw new UserFriendlyException(
                    $"Could not create course application. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        public async override Task<PagedResultDto<CourseApplicationDto>> GetAllAsync(PagedAndSortedResultRequestDto input)
        {
            try
            {
                var query = Repository.GetAll();
                var totalCount = await AsyncQueryableExecuter.CountAsync(query);

                var applications = await AsyncQueryableExecuter.ToListAsync(
                    query.OrderBy(a => a.CreationTime)
                         .Skip(input.SkipCount)
                         .Take(input.MaxResultCount)
                );

                return new PagedResultDto<CourseApplicationDto>(
                    totalCount,
                    ObjectMapper.Map<List<CourseApplicationDto>>(applications)
                );
            }
            catch (Exception ex)
            {
                Logger.Error("Error retrieving course applications", ex);
                throw new UserFriendlyException(
                    $"Could not retrieve course applications. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        public async override Task<CourseApplicationDto> GetAsync(EntityDto<Guid> input)
        {
            try
            {
                if (input == null || input.Id == Guid.Empty)
                    throw new UserFriendlyException("Invalid course application ID.", Abp.Logging.LogSeverity.Warn);

                var application = await _courseApplicationRepository.GetAsync(input.Id);

                if (application == null)
                    throw new UserFriendlyException($"Course application with ID {input.Id} not found.", Abp.Logging.LogSeverity.Warn);

                return ObjectMapper.Map<CourseApplicationDto>(application);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error retrieving course application with ID {input?.Id}", ex);
                throw new UserFriendlyException(
                    $"Could not retrieve course application. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        public async override Task<CourseApplicationDto> UpdateAsync(CourseApplicationDto input)
        {
            try
            {
                if (input == null)
                    throw new UserFriendlyException("Course application data cannot be null.", Abp.Logging.LogSeverity.Warn);

                if (input.Id == Guid.Empty)
                    throw new UserFriendlyException("Invalid course application ID.", Abp.Logging.LogSeverity.Warn);

                var application = await _courseApplicationRepository.GetAsync(input.Id);
                ObjectMapper.Map(input, application);
                var updated = await _courseApplicationRepository.UpdateAsync(application);

                return ObjectMapper.Map<CourseApplicationDto>(updated);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error updating course application with ID {input?.Id}", ex);
                throw new UserFriendlyException(
                    $"Could not update course application. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        public async override Task DeleteAsync(EntityDto<Guid> input)
        {
            try
            {
                if (input == null || input.Id == Guid.Empty)
                    throw new UserFriendlyException("Invalid course application ID.", Abp.Logging.LogSeverity.Warn);

                var application = await _courseApplicationRepository.GetAsync(input.Id);

                if (application == null)
                    throw new UserFriendlyException($"Course application with ID {input.Id} not found.", Abp.Logging.LogSeverity.Warn);

                await _courseApplicationRepository.DeleteAsync(input.Id);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error deleting course application with ID {input?.Id}", ex);
                throw new UserFriendlyException(
                    $"Could not delete course application. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        public async Task<CourseApplicationDto> ApproveApplicationAsync(Guid id)
        {
            try
            {
                if (id == Guid.Empty)
                    throw new UserFriendlyException("Invalid course application ID.", Abp.Logging.LogSeverity.Warn);

                var application = await _courseApplicationRepository.GetAsync(id);

                if (application == null)
                    throw new UserFriendlyException($"Course application with ID {id} not found.", Abp.Logging.LogSeverity.Warn);

                application.Status = RefListApplicationStatus.Approved;
                application.DecisionDate = DateTime.UtcNow;

                var updated = await _courseApplicationRepository.UpdateAsync(application);
                return ObjectMapper.Map<CourseApplicationDto>(updated);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error approving course application with ID {id}", ex);
                throw new UserFriendlyException(
                    $"Could not approve course application. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        public async Task<CourseApplicationDto> DeclineApplicationAsync(Guid id, string decisionReason)
        {
            try
            {
                if (id == Guid.Empty)
                    throw new UserFriendlyException("Invalid course application ID.", Abp.Logging.LogSeverity.Warn);

                var application = await _courseApplicationRepository.GetAsync(id);

                if (application == null)
                    throw new UserFriendlyException($"Course application with ID {id} not found.", Abp.Logging.LogSeverity.Warn);

                application.Status = RefListApplicationStatus.Declined;
                application.DecisionReason = decisionReason;
                application.DecisionDate = DateTime.UtcNow;

                var updated = await _courseApplicationRepository.UpdateAsync(application);
                return ObjectMapper.Map<CourseApplicationDto>(updated);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error rejecting course application with ID {id}", ex);
                throw new UserFriendlyException(
                    $"Could not reject course application. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        public async Task<List<CourseApplicationDto>> GetApprovedApplicationsAsync()
        {
            try
            {
                var query = _courseApplicationRepository.GetAll()
                    .Where(a => a.Status == RefListApplicationStatus.Approved);

                var applications = await AsyncQueryableExecuter.ToListAsync(query);

                return ObjectMapper.Map<List<CourseApplicationDto>>(applications);
            }
            catch (Exception ex)
            {
                Logger.Error("Error retrieving approved course applications", ex);
                throw new UserFriendlyException(
                    $"Could not retrieve approved course applications. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        public async Task<List<CourseApplicationDto>> GetDeclinedApplicationsAsync()
        {
            try
            {
                var query = _courseApplicationRepository.GetAll()
                    .Where(a => a.Status == RefListApplicationStatus.Declined);

                var applications = await AsyncQueryableExecuter.ToListAsync(query);

                return ObjectMapper.Map<List<CourseApplicationDto>>(applications);
            }
            catch (Exception ex)
            {
                Logger.Error("Error retrieving declined course applications", ex);
                throw new UserFriendlyException(
                    $"Could not retrieve declined course applications. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

    }
}
