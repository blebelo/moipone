using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Moipone.PublicSite.Domain.Visits;
using System;

namespace Moipone.PublicSite.AttendanceRegisters.Dto
{
    [AutoMap(typeof(Visit))]
    public class AttendanceRegisterVisitDto : FullAuditedEntityDto<Guid>
    {
        public DateTime? CheckinDate => CreationTime;
        public DateTime? CheckOutDate { get; set; }
        public RefListVisitReason VisitReason { get; set; }
        public string? OtherReason { get; set; }
        public Guid VisitorId { get; set; }
        public int AttendanceRegisterId { get; set; }
        public AttendanceRegisterVisitorDto Visitor { get; set; }
    }
}