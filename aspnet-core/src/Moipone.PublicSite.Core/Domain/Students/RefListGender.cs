using System.ComponentModel.DataAnnotations;

namespace Moipone.PublicSite.Domain.Students
{
    public enum RefListGender
    {
        [Display(Name = "Male")]
        Male = 1,

        [Display(Name = "Female")]
        Female = 2,

        [Display(Name = "Other")]
        Other = 3,

        [Display(Name = "Prefer Not To Say")]
        PreferNotToSay = 4
    }
}
