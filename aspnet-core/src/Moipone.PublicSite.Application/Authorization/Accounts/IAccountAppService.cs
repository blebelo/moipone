using Abp.Application.Services;
using Moipone.PublicSite.Authorization.Accounts.Dto;
using System.Threading.Tasks;

namespace Moipone.PublicSite.Authorization.Accounts;

public interface IAccountAppService : IApplicationService
{
    Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

    Task<RegisterOutput> Register(RegisterInput input);
}
