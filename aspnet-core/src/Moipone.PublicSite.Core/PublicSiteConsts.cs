using Moipone.PublicSite.Debugging;

namespace Moipone.PublicSite;

public class PublicSiteConsts
{
    public const string LocalizationSourceName = "PublicSite";

    public const string ConnectionStringName = "Default";

    public const bool MultiTenancyEnabled = true;


    /// <summary>
    /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
    /// </summary>
    public static readonly string DefaultPassPhrase =
        DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "be2ed44248f049e8811d5523dc2d0810";
}
