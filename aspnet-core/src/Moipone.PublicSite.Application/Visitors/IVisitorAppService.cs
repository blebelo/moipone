using Abp.Application.Services;
using Moipone.PublicSite.Visitors.Dto;
using System;
using System.Threading.Tasks;

namespace Moipone.PublicSite.Visitors
{
    public interface IVisitorAppService
        : IAsyncCrudAppService<VisitorDto, Guid>
    {
        Task<VisitorDto> LookupVisitorAsync(string emailAddress);
    }
}
