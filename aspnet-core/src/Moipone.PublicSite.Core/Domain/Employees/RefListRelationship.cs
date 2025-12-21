using System.ComponentModel.DataAnnotations;

namespace Moipone.PublicSite.Domain.Employees
{
    public enum RefListRelationship
    {
        [Display(Name = "Spouse")]
        Spouse = 1,

        [Display(Name = "Parent")]
        Parent = 2,

        [Display(Name = "Child")]
        Child = 3,

        [Display(Name = "Sibling")]
        Sibling = 4,

        [Display(Name = "Partner")]
        Partner = 5,

        [Display(Name = "Friend")]
        Friend = 6,

        [Display(Name = "Other Relative")]
        OtherRelative = 7,

        [Display(Name = "Other")]
        Other = 8
    }
}