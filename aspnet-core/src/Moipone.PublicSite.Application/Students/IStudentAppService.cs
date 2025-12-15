using Abp.Application.Services;
using Microsoft.AspNetCore.Mvc;
using Moipone.PublicSite.Students.Dto;
using System;
using System.Threading.Tasks;

namespace Moipone.PublicSite.Students
{
    public interface IStudentAppService : IAsyncCrudAppService<StudentDto, Guid>
    {
        Task<ActionResult> GetStudentByEmailAsync(Guid? studentId, string? emailAddress);
    }
}
