using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace Moipone.PublicSite.Controllers
{
    public abstract class PublicSiteControllerBase : AbpController
    {
        protected PublicSiteControllerBase()
        {
            LocalizationSourceName = PublicSiteConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
