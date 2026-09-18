using Abp.Domain.Entities.Auditing;
using Moipone.PublicSite.Domain.Addresses;
using Moipone.PublicSite.Domain.Visits;
using System;
using System.Collections.Generic;

namespace Moipone.PublicSite.Domain.Visitors
{
    public class Visitor : FullAuditedEntity<Guid>
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public Address VisitorAddress { get; set; }
        public string ContactNumber { get; set; }
        public string EmailAddress { get; set; }
        public int WardNumber { get; set; }
        public RefListSexualityType Sexuality { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public RefListResidenceType Residence { get; set; }
        public RefListSexType Sex { get; set; }
        public bool IsDisabled { get; set; }
        public bool IsCsg { get; set; }

        #region Navigation Properties
        public virtual ICollection<Visit> Vists { get; set; } = new List<Visit>();
        #endregion
    }
}