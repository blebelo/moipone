using Abp.Domain.Entities.Auditing;
using System;

namespace Moipone.PublicSite.Domain.Addresses
{
    public class Address : FullAuditedEntity<Guid>
    {
        public string Street { get; set; }
        public string Suburb { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
    }
}
