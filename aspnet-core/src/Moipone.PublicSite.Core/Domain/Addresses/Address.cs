using Abp.Domain.Entities.Auditing;
using System;
using System.ComponentModel.DataAnnotations;

namespace Moipone.PublicSite.Domain.Addresses
{
    public class Address : FullAuditedEntity<Guid>
    {
        [Required]
        [MaxLength(100)]
        public string Street { get; set; }
        
        [Required]
        [MaxLength(100)]
        public string Suburb { get; set; }
        
        [Required]
        [MaxLength(100)]
        public string City { get; set; }
        
        [Required]
        [MaxLength(5)]
        public string PostalCode { get; set; }
    }
}
