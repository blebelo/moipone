using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.UI;
using Moipone.PublicSite.Domain.ShortCourses;
using Moipone.PublicSite.ShortCourses.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Moipone.PublicSite.ShortCourses
{
    public class ShortCourseAppService
        : AsyncCrudAppService<ShortCourse, ShortCourseDto, Guid, PagedAndSortedResultRequestDto, ShortCourseDto, ShortCourseDto>,
          IShortCourseAppService
    {
        private readonly IRepository<ShortCourse, Guid> _shortCourseRepository;

        public ShortCourseAppService(IRepository<ShortCourse, Guid> shortCourseRepository)
            : base(shortCourseRepository)
        {
            _shortCourseRepository = shortCourseRepository;
        }

        public async override Task<ShortCourseDto> CreateAsync(ShortCourseDto input)
        {
            try
            {
                if (input == null)
                {
                    throw new UserFriendlyException(
                        "Short course data cannot be null.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var shortCourse = ObjectMapper.Map<ShortCourse>(input);
                var result = await _shortCourseRepository.InsertAsync(shortCourse);
                return ObjectMapper.Map<ShortCourseDto>(result);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error("Error creating short course", ex);
                throw new UserFriendlyException(
                    $"Could not create Short Course. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        public async override Task<PagedResultDto<ShortCourseDto>> GetAllAsync(
            PagedAndSortedResultRequestDto input)
        {
            try
            {
                var query = Repository.GetAll();
                var totalCount = await AsyncQueryableExecuter.CountAsync(query);

                var shortCourses = await AsyncQueryableExecuter.ToListAsync(
                    query.OrderBy(sc => sc.StartDate)
                         .Skip(input.SkipCount)
                         .Take(input.MaxResultCount)
                );

                var result = ObjectMapper.Map<List<ShortCourseDto>>(shortCourses);
                return new PagedResultDto<ShortCourseDto>(totalCount, result);
            }
            catch (Exception ex)
            {
                Logger.Error("Error retrieving short courses", ex);
                throw new UserFriendlyException(
                    $"Could not retrieve Short Courses. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }
        [AbpAuthorize]
        public async override Task<ShortCourseDto> GetAsync(EntityDto<Guid> input)
        {
            try
            {
                if (input == null || input.Id == Guid.Empty)
                {
                    throw new UserFriendlyException(
                        "Invalid short course ID.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var shortCourse = await _shortCourseRepository.GetAsync(input.Id);

                if (shortCourse == null)
                {
                    throw new UserFriendlyException(
                        $"Short course with ID {input.Id} not found.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                return ObjectMapper.Map<ShortCourseDto>(shortCourse);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error retrieving short course with ID {input?.Id}", ex);
                throw new UserFriendlyException(
                    $"Could not retrieve Short Course. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        [AbpAuthorize]
        public async override Task<ShortCourseDto> UpdateAsync(ShortCourseDto input)
        {
            try
            {
                if (input == null)
                {
                    throw new UserFriendlyException(
                        "Short course data cannot be null.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                if (input.Id == Guid.Empty)
                {
                    throw new UserFriendlyException(
                        "Invalid short course ID.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var shortCourse = await _shortCourseRepository.GetAsync(input.Id);

                ObjectMapper.Map(input, shortCourse);
                var updatedShortCourse = await _shortCourseRepository.UpdateAsync(shortCourse);

                return ObjectMapper.Map<ShortCourseDto>(updatedShortCourse);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error updating short course with ID {input?.Id}", ex);
                throw new UserFriendlyException(
                    $"Could not update Short Course. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        [AbpAuthorize]
        public async override Task DeleteAsync(EntityDto<Guid> input)
        {
            try
            {
                if (input == null || input.Id == Guid.Empty)
                {
                    throw new UserFriendlyException(
                        "Invalid short course ID.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var shortCourse = await _shortCourseRepository.GetAsync(input.Id);

                if (shortCourse == null)
                {
                    throw new UserFriendlyException(
                        $"Short course with ID {input.Id} not found.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                await _shortCourseRepository.DeleteAsync(input.Id);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error deleting short course with ID {input?.Id}", ex);
                throw new UserFriendlyException(
                    $"Could not delete Short Course. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        [AbpAuthorize]
        public async Task<ShortCourseDto> GetByCodeAsync(string code)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(code))
                {
                    throw new UserFriendlyException(
                        "Course code cannot be null or empty.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var shortCourse = await AsyncQueryableExecuter.FirstOrDefaultAsync(
                    _shortCourseRepository
                        .GetAll()
                        .Where(sc => sc.Code == code)
                );

                if (shortCourse == null)
                {
                    throw new UserFriendlyException(
                        $"Short course with code {code} not found.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                return ObjectMapper.Map<ShortCourseDto>(shortCourse);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error("Error retrieving short course by code", ex);
                throw new UserFriendlyException(
                    $"Could not retrieve Short Course. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        [AbpAuthorize]
        public async Task<ShortCourseDto> OpenApplicationsAsync(Guid id)
        {
            try
            {
                if (id == Guid.Empty)
                {
                    throw new UserFriendlyException(
                        "Invalid short course ID.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var shortCourse = await _shortCourseRepository.GetAsync(id);

                if (shortCourse == null)
                {
                    throw new UserFriendlyException(
                        $"Short course with ID {id} not found.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                shortCourse.IsActive = true;
                var updatedShortCourse = await _shortCourseRepository.UpdateAsync(shortCourse);

                return ObjectMapper.Map<ShortCourseDto>(updatedShortCourse);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error opening applications for short course with ID {id}", ex);
                throw new UserFriendlyException(
                    $"Could not open applications. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        [AbpAuthorize]
        public async Task<ShortCourseDto> CloseApplicationsAsync(Guid id)
        {
            try
            {
                if (id == Guid.Empty)
                {
                    throw new UserFriendlyException(
                        "Invalid short course ID.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var shortCourse = await _shortCourseRepository.GetAsync(id);

                if (shortCourse == null)
                {
                    throw new UserFriendlyException(
                        $"Short course with ID {id} not found.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                shortCourse.IsActive = false;
                var updatedShortCourse = await _shortCourseRepository.UpdateAsync(shortCourse);

                return ObjectMapper.Map<ShortCourseDto>(updatedShortCourse);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error closing applications for short course with ID {id}", ex);
                throw new UserFriendlyException(
                    $"Could not close applications. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        [AbpAuthorize]
        public async Task<ShortCourseDto> ReopenApplicationsAsync(Guid id)
        {
            try
            {
                if (id == Guid.Empty)
                {
                    throw new UserFriendlyException(
                        "Invalid short course ID.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var shortCourse = await _shortCourseRepository.GetAsync(id);

                if (shortCourse == null)
                {
                    throw new UserFriendlyException(
                        $"Short course with ID {id} not found.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                shortCourse.IsActive = true;
                var updatedShortCourse = await _shortCourseRepository.UpdateAsync(shortCourse);

                return ObjectMapper.Map<ShortCourseDto>(updatedShortCourse);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error reopening applications for short course with ID {id}", ex);
                throw new UserFriendlyException(
                    $"Could not reopen applications. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        [AbpAuthorize]
        public async Task<List<ShortCourseDto>> GetOpenCoursesAsync()
        {
            try
            {
                var shortCourses = await AsyncQueryableExecuter.ToListAsync(
                    _shortCourseRepository
                        .GetAll()
                        .Where(sc => sc.IsActive)
                        .OrderBy(sc => sc.StartDate)
                );

                return ObjectMapper.Map<List<ShortCourseDto>>(shortCourses);
            }
            catch (Exception ex)
            {
                Logger.Error("Error retrieving open courses", ex);
                throw new UserFriendlyException(
                    $"Could not retrieve open courses. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        [AbpAuthorize]
        public async Task<int> GetCurrentCapacityAsync(Guid id)
        {
            try
            {
                if (id == Guid.Empty)
                {
                    throw new UserFriendlyException(
                        "Invalid short course ID.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var course = await _shortCourseRepository.GetAsync(id);

                if (course == null)
                {
                    throw new UserFriendlyException(
                        $"Short course with ID {id} not found.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var capacity = course.Capacity - course.EnrolledStudents.Count;
                return capacity;
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error retrieving current capacity for short course with ID {id}", ex);
                throw new UserFriendlyException(
                    $"Could not retrieve current capacity. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

    }
}