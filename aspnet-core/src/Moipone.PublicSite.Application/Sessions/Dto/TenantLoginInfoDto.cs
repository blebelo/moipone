using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Moipone.PublicSite.MultiTenancy;

namespace Moipone.PublicSite.Sessions.Dto;

[AutoMapFrom(typeof(Tenant))]
public class TenantLoginInfoDto : EntityDto
{
    public string TenancyName { get; set; }

    public string Name { get; set; }
}
