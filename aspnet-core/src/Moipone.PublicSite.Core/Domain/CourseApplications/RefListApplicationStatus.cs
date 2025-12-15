using System.ComponentModel.DataAnnotations;

namespace Moipone.PublicSite.Domain.CourseApplications
{
    public enum RefListApplicationStatus
    {
        [Display(Name = "Pending", Description = "Application submitted but not yet reviewed")]
        Pending = 1,

        [Display(Name = "Approved", Description = "Application approved by the admin")]
        Approved = 2,

        [Display(Name = "Declined", Description = "Application declined by the admin")]
        Declined = 3
    }
}
