using Abp.Authorization;
using Abp.Runtime.Session;
using Moipone.PublicSite.Configuration.Dto;
using System.Threading.Tasks;

namespace Moipone.PublicSite.Configuration;

[AbpAuthorize]
public class ConfigurationAppService : PublicSiteAppServiceBase, IConfigurationAppService
{
    public async Task ChangeUiTheme(ChangeUiThemeInput input)
    {
        await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
    }
}
