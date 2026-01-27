using Abp.Application.Services;
using Moipone.PublicSite.Employees.Dto;
using System;

namespace Moipone.PublicSite.Employees
{
    public interface IEmployeeAppService
        : IAsyncCrudAppService<EmployeeDto, Guid>
    {
    }
}
