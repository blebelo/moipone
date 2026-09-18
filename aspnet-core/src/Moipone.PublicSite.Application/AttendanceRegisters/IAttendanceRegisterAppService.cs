using Abp.Application.Services;
using Moipone.PublicSite.AttendanceRegisters.Dto;
using System;

namespace Moipone.PublicSite.AttendanceRegisters
{
    public interface IAttendanceRegisterAppService
        : IAsyncCrudAppService<AttendanceRegisterDto, int>
    {
    }
}
