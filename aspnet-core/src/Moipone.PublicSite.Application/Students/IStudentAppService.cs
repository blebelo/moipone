using Abp.Application.Services;
using Moipone.PublicSite.Students.Dto;
using System;
using System.Threading.Tasks;

namespace Moipone.PublicSite.Students
{
    public interface IStudentAppService : IAsyncCrudAppService<StudentDto, Guid>
    {
        Task<StudentDto> GetStudentByEmailAsync(string emailAddress);
    }
}
