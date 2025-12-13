using Abp.Modules;
using Abp.Reflection.Extensions;
using Moipone.PublicSite.Configuration;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace Moipone.PublicSite.Web.Host.Startup
{
    [DependsOn(
       typeof(PublicSiteWebCoreModule))]
    public class PublicSiteWebHostModule : AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public PublicSiteWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(PublicSiteWebHostModule).GetAssembly());
        }
    }
}
