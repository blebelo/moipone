using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.UI;
using Moipone.PublicSite.AttendanceRegisters.Dto;
using Moipone.PublicSite.Domain.Visits;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Moipone.PublicSite.AttendanceRegisters
{
    public class AttendanceRegisterAppService
        : AsyncCrudAppService<AttendanceRegister, AttendanceRegisterDto, int, PagedAndSortedResultRequestDto, AttendanceRegisterDto, AttendanceRegisterDto>,
          IAttendanceRegisterAppService
    {
        private readonly IRepository<AttendanceRegister, int> _attendanceRegisterRepository;

        public AttendanceRegisterAppService(IRepository<AttendanceRegister, int> attendanceRegisterRepository)
            : base(attendanceRegisterRepository)
        {
            _attendanceRegisterRepository = attendanceRegisterRepository;
        }

        [AbpAuthorize]
        public override async Task<AttendanceRegisterDto> CreateAsync(AttendanceRegisterDto input)
        {
            try
            {
                if (input == null)
                {
                    throw new UserFriendlyException(
                        "AttendanceRegister data cannot be null.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var entity = ObjectMapper.Map<AttendanceRegister>(input);
                var result = await _attendanceRegisterRepository.InsertAsync(entity);

                return ObjectMapper.Map<AttendanceRegisterDto>(result);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error("Error creating AttendanceRegister", ex);
                throw new UserFriendlyException(
                    $"Could not create AttendanceRegister. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        [AbpAuthorize]
        public override async Task<PagedResultDto<AttendanceRegisterDto>> GetAllAsync(PagedAndSortedResultRequestDto input)
        {
            try
            {
                var query = Repository.GetAll();
                var totalCount = await AsyncQueryableExecuter.CountAsync(query);

                var items = await AsyncQueryableExecuter.ToListAsync(
                    query.OrderBy(x => x.Id)
                         .Skip(input.SkipCount)
                         .Take(input.MaxResultCount)
                );

                return new PagedResultDto<AttendanceRegisterDto>(
                    totalCount,
                    ObjectMapper.Map<List<AttendanceRegisterDto>>(items)
                );
            }
            catch (Exception ex)
            {
                Logger.Error("Error retrieving AttendanceRegisters", ex);
                throw new UserFriendlyException(
                    $"Could not retrieve AttendanceRegisters. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        [AbpAuthorize]
        public override async Task<AttendanceRegisterDto> GetAsync(EntityDto<int> input)
        {
            try
            {
                if (input == null)
                {
                    throw new UserFriendlyException(
                        "Invalid AttendanceRegister ID.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var entity = await _attendanceRegisterRepository.GetAsync(input.Id);

                if (entity == null)
                {
                    throw new UserFriendlyException(
                        "AttendanceRegister not found.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                return ObjectMapper.Map<AttendanceRegisterDto>(entity);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error retrieving AttendanceRegister with ID {input?.Id}", ex);
                throw new UserFriendlyException(
                    $"Could not retrieve AttendanceRegister. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        [AbpAuthorize]
        public override async Task<AttendanceRegisterDto> UpdateAsync(AttendanceRegisterDto input)
        {
            try
            {
                if (input == null)
                {
                    throw new UserFriendlyException(
                        "Invalid AttendanceRegister data.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var entity = await _attendanceRegisterRepository.GetAsync(input.Id);
                ObjectMapper.Map(input, entity);

                var updated = await _attendanceRegisterRepository.UpdateAsync(entity);
                return ObjectMapper.Map<AttendanceRegisterDto>(updated);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error updating AttendanceRegister with ID {input?.Id}", ex);
                throw new UserFriendlyException(
                    $"Could not update AttendanceRegister. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        [AbpAuthorize]
        public override async Task DeleteAsync(EntityDto<int> input)
        {
            try
            {
                if (input == null)
                {
                    throw new UserFriendlyException(
                        "Invalid AttendanceRegister ID.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                await _attendanceRegisterRepository.DeleteAsync(input.Id);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error deleting AttendanceRegister with ID {input?.Id}", ex);
                throw new UserFriendlyException(
                    $"Could not delete AttendanceRegister. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        public async Task<AttendanceRegisterDto> GetTodayAsync()
        {
            try
            {
                var southAfricaTimeZone = TimeZoneInfo.FindSystemTimeZoneById(
                    "Africa/Johannesburg"
                );

                var now = TimeZoneInfo.ConvertTimeFromUtc(
                    DateTime.UtcNow,
                    southAfricaTimeZone
                );

                var today = DateOnly.FromDateTime(now);

                var entity = await _attendanceRegisterRepository
                    .FirstOrDefaultAsync(r => r.Date == today);

                if (entity == null)
                {
                    entity = new AttendanceRegister
                    {
                        Date = today,
                        IsClosed = false
                    };

                    await _attendanceRegisterRepository.InsertAsync(entity);
                }

                return ObjectMapper.Map<AttendanceRegisterDto>(entity);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error("Error retrieving today's AttendanceRegister.", ex);

                throw new UserFriendlyException(
                    "Could not retrieve today's attendance register. Please try again.",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }
      
        [AbpAuthorize]
        public async Task<AttendanceRegisterDto> CloseAsync(int id)
        {
            try
            {
                if (id <= 0)
                {
                    throw new UserFriendlyException(
                        "Invalid AttendanceRegister ID.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var entity = await _attendanceRegisterRepository.GetAsync(id);

                if (entity.IsClosed)
                {
                    throw new UserFriendlyException(
                        "Attendance register is already closed.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                entity.IsClosed = true;

                var updated = await _attendanceRegisterRepository.UpdateAsync(entity);

                return ObjectMapper.Map<AttendanceRegisterDto>(updated);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error(
                    $"Error closing AttendanceRegister with ID {id}.",
                    ex
                );

                throw new UserFriendlyException(
                    "Could not close the attendance register. Please try again.",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }
       
        [AbpAuthorize]
        public async Task<AttendanceRegisterDto> ReopenAsync(int id)
        {
            try
            {
                if (id <= 0)
                {
                    throw new UserFriendlyException(
                        "Invalid AttendanceRegister ID.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var entity = await _attendanceRegisterRepository.GetAsync(id);

                if (!entity.IsClosed)
                {
                    throw new UserFriendlyException(
                        "Attendance register is already open.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                entity.IsClosed = false;

                var updated = await _attendanceRegisterRepository.UpdateAsync(entity);

                return ObjectMapper.Map<AttendanceRegisterDto>(updated);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error(
                    $"Error reopening AttendanceRegister with ID {id}.",
                    ex
                );

                throw new UserFriendlyException(
                    "Could not reopen the attendance register. Please try again.",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }
    }
}
