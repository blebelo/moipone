using Abp.AspNetCore;
using Abp.AspNetCore.Configuration;
using Abp.AspNetCore.SignalR;
using Abp.Configuration;
using Abp.MailKit;
using Abp.Modules;
using Abp.Net.Mail;
using Abp.Reflection.Extensions;
using Abp.Zero.Configuration;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Moipone.PublicSite.Authentication.JwtBearer;
using Moipone.PublicSite.EntityFrameworkCore;
using System;
using System.Text;

namespace Moipone.PublicSite
{
    [DependsOn(
         typeof(PublicSiteApplicationModule),
         typeof(PublicSiteEntityFrameworkModule),
         typeof(AbpAspNetCoreModule),
        typeof(AbpAspNetCoreSignalRModule),
        typeof(AbpMailKitModule)
     )]
    public class PublicSiteWebCoreModule : AbpModule
    {
        private readonly IConfigurationRoot _appConfiguration;        

        public PublicSiteWebCoreModule(IConfigurationRoot appConfiguration)
        {
            _appConfiguration = appConfiguration;
        }

        public override void PreInitialize()
        {
            Configuration.DefaultNameOrConnectionString = _appConfiguration.GetConnectionString(
                PublicSiteConsts.ConnectionStringName
            );

            // Use database for language management
            Configuration.Modules.Zero().LanguageManagement.EnableDbLocalization();

            Configuration.Modules.AbpAspNetCore()
                 .CreateControllersForAppServices(
                     typeof(PublicSiteApplicationModule).GetAssembly()
                 );

            ConfigureTokenAuth();
        }

        private void ConfigureTokenAuth()
        {
            IocManager.Register<TokenAuthConfiguration>();
            var tokenAuthConfig = IocManager.Resolve<TokenAuthConfiguration>();

            tokenAuthConfig.SecurityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_appConfiguration["Authentication:JwtBearer:SecurityKey"]));
            tokenAuthConfig.Issuer = _appConfiguration["Authentication:JwtBearer:Issuer"];
            tokenAuthConfig.Audience = _appConfiguration["Authentication:JwtBearer:Audience"];
            tokenAuthConfig.SigningCredentials = new SigningCredentials(tokenAuthConfig.SecurityKey, SecurityAlgorithms.HmacSha256);
            tokenAuthConfig.Expiration = TimeSpan.FromDays(2);
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(PublicSiteWebCoreModule).GetAssembly());
        }

        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(PublicSiteWebCoreModule).Assembly);

            // Setting Manager - No DI
            var settingManager = IocManager.Resolve<ISettingManager>();

            // Emailing
            settingManager.ChangeSettingForApplication(EmailSettingNames.Smtp.UseDefaultCredentials, "false");
            settingManager.ChangeSettingForApplication(EmailSettingNames.Smtp.Host, _appConfiguration["Abp.Net.Mail.Smtp.Host"]);
            settingManager.ChangeSettingForApplication(EmailSettingNames.Smtp.Port, _appConfiguration["Abp.Net.Mail.Smtp.Port"]);
            settingManager.ChangeSettingForApplication(EmailSettingNames.Smtp.UserName, _appConfiguration["Abp.Net.Mail.Smtp.UserName"]);
            settingManager.ChangeSettingForApplication(EmailSettingNames.Smtp.Password, _appConfiguration["Abp.Net.Mail.Smtp.Password"]);
            settingManager.ChangeSettingForApplication(EmailSettingNames.Smtp.EnableSsl, _appConfiguration["Abp.Net.Mail.Smtp.EnableSsl"]);
            settingManager.ChangeSettingForApplication(EmailSettingNames.DefaultFromAddress, _appConfiguration["Abp.Net.Mail.DefaultFromAddress"]);
            settingManager.ChangeSettingForApplication(EmailSettingNames.DefaultFromDisplayName, _appConfiguration["Abp.Net.Mail.DefaultFromDisplayName"]);
        }
    }
}
