using System.ComponentModel.DataAnnotations;

namespace Moipone.PublicSite.Domain.Employees
{
    public enum RefListEmploymentStatus
    {
        [Display(Name = "Active")]
        Active = 1,

        [Display(Name = "On Leave")]
        OnLeave = 2,

        [Display(Name = "Suspended")]
        Suspended = 3,

        [Display(Name = "Resigned")]
        Resigned = 4,

        [Display(Name = "Terminated")]
        Terminated = 5,

        [Display(Name = "Retired")]
        Retired = 6,

        [Display(Name = "Probation")]
        Probation = 7
    }
}