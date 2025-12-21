using System.ComponentModel.DataAnnotations;

namespace Moipone.PublicSite.Domain.Employees
{
    public enum RefListDepartment
    {
        [Display(Name = "Administration")]
        Administration = 1,

        [Display(Name = "Education & Outreach")]
        EducationAndOutreach = 2,

        [Display(Name = "Exhibits & Operations")]
        ExhibitsAndOperations = 3,

        [Display(Name = "Visitor Services")]
        VisitorServices = 4,

        [Display(Name = "Marketing & Communications")]
        MarketingAndCommunications = 5,

        [Display(Name = "Facilities & Maintenance")]
        FacilitiesAndMaintenance = 6
    }
}