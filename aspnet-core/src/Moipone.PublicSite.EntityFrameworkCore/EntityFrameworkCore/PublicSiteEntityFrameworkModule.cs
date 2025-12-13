using Abp.EntityFrameworkCore.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Abp.Timing;
using Abp.Zero.EntityFrameworkCore;
using Moipone.PublicSite.EntityFrameworkCore.Seed;

namespace Moipone.PublicSite.EntityFrameworkCore
{
    [DependsOn(
        typeof(PublicSiteCoreModule),
        typeof(AbpZeroCoreEntityFrameworkCoreModule))]
    public class PublicSiteEntityFrameworkModule : AbpModule
    {
        /* Used it tests to skip dbcontext registration, in order to use in-memory database of EF Core */
        public bool SkipDbContextRegistration { get; set; }

        public bool SkipDbSeed { get; set; }

        public override void PreInitialize()
        {
            Clock.Provider = ClockProviders.Utc;
            if (!SkipDbContextRegistration)
            {
                Configuration.Modules.AbpEfCore().AddDbContext<PublicSiteDbContext>(options =>
                {
                    if (options.ExistingConnection != null)
                    {
                        PublicSiteDbContextConfigurer.Configure(options.DbContextOptions, options.ExistingConnection);
                    }
                    else
                    {
                        PublicSiteDbContextConfigurer.Configure(options.DbContextOptions, options.ConnectionString);
                    }
                });
            }
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(PublicSiteEntityFrameworkModule).GetAssembly());
        }

        public override void PostInitialize()
        {
            if (!SkipDbSeed)
            {
                SeedHelper.SeedHostDb(IocManager);
            }
        }
    }
}