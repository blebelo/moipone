using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Moipone.PublicSite.Domain.Visits;
using Moipone.PublicSite.Visitors.Dto;
using System;

namespace Moipone.PublicSite.Visits.Dto
{
    [AutoMap(typeof(Visit))]
    public class VisitWithVisitoDto : FullAuditedEntityDto<Guid>
    {
        public DateTime? CheckinDate => CreationTime;
        public DateTime? CheckOutDate { get; set; }
        public RefListVisitReason VisitReason { get; set; }
        public string OtherReason { get; set; }

        #region Navigation Properties
        public LightWeightVisitorDto Visitor { get; set; }
        public int AttendanceRegisterId { get; set; }
        #endregion
    }
}
