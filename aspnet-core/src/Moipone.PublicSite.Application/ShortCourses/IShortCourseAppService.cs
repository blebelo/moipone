using Abp.Application.Services;
using Moipone.PublicSite.ShortCourses.Dto;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Moipone.PublicSite.ShortCourses
{
    public interface IShortCourseAppService : IAsyncCrudAppService<ShortCourseDto, Guid>
    {
        Task<ShortCourseDto> GetByCodeAsync(string code);
        Task<ShortCourseDto> OpenApplicationsAsync(Guid id);
        Task<ShortCourseDto> CloseApplicationsAsync(Guid id);
        Task<ShortCourseDto> ReopenApplicationsAsync(Guid id);
        Task<List<ShortCourseDto>> GetOpenCoursesAsync();
        Task<int> GetCurrentCapacityAsync(Guid id);
    }
}