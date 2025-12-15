using Abp.Application.Services;
using Moipone.PublicSite.Addresses.Dto;
using System;

namespace Moipone.PublicSite.Addresses
{
    public interface IAddressAppService: IAsyncCrudAppService<AddressDto, Guid>
    {
    }
}
