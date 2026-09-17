using Abp.Domain.Entities.Auditing;
using Moipone.PublicSite.Domain.Visitors;
using System;

namespace Moipone.PublicSite.Domain.Visits
{
    public class Visit : FullAuditedEntity<Guid>
    {
        public DateTime Date { get; set; }
        public int WardNumber { get; set; }
        public RefListVisitReason VisitReason { get; set; }

        #region Navigation Properties
        public Guid VisitorId { get; set; }
        public Visitor Visitor { get; set; }
        #endregion
    }
}