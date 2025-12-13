using Abp.Zero.EntityFrameworkCore;
using Moipone.PublicSite.Authorization.Roles;
using Moipone.PublicSite.Authorization.Users;
using Moipone.PublicSite.MultiTenancy;
using Microsoft.EntityFrameworkCore;

namespace Moipone.PublicSite.EntityFrameworkCore;

public class PublicSiteDbContext : AbpZeroDbContext<Tenant, Role, User, PublicSiteDbContext>
{
    /* Define a DbSet for each entity of the application */

    public PublicSiteDbContext(DbContextOptions<PublicSiteDbContext> options)
        : base(options)
    {
    }
}
