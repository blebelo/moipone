using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using Moipone.PublicSite.Contacts.Dto;
using Moipone.PublicSite.Domain.Contacts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Moipone.PublicSite.Contacts
{
    public class ContactAppService
        : AsyncCrudAppService<Contact, ContactDto, Guid, PagedAndSortedResultRequestDto, ContactDto, ContactDto>,
          IContactAppService
    {
        private readonly IRepository<Contact, Guid> _contactRepository;

        public ContactAppService(IRepository<Contact, Guid> contactRepository)
            : base(contactRepository)
        {
            _contactRepository = contactRepository;
        }

        public async override Task<ContactDto> CreateAsync(ContactDto input)
        {
            try
            {
                if (input == null)
                {
                    throw new UserFriendlyException(
                        "Contact data cannot be null.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var entity = ObjectMapper.Map<Contact>(input);
                var result = await _contactRepository.InsertAsync(entity);

                return ObjectMapper.Map<ContactDto>(result);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error("Error creating contact", ex);
                throw new UserFriendlyException($"Could not create Contact. Error: {ex.Message}", Abp.Logging.LogSeverity.Error);
            }
        }

        public async override Task<PagedResultDto<ContactDto>> GetAllAsync(PagedAndSortedResultRequestDto input)
        {
            try
            {
                var query = Repository.GetAll();
                var totalCount = await AsyncQueryableExecuter.CountAsync(query);

                var contacts = await AsyncQueryableExecuter.ToListAsync(
                    query.OrderBy(x => x.Id)
                         .Skip(input.SkipCount)
                         .Take(input.MaxResultCount)
                );

                return new PagedResultDto<ContactDto>(
                    totalCount,
                    ObjectMapper.Map<List<ContactDto>>(contacts)
                );
            }
            catch (Exception ex)
            {
                Logger.Error("Error retrieving contacts", ex);
                throw new UserFriendlyException($"Could not retrieve Contacts. Error: {ex.Message}", Abp.Logging.LogSeverity.Error);
            }
        }

        public async override Task<ContactDto> GetAsync(EntityDto<Guid> input)
        {
            try
            {
                if (input == null || input.Id == Guid.Empty)
                {
                    throw new UserFriendlyException("Invalid contact ID.", Abp.Logging.LogSeverity.Warn);
                }

                var contact = await _contactRepository.GetAsync(input.Id);

                if (contact == null)
                {
                    throw new UserFriendlyException($"Contact with ID {input.Id} not found.", Abp.Logging.LogSeverity.Warn);
                }

                return ObjectMapper.Map<ContactDto>(contact);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error retrieving contact with ID {input?.Id}", ex);
                throw new UserFriendlyException($"Could not retrieve Contact. Error: {ex.Message}", Abp.Logging.LogSeverity.Error);
            }
        }

        public async override Task<ContactDto> UpdateAsync(ContactDto input)
        {
            try
            {
                if (input == null)
                {
                    throw new UserFriendlyException(
                        "Contact data cannot be null.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                if (input.Id == Guid.Empty)
                {
                    throw new UserFriendlyException(
                        "Invalid contact ID.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var contact = await _contactRepository.GetAsync(input.Id);
                ObjectMapper.Map(input, contact);

                var updated = await _contactRepository.UpdateAsync(contact);
                return ObjectMapper.Map<ContactDto>(updated);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error updating contact with ID {input?.Id}", ex);
                throw new UserFriendlyException($"Could not update Contact. Error: {ex.Message}", Abp.Logging.LogSeverity.Error);
            }
        }

        public async override Task DeleteAsync(EntityDto<Guid> input)
        {
            try
            {
                if (input == null || input.Id == Guid.Empty)
                {
                    throw new UserFriendlyException("Invalid contact ID.", Abp.Logging.LogSeverity.Warn);
                }

                var contact = await _contactRepository.GetAsync(input.Id);

                if (contact == null)
                {
                    throw new UserFriendlyException($"Contact with ID {input.Id} not found.", Abp.Logging.LogSeverity.Warn);
                }

                await _contactRepository.DeleteAsync(input.Id);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error deleting contact with ID {input?.Id}", ex);
                throw new UserFriendlyException($"Could not delete Contact. Error: {ex.Message}", Abp.Logging.LogSeverity.Error);
            }
        }
    }
}
