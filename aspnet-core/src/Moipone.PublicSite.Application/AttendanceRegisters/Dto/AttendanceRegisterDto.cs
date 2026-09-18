using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Moipone.PublicSite.Domain.Visits;

namespace Moipone.PublicSite.AttendanceRegisters.Dto
{
    [AutoMap(typeof(AttendanceRegister))]
    public class AttendanceRegisterDto : EntityDto<int>
    {
    }
}
