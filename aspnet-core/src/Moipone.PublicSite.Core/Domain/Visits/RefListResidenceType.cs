using System.ComponentModel;

namespace Moipone.PublicSite.Domain.Visits
{
    public enum RefListResidenceType
    {
        [Description("Hostel")]
        Hostel = 1,
        
        [Description("Informal Settlement")]
        InformalSettlement = 2,
        
        [Description("Township")]   
        Township = 3
    }
}