using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Moipone.PublicSite.Domain.Visits;
using Moipone.PublicSite.Visitors.Dto;
using System;

namespace Moipone.PublicSite.Visits.Dto
{
    [AutoMap(typeof(Visit))]
    public class VisitDto : EntityDto<Guid>
    {
        public DateTime CheckInDate { get; set; }
        public DateTime CheckOutDate { get; set; }
        public RefListVisitReason VisitReason { get; set; }
        public string OtherReason { get; set; }

        #region Navigation Properties
        public Guid VisitorId { get; set; }
        public virtual VisitorDto Visitor { get; set; }
        #endregion
    }
}
