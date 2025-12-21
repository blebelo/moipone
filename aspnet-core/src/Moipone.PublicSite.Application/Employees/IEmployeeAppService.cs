using Abp.Application.Services;
using Moipone.PublicSite.Employees.Dto;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Moipone.PublicSite.Employees
{
    public interface IEmployeeAppService : IAsyncCrudAppService<EmployeeDto, Guid>
    {
        Task<EmployeeDto> GetEmployeeByEmailAsync(string employeeEmail);

        Task<EmployeeDto> GetEmployeeByEmployeeNumberAsync(string employeeNumber);

        Task<List<EmployeeDto>> GetEmployeesByDepartmentAsync(int departmentId);

        Task<List<EmployeeDto>> GetEmployeesByStatusAsync(int employmentStatusId);

        Task<List<EmployeeDto>> GetActiveEmployeesAsync();

        Task<bool> IsEmployeeEmailAvailableAsync(string employeeEmail);

        Task<EmployeeDto> CompleteProbationAsync(Guid employeeId);

        Task<EmployeeDto> PromoteEmployeeAsync(Guid employeeId, string newPosition, decimal newSalary);

        Task<EmployeeDto> TransferEmployeeAsync(Guid employeeId, int newDepartmentId);

        Task<EmployeeDto> TerminateEmployeeAsync(Guid employeeId, DateOnly endDate);
    }
}