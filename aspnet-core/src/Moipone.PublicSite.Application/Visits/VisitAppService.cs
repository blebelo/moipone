using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using Moipone.PublicSite.Domain.Visits;
using Moipone.PublicSite.Visits.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Moipone.PublicSite.Visits
{
    public class VisitAppService
        : AsyncCrudAppService<Visit, VisitDto, Guid, PagedAndSortedResultRequestDto, VisitDto, VisitDto>,
          IVisitAppService
    {
        private readonly IRepository<Visit, Guid> _visitRepository;

        public VisitAppService(IRepository<Visit, Guid> visitRepository)
            : base(visitRepository)
        {
            _visitRepository = visitRepository;
        }

        public override async Task<VisitDto> CreateAsync(VisitDto input)
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

                var entity = ObjectMapper.Map<Visit>(input);
                var result = await _visitRepository.InsertAsync(entity);

                return ObjectMapper.Map<VisitDto>(result);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error("Error creating Visit", ex);
                throw new UserFriendlyException(
                    $"Could not create Visit. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        public override async Task<PagedResultDto<VisitDto>> GetAllAsync(PagedAndSortedResultRequestDto input)
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

                return new PagedResultDto<VisitDto>(
                    totalCount,
                    ObjectMapper.Map<List<VisitDto>>(items)
                );
            }
            catch (Exception ex)
            {
                Logger.Error("Error retrieving Visits", ex);
                throw new UserFriendlyException(
                    $"Could not retrieve Visits. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

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

                if (entity == null)
                {
                    throw new UserFriendlyException(
                        "Visit not found.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                return ObjectMapper.Map<VisitDto>(entity);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error retrieving Visit with ID {input?.Id}", ex);
                throw new UserFriendlyException(
                    $"Could not retrieve Visit. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

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
                Logger.Error($"Error updating Visit with ID {input?.Id}", ex);
                throw new UserFriendlyException(
                    $"Could not update Visit. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

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
                Logger.Error($"Error deleting Visit with ID {input?.Id}", ex);
                throw new UserFriendlyException(
                    $"Could not delete Visit. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }
    }
}
