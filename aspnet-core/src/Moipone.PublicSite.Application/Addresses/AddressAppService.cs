using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using Moipone.PublicSite.Addresses.Dto;
using Moipone.PublicSite.Domain.Addresses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using static System.Collections.Specialized.BitVector32;

namespace Moipone.PublicSite.Addresses
{
    public class AddressAppService : AsyncCrudAppService<Address, AddressDto, Guid, PagedAndSortedResultRequestDto, AddressDto, AddressDto>, IAddressAppService
    {
        private readonly IRepository<Address, Guid> _addressRepository;

        public AddressAppService(IRepository<Address, Guid> addressRepository)
            : base(addressRepository)
        {
            _addressRepository = addressRepository;
        }

        public async override Task<AddressDto> CreateAsync(AddressDto input)
        {
            try
            {
                if (input == null)
                {
                    throw new UserFriendlyException("Address data cannot be null.", Abp.Logging.LogSeverity.Warn);
                }

                var address = ObjectMapper.Map<Address>(input);
                var result = await _addressRepository.InsertAsync(address);
                return ObjectMapper.Map<AddressDto>(result);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error("Error creating address", ex);
                throw new UserFriendlyException($"Could not create Address. Error: {ex.Message}", Abp.Logging.LogSeverity.Error);
            }
        }

        public async override Task<PagedResultDto<AddressDto>> GetAllAsync(PagedAndSortedResultRequestDto input)
        {
            try
            {
                var query = Repository.GetAll();
                var totalCount = await AsyncQueryableExecuter.CountAsync(query);

                var addresses = await AsyncQueryableExecuter.ToListAsync(
                query.OrderBy(a => a.Id)
                                     .Skip(input.SkipCount)
                                     .Take(input.MaxResultCount)
                            );
                var result = ObjectMapper.Map<List<AddressDto>>(addresses);
                return new PagedResultDto<AddressDto>(totalCount, result);
            }
            catch (Exception ex)
            {
                Logger.Error("Error retrieving addresses", ex);
                throw new UserFriendlyException($"Could not retrieve Addresses. Error: {ex.Message}", Abp.Logging.LogSeverity.Error);
            }
        }

        public async override Task<AddressDto> GetAsync(EntityDto<Guid> input)
        {
            try
            {
                if (input == null || input.Id == Guid.Empty)
                {
                    throw new UserFriendlyException("Invalid address ID.", Abp.Logging.LogSeverity.Warn);
                }

                var address = await _addressRepository.GetAsync(input.Id);

                if (address == null)
                {
                    throw new UserFriendlyException($"Address with ID {input.Id} not found.", Abp.Logging.LogSeverity.Warn);
                }

                return ObjectMapper.Map<AddressDto>(address);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error retrieving address with ID {input?.Id}", ex);
                throw new UserFriendlyException($"Could not retrieve Address. Error: {ex.Message}", Abp.Logging.LogSeverity.Error);
            }
        }

        public async override Task<AddressDto> UpdateAsync(AddressDto input)
        {
            try
            {
                if (input == null)
                {
                    throw new UserFriendlyException("Address data cannot be null.", Abp.Logging.LogSeverity.Warn);
                }

                if (input.Id == Guid.Empty)
                {
                    throw new UserFriendlyException("Invalid address ID.", Abp.Logging.LogSeverity.Warn);
                }

                var address = await _addressRepository.GetAsync(input.Id);

                ObjectMapper.Map(input, address);
                var updatedAddress = await _addressRepository.UpdateAsync(address);
                return ObjectMapper.Map<AddressDto>(updatedAddress);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error updating address with ID {input?.Id}", ex);
                throw new UserFriendlyException($"Could not update Address. Error: {ex.Message}", Abp.Logging.LogSeverity.Error);
            }
        }

        public async override Task DeleteAsync(EntityDto<Guid> input)
        {
            try
            {
                if (input == null || input.Id == Guid.Empty)
                {
                    throw new UserFriendlyException("Invalid address ID.", Abp.Logging.LogSeverity.Warn);
                }

                var address = await _addressRepository.GetAsync(input.Id);

                if (address == null)
                {
                    throw new UserFriendlyException($"Address with ID {input.Id} not found.", Abp.Logging.LogSeverity.Warn);
                }

                await _addressRepository.DeleteAsync(input.Id);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error deleting address with ID {input?.Id}", ex);
                throw new UserFriendlyException($"Could not delete Address. Error: {ex.Message}", Abp.Logging.LogSeverity.Error);
            }
        }
    }
}