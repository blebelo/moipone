using Abp.Domain.Entities.Auditing;
using Microsoft.EntityFrameworkCore;
using Moipone.PublicSite.Domain.Addresses;
using Moipone.PublicSite.Domain.Visits;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Moipone.PublicSite.Domain.Visitors
{
    [Index(nameof(EmailAddress), IsUnique = true)]
    [Index(nameof(ContactNumber), IsUnique = true)]
    public class Visitor : FullAuditedEntity<Guid>
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Surname { get; set; }
        [EmailAddress]
        [Required]
        public string EmailAddress { get; set; }
        [Required]
        public string ContactNumber { get; set; }
        [Range(1, int.MaxValue)]
        public int WardNumber { get; set; }
        public bool IsDisabled { get; set; }
        public bool IsCsg { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public RefListSexType Sex { get; set; }
        public Address VisitorAddress { get; set; }
        public RefListSexualityType Sexuality { get; set; }
        public RefListResidenceType Residence { get; set; }

        #region Navigation Properties
        public virtual ICollection<Visit> Visits { get; set; } = new List<Visit>();
        #endregion
    }
}