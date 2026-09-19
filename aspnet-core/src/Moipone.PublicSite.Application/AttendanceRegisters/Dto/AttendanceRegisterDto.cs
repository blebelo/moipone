using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Moipone.PublicSite.Domain.Visits;
using Moipone.PublicSite.Visits.Dto;
using System;
using System.Collections.Generic;

namespace Moipone.PublicSite.AttendanceRegisters.Dto
{
    [AutoMap(typeof(AttendanceRegister))]
    public class AttendanceRegisterDto : EntityDto<int>
    {
        public DateOnly Date { get; set; }
        public bool IsClosed { get; set; }

        #region Navigation Properties
        public List<VisitDto> Visits { get; set; }
        #endregion
    }
}
