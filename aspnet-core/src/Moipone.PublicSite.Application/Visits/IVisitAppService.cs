using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Moipone.PublicSite.Visits.Dto;
using System;
using System.Threading.Tasks;

namespace Moipone.PublicSite.Visits
{
    public interface IVisitAppService : IAsyncCrudAppService<VisitDto, Guid, PagedAndSortedResultRequestDto, CreateVisitDto, VisitDto>
    {
        Task<VisitDto> CheckInAsync(VisitDto input);
        Task<VisitDto> CheckOutAsync(Guid input); 
    }
}
