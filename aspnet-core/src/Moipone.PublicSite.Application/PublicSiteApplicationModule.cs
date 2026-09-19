using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Abp.Threading.BackgroundWorkers;
using Moipone.PublicSite.AttendanceRegisters.BackgroundWorkers;
using Moipone.PublicSite.Authorization;

namespace Moipone.PublicSite;

[DependsOn(
    typeof(PublicSiteCoreModule),
    typeof(AbpAutoMapperModule))]
public class PublicSiteApplicationModule : AbpModule
{
    public override void PreInitialize()
    {
        Configuration.Authorization.Providers.Add<PublicSiteAuthorizationProvider>();
        IocManager.Register<AttendanceRegisterCreatorWorker>();
    }

    public override void Initialize()
    {
        var thisAssembly = typeof(PublicSiteApplicationModule).GetAssembly();

        IocManager.RegisterAssemblyByConvention(thisAssembly);

        Configuration.Modules.AbpAutoMapper().Configurators.Add(
            // Scan the assembly for classes which inherit from AutoMapper.Profile
            cfg => cfg.AddMaps(thisAssembly)
        );
    }

    public override void PostInitialize()
    {
        var workManager = IocManager.Resolve<IBackgroundWorkerManager>();
        workManager.Add(IocManager.Resolve<AttendanceRegisterCreatorWorker>());
    }
}
