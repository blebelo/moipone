using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Entities;
using Abp.Domain.Repositories;
using Abp.UI;
using Microsoft.AspNetCore.Mvc;
using Moipone.PublicSite.Domain.Visitors;
using Moipone.PublicSite.Visitors.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Moipone.PublicSite.Visitors
{
    public class VisitorAppService : AsyncCrudAppService<Visitor, VisitorDto, Guid, PagedAndSortedResultRequestDto, VisitorDto, VisitorDto>, IVisitorAppService
    {
        private readonly IRepository<Visitor, Guid> _visitorRepository;

        public VisitorAppService(
            IRepository<Visitor, Guid> visitorRepository)
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
                        "Visitor data is required.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var entity = ObjectMapper.Map<Visitor>(input);

                NormalizeVisitor(entity);

                var result = await _visitorRepository.InsertAsync(entity);

                return ObjectMapper.Map<VisitorDto>(result);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error("Error creating Visitor.", ex);

                throw new UserFriendlyException(
                    "Could not create the visitor. Please try again.",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        [AbpAuthorize]
        public override async Task<PagedResultDto<VisitorDto>> GetAllAsync(
            PagedAndSortedResultRequestDto input)
        {
            try
            {
                var query = Repository.GetAll();

                var totalCount =
                    await AsyncQueryableExecuter.CountAsync(query);

                var items =
                    await AsyncQueryableExecuter.ToListAsync(
                        query
                            .OrderBy(x => x.Id)
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
                Logger.Error("Error retrieving Visitors.", ex);

                throw new UserFriendlyException(
                    "Could not retrieve visitors. Please try again.",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        [AbpAuthorize]
        public override async Task<VisitorDto> GetAsync(
            EntityDto<Guid> input)
        {
            try
            {
                if (input == null || input.Id == Guid.Empty)
                {
                    throw new UserFriendlyException(
                        "Invalid visitor ID.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var entity =
                    await _visitorRepository.GetAsync(input.Id);

                return ObjectMapper.Map<VisitorDto>(entity);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error(
                    $"Error retrieving Visitor with ID {input?.Id}.",
                    ex
                );

                throw new UserFriendlyException(
                    "Could not retrieve the visitor. Please try again.",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        [AbpAuthorize]
        public override async Task<VisitorDto> UpdateAsync(
            VisitorDto input)
        {
            try
            {
                if (input == null || input.Id == Guid.Empty)
                {
                    throw new UserFriendlyException(
                        "Invalid visitor data.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var entity =
                    await _visitorRepository.GetAsync(input.Id);

                ObjectMapper.Map(input, entity);

                NormalizeVisitor(entity);

                var updated =
                    await _visitorRepository.UpdateAsync(entity);

                return ObjectMapper.Map<VisitorDto>(updated);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error(
                    $"Error updating Visitor with ID {input?.Id}.",
                    ex
                );

                throw new UserFriendlyException(
                    "Could not update the visitor. Please try again.",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        [AbpAuthorize]
        public override async Task DeleteAsync(
            EntityDto<Guid> input)
        {
            try
            {
                if (input == null || input.Id == Guid.Empty)
                {
                    throw new UserFriendlyException(
                        "Invalid visitor ID.",
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
                Logger.Error(
                    $"Error deleting Visitor with ID {input?.Id}.",
                    ex
                );

                throw new UserFriendlyException(
                    "Could not delete the visitor. Please try again.",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        [HttpGet]
        public async Task<LightWeightVisitorDto> LookupVisitorAsync(
            string emailAddress)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(emailAddress))
                {
                    throw new UserFriendlyException(
                        "Email address is required.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var normalizedEmail =
                    emailAddress.Trim().ToLowerInvariant();

                var entity =
                    await _visitorRepository.FirstOrDefaultAsync(
                        v => v.EmailAddress == normalizedEmail
                    );

                if (entity == null)
                {
                    throw new EntityNotFoundException("Visitor could not be found.");
                }

                return ObjectMapper.Map<LightWeightVisitorDto>(entity);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error(
                    "Error looking up Visitor.",
                    ex
                );

                throw new UserFriendlyException(
                    "Could not look up the visitor. Please try again.",
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