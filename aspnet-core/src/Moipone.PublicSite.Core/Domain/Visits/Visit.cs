using Abp.Domain.Entities.Auditing;
using Moipone.PublicSite.Domain.Visitors;
using System;
using System.ComponentModel.DataAnnotations;

namespace Moipone.PublicSite.Domain.Visits
{
    public class Visit : FullAuditedEntity<Guid>
    {
        public DateTime? CheckOutDate { get; set; }
        [Required]
        public RefListVisitReason VisitReason { get; set; }
        public string OtherReason { get; set; }

        #region Navigation Properties
        [Required]
        public Guid VisitorId { get; set; }
        public virtual Visitor Visitor { get; set; }
        
        [Required]
        public int AttendanceRegisterId { get; set; }
        public virtual AttendanceRegister AttendanceRegister { get; set; }
        #endregion
    }
}