using System.ComponentModel;

namespace Moipone.PublicSite.Domain.Visits
{
    public enum RefListSexualityType
    {
        [Description("Lesbian")]
        Lesbian = 1,

        [Description("Gay")]
        Gay = 2,

        [Description("Bisexual")]
        Bisexual = 3,

        [Description("Transgender")]
        Transgender = 4,

        [Description("Queer")]
        Queer = 5,

        [Description("Intersex")]
        Intersex = 6,

        [Description("Asexual")]
        Asexual = 7,

        [Description("Pansexual")]
        Pansexual = 8,

        [Description("Non-Binary")]
        NonBinary = 9,

        [Description("Questioning")]
        Questioning = 10,

        [Description("Other")]
        Other = 11,

        [Description("Prefer Not to Say")]
        PreferNotToSay = 12,

        [Description("Straight")]
        Straight = 13
    }
}