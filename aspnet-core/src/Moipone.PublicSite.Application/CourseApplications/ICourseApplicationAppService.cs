using Abp.Application.Services;
using Moipone.PublicSite.CourseApplications.Dto;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Moipone.PublicSite.CourseApplications
{
    public interface ICourseApplicationAppService
        : IAsyncCrudAppService<CourseApplicationDto, Guid>
    {
        Task<List<CourseApplicationDto>> GetApplicationsByCourseIdAsync(Guid courseId);
        Task<CourseApplicationDto> ApproveApplication(Guid input, string? reason);
        Task<CourseApplicationDto> RejectApplication(Guid input, string? reason);

    }
}
