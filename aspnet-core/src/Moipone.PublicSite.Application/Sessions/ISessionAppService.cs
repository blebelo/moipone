using Abp.Application.Services;
using Moipone.PublicSite.Sessions.Dto;
using System.Threading.Tasks;

namespace Moipone.PublicSite.Sessions;

public interface ISessionAppService : IApplicationService
{
    Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
}
