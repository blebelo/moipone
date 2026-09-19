using Abp.Domain.Entities.Auditing;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

namespace Moipone.PublicSite.Domain.Visits
{
    [Index(nameof(Date), IsUnique = true)]
    public class AttendanceRegister : FullAuditedEntity<int>
    {
        public DateOnly Date { get; set; }
        public bool IsClosed { get; set; }

        #region Navigation Properties
        public virtual ICollection<Visit> Visits { get; set; } = new List<Visit>(); 
        #endregion
    }
}
