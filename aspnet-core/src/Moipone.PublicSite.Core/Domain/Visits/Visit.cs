using Abp.Domain.Entities.Auditing;
using Moipone.PublicSite.Domain.Visitors;
using System;

namespace Moipone.PublicSite.Domain.Visits
{
    public class Visit : FullAuditedEntity<Guid>
    {
        public DateTime CheckInDate { get; set; }
        public DateTime CheckOutDate { get; set; }
        public RefListVisitReason VisitReason { get; set; }
        public string OtherReason { get; set; } 

        #region Navigation Properties
        public Guid VisitorId { get; set; }
        public virtual Visitor Visitor { get; set; }
        #endregion
    }
}