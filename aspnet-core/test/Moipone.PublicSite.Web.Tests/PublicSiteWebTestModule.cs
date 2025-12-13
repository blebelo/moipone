using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Moipone.PublicSite.EntityFrameworkCore;
using Moipone.PublicSite.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace Moipone.PublicSite.Web.Tests;

[DependsOn(
    typeof(PublicSiteWebMvcModule),
    typeof(AbpAspNetCoreTestBaseModule)
)]
public class PublicSiteWebTestModule : AbpModule
{
    public PublicSiteWebTestModule(PublicSiteEntityFrameworkModule abpProjectNameEntityFrameworkModule)
    {
        abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
    }

    public override void PreInitialize()
    {
        Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
    }

    public override void Initialize()
    {
        IocManager.RegisterAssemblyByConvention(typeof(PublicSiteWebTestModule).GetAssembly());
    }

    public override void PostInitialize()
    {
        IocManager.Resolve<ApplicationPartManager>()
            .AddApplicationPartsIfNotAddedBefore(typeof(PublicSiteWebMvcModule).Assembly);
    }
}