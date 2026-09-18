using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;

namespace Moipone.PublicSite.Domain.Visits
{
    public class AttendanceRegister : FullAuditedEntity<int>
    {
        public DateOnly Date { get; set; }
        public int Week { get; set; }

        #region Navigation Properties
        public ICollection<Visit> Visits { get; set; } = new List<Visit>(); 
        #endregion
    }
}
