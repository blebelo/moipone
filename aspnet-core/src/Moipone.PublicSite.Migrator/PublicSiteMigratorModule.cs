using Abp.Events.Bus;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Moipone.PublicSite.Configuration;
using Moipone.PublicSite.EntityFrameworkCore;
using Moipone.PublicSite.Migrator.DependencyInjection;
using Castle.MicroKernel.Registration;
using Microsoft.Extensions.Configuration;

namespace Moipone.PublicSite.Migrator;

[DependsOn(typeof(PublicSiteEntityFrameworkModule))]
public class PublicSiteMigratorModule : AbpModule
{
    private readonly IConfigurationRoot _appConfiguration;

    public PublicSiteMigratorModule(PublicSiteEntityFrameworkModule abpProjectNameEntityFrameworkModule)
    {
        abpProjectNameEntityFrameworkModule.SkipDbSeed = true;

        _appConfiguration = AppConfigurations.Get(
            typeof(PublicSiteMigratorModule).GetAssembly().GetDirectoryPathOrNull()
        );
    }

    public override void PreInitialize()
    {
        Configuration.DefaultNameOrConnectionString = _appConfiguration.GetConnectionString(
            PublicSiteConsts.ConnectionStringName
        );

        Configuration.BackgroundJobs.IsJobExecutionEnabled = false;
        Configuration.ReplaceService(
            typeof(IEventBus),
            () => IocManager.IocContainer.Register(
                Component.For<IEventBus>().Instance(NullEventBus.Instance)
            )
        );
    }

    public override void Initialize()
    {
        IocManager.RegisterAssemblyByConvention(typeof(PublicSiteMigratorModule).GetAssembly());
        ServiceCollectionRegistrar.Register(IocManager);
    }
}
