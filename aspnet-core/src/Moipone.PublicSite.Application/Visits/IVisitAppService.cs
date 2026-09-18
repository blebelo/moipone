using Abp.Application.Services;
using Moipone.PublicSite.Visits.Dto;
using System;

namespace Moipone.PublicSite.Visits
{
    public interface IVisitAppService
        : IAsyncCrudAppService<VisitDto, Guid>
    {
    }
}
