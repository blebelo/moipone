using Abp.Configuration.Startup;
using Abp.Localization.Dictionaries;
using Abp.Localization.Dictionaries.Xml;
using Abp.Reflection.Extensions;

namespace Moipone.PublicSite.Localization;

public static class PublicSiteLocalizationConfigurer
{
    public static void Configure(ILocalizationConfiguration localizationConfiguration)
    {
        localizationConfiguration.Sources.Add(
            new DictionaryBasedLocalizationSource(PublicSiteConsts.LocalizationSourceName,
                new XmlEmbeddedFileLocalizationDictionaryProvider(
                    typeof(PublicSiteLocalizationConfigurer).GetAssembly(),
                    "Moipone.PublicSite.Localization.SourceFiles"
                )
            )
        );
    }
}
