using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.Timing;
using Abp.UI;
using Moipone.PublicSite.Domain.Visitors;
using Moipone.PublicSite.Domain.Visits;
using Moipone.PublicSite.Visits.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Moipone.PublicSite.Visits
{
    public class VisitAppService : AsyncCrudAppService<Visit, VisitDto, Guid, PagedAndSortedResultRequestDto, CreateVisitDto, VisitDto>, IVisitAppService
    {
        private readonly IRepository<Visit, Guid> _visitRepository;
        private readonly IRepository<AttendanceRegister, int> _attendanceRegisterRepository;
        private readonly IRepository<Visitor, Guid> _visitorRepository;

        public VisitAppService(IRepository<Visit, Guid> visitRepository, IRepository<AttendanceRegister, int> attendanceRegisterRepository,
            IRepository<Visitor, Guid> visitorRepository)
            : base(visitRepository)
        {
            _visitRepository = visitRepository;
            _attendanceRegisterRepository = attendanceRegisterRepository;
            _visitorRepository = visitorRepository;
        }

        [AbpAuthorize]
        public override async Task<PagedResultDto<VisitDto>> GetAllAsync(PagedAndSortedResultRequestDto input)
        {
            try
            {
                var query = Repository.GetAll();

                var totalCount = await AsyncQueryableExecuter.CountAsync(query);

                var items = await AsyncQueryableExecuter.ToListAsync(
                    query
                        .OrderBy(x => x.Id)
                        .Skip(input.SkipCount)
                        .Take(input.MaxResultCount)
                );

                return new PagedResultDto<VisitDto>(
                    totalCount,
                    ObjectMapper.Map<List<VisitDto>>(items)
                );
            }
            catch (Exception ex)
            {
                Logger.Error("Error retrieving Visits.", ex);

                throw new UserFriendlyException(
                    "Could not retrieve visits. Please try again.",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        [AbpAuthorize]
        public override async Task<VisitDto> GetAsync(EntityDto<Guid> input)
        {
            try
            {
                if (input == null || input.Id == Guid.Empty)
                {
                    throw new UserFriendlyException(
                        "Invalid Visit ID.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var entity = await _visitRepository.GetAsync(input.Id);

                return ObjectMapper.Map<VisitDto>(entity);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error(
                    $"Error retrieving Visit with ID {input?.Id}.",
                    ex
                );

                throw new UserFriendlyException(
                    "Could not retrieve the visit. Please try again.",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        public override async Task<VisitDto> CreateAsync(CreateVisitDto input)
        {
            try
            {
                if (input == null)
                {
                    throw new UserFriendlyException(
                        "Visit data cannot be null.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                if (input.Visitor == null)
                {
                    throw new UserFriendlyException(
                        "Visitor information is required.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var register = await GetTodaysRegisterAsync();

                if (register.IsClosed)
                {
                    throw new UserFriendlyException(
                        "Today's attendance register is closed.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var visitor = ObjectMapper.Map<Visitor>(input.Visitor);

                NormalizeVisitor(visitor);

                visitor = await _visitorRepository.InsertAsync(visitor);

                var visit = ObjectMapper.Map<Visit>(input);

                visit.VisitorId = visitor.Id;
                visit.AttendanceRegisterId = register.Id;

                var result = await _visitRepository.InsertAsync(visit);

                return ObjectMapper.Map<VisitDto>(result);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error("Error creating Visit.", ex);

                throw new UserFriendlyException(
                    "Could not create the visit. Please try again.",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        [AbpAuthorize]
        public override async Task<VisitDto> UpdateAsync(VisitDto input)
        {
            try
            {
                if (input == null || input.Id == Guid.Empty)
                {
                    throw new UserFriendlyException(
                        "Invalid Visit data.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var entity = await _visitRepository.GetAsync(input.Id);

                ObjectMapper.Map(input, entity);

                var updated = await _visitRepository.UpdateAsync(entity);

                return ObjectMapper.Map<VisitDto>(updated);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error(
                    $"Error updating Visit with ID {input?.Id}.",
                    ex
                );

                throw new UserFriendlyException(
                    "Could not update the visit. Please try again.",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        [AbpAuthorize]
        public override async Task DeleteAsync(EntityDto<Guid> input)
        {
            try
            {
                if (input == null || input.Id == Guid.Empty)
                {
                    throw new UserFriendlyException(
                        "Invalid Visit ID.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                await _visitRepository.DeleteAsync(input.Id);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error(
                    $"Error deleting Visit with ID {input?.Id}.",
                    ex
                );

                throw new UserFriendlyException(
                    "Could not delete the visit. Please try again.",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }


        public async Task<VisitDto> CheckInAsync(VisitDto input)
        {
            try
            {
                if (input == null)
                {
                    throw new UserFriendlyException(
                        "Check-in data is required.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                if (input.VisitorId == Guid.Empty)
                {
                    throw new UserFriendlyException(
                        "Visitor ID is required.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var register = await GetTodaysRegisterAsync();

                if (register.IsClosed)
                {
                    throw new UserFriendlyException(
                        "Today's attendance register is closed.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var visitor = await _visitorRepository.FirstOrDefaultAsync(
                    v => v.Id == input.VisitorId
                );


                var alreadyCheckedIn = await AsyncQueryableExecuter.AnyAsync(
                    _visitRepository.GetAll().Where(v =>
                    v.VisitorId == input.VisitorId &&
                    v.CheckOutDate == null)
                );

                if (alreadyCheckedIn)
                {
                    throw new UserFriendlyException(
                        "You are already checked in.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                if (visitor == null)
                {
                    throw new UserFriendlyException(
                        "Visitor could not be found.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var visit = new Visit
                {
                    VisitorId = visitor.Id,
                    AttendanceRegisterId = register.Id,
                    VisitReason = input.VisitReason,
                    OtherReason = input.OtherReason
                };

                var result = await _visitRepository.InsertAsync(visit);

                return ObjectMapper.Map<VisitDto>(result);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error("Error checking in visitor.", ex);

                throw new UserFriendlyException(
                    "Could not check in the visitor. Please try again.",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        [AbpAuthorize]
        public async Task<VisitDto> CheckOutAsync(Guid visitId)
        {
            try
            {
                if (visitId == Guid.Empty)
                {
                    throw new UserFriendlyException(
                        "Invalid Visit ID.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var visit = await _visitRepository.FirstOrDefaultAsync(
                    v => v.Id == visitId
                );

                if (visit == null)
                {
                    throw new UserFriendlyException(
                        "Visit not found.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                if (visit.CheckOutDate.HasValue)
                {
                    throw new UserFriendlyException(
                        "Visitor has already checked out.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                visit.CheckOutDate = Clock.Now;

                var updatedVisit = await _visitRepository.UpdateAsync(visit);

                return ObjectMapper.Map<VisitDto>(updatedVisit);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error(
                    $"Error checking out Visit with ID {visitId}.",
                    ex
                );

                throw new UserFriendlyException(
                    "Could not check out the visitor. Please try again.",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        private async Task<AttendanceRegister> GetTodaysRegisterAsync()
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

                var register = await _attendanceRegisterRepository
                    .FirstOrDefaultAsync(r => r.Date == today);

                if (register == null)
                {
                    register = new AttendanceRegister
                    {
                        Date = today,
                        IsClosed = false
                    };

                    await _attendanceRegisterRepository.InsertAsync(register);
                }

                return register;
            }
            catch (Exception ex)
            {
                Logger.Error(
                    "Error retrieving today's attendance register.",
                    ex
                );

                throw new UserFriendlyException(
                    "Could not access today's attendance register. Please try again.",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }
        private void NormalizeVisitor(Visitor visitor)
        {
            if (!string.IsNullOrWhiteSpace(visitor.EmailAddress))
            {
                visitor.EmailAddress =
                    visitor.EmailAddress.Trim().ToLowerInvariant();
            }

            if (!string.IsNullOrWhiteSpace(visitor.ContactNumber))
            {
                visitor.ContactNumber =
                    visitor.ContactNumber.Trim();
            }

            if (!string.IsNullOrWhiteSpace(visitor.Name))
            {
                visitor.Name =
                    visitor.Name.Trim();
            }

            if (!string.IsNullOrWhiteSpace(visitor.Surname))
            {
                visitor.Surname =
                    visitor.Surname.Trim();
            }
        }
    }
}
