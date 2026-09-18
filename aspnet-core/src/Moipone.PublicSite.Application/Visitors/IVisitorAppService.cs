using Abp.Application.Services;
using Moipone.PublicSite.Visitors.Dto;
using System;

namespace Moipone.PublicSite.Visitors
{
    public interface IVisitorAppService
        : IAsyncCrudAppService<VisitorDto, Guid>
    {
    }
}
