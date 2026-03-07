using System.ComponentModel.DataAnnotations;

namespace Moipone.PublicSite.Domain.Contacts
{
    public enum RefListContactSubject
    {
        [Display(Name = "Programme Enquiry")]
        ProgrammeEnquiry = 1,

        [Display(Name = "Partnership Enquiry")]
        PartnershipEnquiry = 2,

        [Display(Name = "Volunteer")]
        Volunteer = 3,

        [Display(Name = "Donation")]
        Donation = 4,

        [Display(Name = "Other")]
        Other = 5,
    }
}
