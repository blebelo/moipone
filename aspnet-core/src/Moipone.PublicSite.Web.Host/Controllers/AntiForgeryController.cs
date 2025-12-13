using Abp.Web.Security.AntiForgery;
using Moipone.PublicSite.Controllers;
using Microsoft.AspNetCore.Antiforgery;

namespace Moipone.PublicSite.Web.Host.Controllers
{
    public class AntiForgeryController : PublicSiteControllerBase
    {
        private readonly IAntiforgery _antiforgery;
        private readonly IAbpAntiForgeryManager _antiForgeryManager;

        public AntiForgeryController(IAntiforgery antiforgery, IAbpAntiForgeryManager antiForgeryManager)
        {
            _antiforgery = antiforgery;
            _antiForgeryManager = antiForgeryManager;
        }

        public void GetToken()
        {
            _antiforgery.SetCookieTokenAndHeader(HttpContext);
        }

        public void SetCookie()
        {
            _antiForgeryManager.SetCookie(HttpContext);
        }
    }
}
