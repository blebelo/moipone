using Moipone.PublicSite.Configuration.Dto;
using System.Threading.Tasks;

namespace Moipone.PublicSite.Configuration;

public interface IConfigurationAppService
{
    Task ChangeUiTheme(ChangeUiThemeInput input);
}
