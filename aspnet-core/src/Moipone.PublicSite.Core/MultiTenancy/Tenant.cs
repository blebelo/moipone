using Abp.MultiTenancy;
using Moipone.PublicSite.Authorization.Users;

namespace Moipone.PublicSite.MultiTenancy;

public class Tenant : AbpTenant<User>
{
    public Tenant()
    {
    }

    public Tenant(string tenancyName, string name)
        : base(tenancyName, name)
    {
    }
}
