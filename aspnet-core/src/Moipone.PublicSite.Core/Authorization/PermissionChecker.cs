using Abp.Authorization;
using Moipone.PublicSite.Authorization.Roles;
using Moipone.PublicSite.Authorization.Users;

namespace Moipone.PublicSite.Authorization;

public class PermissionChecker : PermissionChecker<Role, User>
{
    public PermissionChecker(UserManager userManager)
        : base(userManager)
    {
    }
}
