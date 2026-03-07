using Abp.Application.Services;
using Moipone.PublicSite.Contacts.Dto;
using System;

namespace Moipone.PublicSite.Contacts
{
    public interface IContactAppService : IAsyncCrudAppService<ContactDto, Guid>
    {
    }
}
