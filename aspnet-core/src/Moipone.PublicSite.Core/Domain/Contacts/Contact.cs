using Abp.Domain.Entities.Auditing;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Moipone.PublicSite.Domain.Contacts
{
    [Table("Contacts")]
    public class Contact : FullAuditedEntity<Guid>
    {
        [Required]
        [StringLength(100, MinimumLength = 2)]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(100)]
        public string Email { get; set; }

        [Phone]
        [StringLength(20)]
        public string Phone { get; set; }

        public RefListContactSubject Subject { get; set; }

        [Required]
        [StringLength(2000, MinimumLength = 10)]
        public string Message { get; set; }
    }
}
