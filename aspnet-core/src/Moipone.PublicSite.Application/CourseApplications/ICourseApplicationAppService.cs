using Abp.Application.Services;
using Moipone.PublicSite.CourseApplications.Dto;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Moipone.PublicSite.CourseApplications
{
    public interface ICourseApplicationAppService : IAsyncCrudAppService<CourseApplicationDto, Guid>
    {
        Task<CourseApplicationDto> ApproveApplicationAsync(Guid id);
        Task<CourseApplicationDto> DeclineApplicationAsync(Guid id, string decisionReason);
        Task<List<CourseApplicationDto>> GetApprovedApplicationsAsync();
        Task<List<CourseApplicationDto>> GetDeclinedApplicationsAsync();
    }
}
