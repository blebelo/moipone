using Abp.Application.Services;
using Moipone.PublicSite.MultiTenancy.Dto;

namespace Moipone.PublicSite.MultiTenancy;

public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
{
}

