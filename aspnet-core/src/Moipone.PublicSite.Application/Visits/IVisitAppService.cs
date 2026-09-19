using Abp.Application.Services;
using Moipone.PublicSite.Visits.Dto;
using System;
using System.Threading.Tasks;

namespace Moipone.PublicSite.Visits
{
    public interface IVisitAppService
        : IAsyncCrudAppService<VisitDto, Guid>
    {
        Task<VisitDto> CheckOutAsync(Guid input); 
    }
}
