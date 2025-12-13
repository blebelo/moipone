using Moipone.PublicSite.Models.TokenAuth;
using Moipone.PublicSite.Web.Controllers;
using Shouldly;
using System.Threading.Tasks;
using Xunit;

namespace Moipone.PublicSite.Web.Tests.Controllers;

public class HomeController_Tests : PublicSiteWebTestBase
{
    [Fact]
    public async Task Index_Test()
    {
        await AuthenticateAsync(null, new AuthenticateModel
        {
            UserNameOrEmailAddress = "admin",
            Password = "123qwe"
        });

        //Act
        var response = await GetResponseAsStringAsync(
            GetUrl<HomeController>(nameof(HomeController.Index))
        );

        //Assert
        response.ShouldNotBeNullOrEmpty();
    }
}