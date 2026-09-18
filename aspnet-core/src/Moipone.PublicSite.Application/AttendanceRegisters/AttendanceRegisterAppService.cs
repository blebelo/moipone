using Abp.Application.Services;
using Abp.Application.Services.Dto;
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
    }
}
