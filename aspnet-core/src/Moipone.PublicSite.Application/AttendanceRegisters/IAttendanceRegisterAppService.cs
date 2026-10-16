using Abp.Application.Services;
using Microsoft.AspNetCore.Mvc;
using Moipone.PublicSite.AttendanceRegisters.Dto;
using System;
using System.Threading.Tasks;

namespace Moipone.PublicSite.AttendanceRegisters
{
    public interface IAttendanceRegisterAppService: IAsyncCrudAppService<AttendanceRegisterDto, int>
    {
        Task<AttendanceRegisterDto> GetTodayAsync();
        Task<AttendanceRegisterDto> CloseAsync(int id);
        Task<AttendanceRegisterDto> ReopenAsync(int id);
        Task<IActionResult> GenerateWeeklyReportAsync(DateOnly weekStart, DateOnly weekEnd);
    }
}