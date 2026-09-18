using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using Moipone.PublicSite.Domain.Visitors;
using Moipone.PublicSite.Visitors.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Moipone.PublicSite.Visitors
{
    public class VisitorAppService
        : AsyncCrudAppService<Visitor, VisitorDto, Guid, PagedAndSortedResultRequestDto, VisitorDto, VisitorDto>,
          IVisitorAppService
    {
        private readonly IRepository<Visitor, Guid> _visitorRepository;

        public VisitorAppService(IRepository<Visitor, Guid> visitorRepository)
            : base(visitorRepository)
        {
            _visitorRepository = visitorRepository;
        }

        public override async Task<VisitorDto> CreateAsync(VisitorDto input)
        {
            try
            {
                if (input == null)
                {
                    throw new UserFriendlyException(
                        "Visitor data cannot be null.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var entity = ObjectMapper.Map<Visitor>(input);
                var result = await _visitorRepository.InsertAsync(entity);

                return ObjectMapper.Map<VisitorDto>(result);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error("Error creating Visitor", ex);
                throw new UserFriendlyException(
                    $"Could not create Visitor. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        public override async Task<PagedResultDto<VisitorDto>> GetAllAsync(PagedAndSortedResultRequestDto input)
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

                return new PagedResultDto<VisitorDto>(
                    totalCount,
                    ObjectMapper.Map<List<VisitorDto>>(items)
                );
            }
            catch (Exception ex)
            {
                Logger.Error("Error retrieving Visitors", ex);
                throw new UserFriendlyException(
                    $"Could not retrieve Visitors. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        public override async Task<VisitorDto> GetAsync(EntityDto<Guid> input)
        {
            try
            {
                if (input == null || input.Id == Guid.Empty)
                {
                    throw new UserFriendlyException(
                        "Invalid Visitor ID.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var entity = await _visitorRepository.GetAsync(input.Id);

                if (entity == null)
                {
                    throw new UserFriendlyException(
                        "Visitor not found.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                return ObjectMapper.Map<VisitorDto>(entity);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error retrieving Visitor with ID {input?.Id}", ex);
                throw new UserFriendlyException(
                    $"Could not retrieve Visitor.",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        public override async Task<VisitorDto> UpdateAsync(VisitorDto input)
        {
            try
            {
                if (input == null || input.Id == Guid.Empty)
                {
                    throw new UserFriendlyException(
                        "Invalid Visitor data.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var entity = await _visitorRepository.GetAsync(input.Id);
                ObjectMapper.Map(input, entity);

                var updated = await _visitorRepository.UpdateAsync(entity);
                return ObjectMapper.Map<VisitorDto>(updated);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error updating Visitor with ID {input?.Id}", ex);
                throw new UserFriendlyException(
                    $"Could not update Visitor. Error: {ex.Message}",
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
                        "Invalid Visitor ID.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                await _visitorRepository.DeleteAsync(input.Id);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error deleting Visitor with ID {input?.Id}", ex);
                throw new UserFriendlyException(
                    $"Could not delete Visitor. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        public async Task<VisitorDto> LookupVisitorAsync(string emailAddress)
        {
            try
            {
                if (emailAddress == null)
                {
                    throw new UserFriendlyException(
                        "Invalid Visitor ID.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var entity = await _visitorRepository.FirstOrDefaultAsync(
                    v => v.EmailAddress == emailAddress);

                if (entity == null)
                {
                    throw new UserFriendlyException(
                        "Visitor not found.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                return ObjectMapper.Map<VisitorDto>(entity);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error retrieving Visitor with ID ");
                throw new UserFriendlyException(
                    $"Could not retrieve Visitor.",
                    Abp.Logging.LogSeverity.Error
                );
            }

        }
    }
}
