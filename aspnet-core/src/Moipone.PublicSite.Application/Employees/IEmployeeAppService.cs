using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Moipone.PublicSite.Employees.Dto;
using System;
using System.Configuration;
using System.Threading.Tasks;

namespace Moipone.PublicSite.Employees
{
    public interface IEmployeeAppService
        : IAsyncCrudAppService<EmployeeDto, Guid, PagedAndSortedResultRequestDto, CreateEmployeeDto, EmployeeDto>
    {
        //public override Task<EmployeeDto> CreateAsync(CreateEmployeeDto input);
    }
}
