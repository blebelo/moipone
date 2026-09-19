using Abp.Application.Services;
using Moipone.PublicSite.AttendanceRegisters.Dto;
using System.Threading.Tasks;

namespace Moipone.PublicSite.AttendanceRegisters
{
    public interface IAttendanceRegisterAppService: IAsyncCrudAppService<AttendanceRegisterDto, int>
    {
        Task<AttendanceRegisterDto> GetTodayAsync();
        Task<AttendanceRegisterDto> CloseAsync(int id);
        Task<AttendanceRegisterDto> ReopenAsync(int id);
    }
}