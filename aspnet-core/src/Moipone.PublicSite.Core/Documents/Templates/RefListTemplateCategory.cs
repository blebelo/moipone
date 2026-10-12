using System.ComponentModel.DataAnnotations;

namespace Moipone.PublicSite.Documents.Templates
{
    public enum RefListTemplateCategory
    {
        [Display(Name = "General")]
        General = 1,

        [Display(Name = "Reports")]
        Reports = 2,

        [Display(Name = "Compliance")]
        Compliance = 3,

        [Display(Name = "Applications")]
        Applications = 4,

        [Display(Name = "Human Resources")]
        HumanResources = 5,

        [Display(Name = "Finance")]
        Finance = 6,

        [Display(Name = "Education & Learning")]
        EducationAndLearning = 7,

        [Display(Name = "Certificates")]
        Certificates = 8
    }
}