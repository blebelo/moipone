using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using Moipone.PublicSite.Domain.Employees;
using Moipone.PublicSite.Employees.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Moipone.PublicSite.Employees
{
    public class EmployeeAppService
        : AsyncCrudAppService<Employee, EmployeeDto, Guid, PagedAndSortedResultRequestDto, EmployeeDto, EmployeeDto>,
          IEmployeeAppService
    {
        private readonly IRepository<Employee, Guid> _employeeRepository;

        public EmployeeAppService(IRepository<Employee, Guid> employeeRepository)
            : base(employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        public async override Task<EmployeeDto> CreateAsync(EmployeeDto input)
        {
            try
            {
                if (input == null)
                {
                    throw new UserFriendlyException(
                        "Employee data cannot be null.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var employee = ObjectMapper.Map<Employee>(input);
                var result = await _employeeRepository.InsertAsync(employee);
                return ObjectMapper.Map<EmployeeDto>(result);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error("Error creating employee", ex);
                throw new UserFriendlyException(
                    $"Could not create Employee. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        public async override Task<PagedResultDto<EmployeeDto>> GetAllAsync(
            PagedAndSortedResultRequestDto input)
        {
            try
            {
                var query = Repository.GetAll();
                var totalCount = await AsyncQueryableExecuter.CountAsync(query);

                var employees = await AsyncQueryableExecuter.ToListAsync(
                    query.OrderBy(e => e.Id)
                         .Skip(input.SkipCount)
                         .Take(input.MaxResultCount)
                );

                var result = ObjectMapper.Map<List<EmployeeDto>>(employees);
                return new PagedResultDto<EmployeeDto>(totalCount, result);
            }
            catch (Exception ex)
            {
                Logger.Error("Error retrieving employees", ex);
                throw new UserFriendlyException(
                    $"Could not retrieve Employees. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        public async override Task<EmployeeDto> GetAsync(EntityDto<Guid> input)
        {
            try
            {
                if (input == null || input.Id == Guid.Empty)
                {
                    throw new UserFriendlyException(
                        "Invalid employee ID.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var employee = await _employeeRepository.GetAsync(input.Id);

                if (employee == null)
                {
                    throw new UserFriendlyException(
                        $"Employee with ID {input.Id} not found.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                return ObjectMapper.Map<EmployeeDto>(employee);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error retrieving employee with ID {input?.Id}", ex);
                throw new UserFriendlyException(
                    $"Could not retrieve Employee. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        public async override Task<EmployeeDto> UpdateAsync(EmployeeDto input)
        {
            try
            {
                if (input == null)
                {
                    throw new UserFriendlyException(
                        "Employee data cannot be null.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                if (input.Id == Guid.Empty)
                {
                    throw new UserFriendlyException(
                        "Invalid employee ID.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var employee = await _employeeRepository.GetAsync(input.Id);

                ObjectMapper.Map(input, employee);
                var updatedEmployee = await _employeeRepository.UpdateAsync(employee);

                return ObjectMapper.Map<EmployeeDto>(updatedEmployee);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error updating employee with ID {input?.Id}", ex);
                throw new UserFriendlyException(
                    $"Could not update Employee. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        public async override Task DeleteAsync(EntityDto<Guid> input)
        {
            try
            {
                if (input == null || input.Id == Guid.Empty)
                {
                    throw new UserFriendlyException(
                        "Invalid employee ID.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var employee = await _employeeRepository.GetAsync(input.Id);

                if (employee == null)
                {
                    throw new UserFriendlyException(
                        $"Employee with ID {input.Id} not found.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                await _employeeRepository.DeleteAsync(input.Id);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error deleting employee with ID {input?.Id}", ex);
                throw new UserFriendlyException(
                    $"Could not delete Employee. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        public async Task<EmployeeDto> GetEmployeeByEmailAsync(string employeeEmail)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(employeeEmail))
                {
                    throw new UserFriendlyException(
                        "Employee email cannot be null or empty.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var employee = await AsyncQueryableExecuter.FirstOrDefaultAsync(
                    _employeeRepository
                        .GetAll()
                        .Where(e => e.EmployeeEmail == employeeEmail)
                );

                if (employee == null)
                {
                    throw new UserFriendlyException(
                        $"Employee with email {employeeEmail} not found.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                return ObjectMapper.Map<EmployeeDto>(employee);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error("Error retrieving employee by email", ex);
                throw new UserFriendlyException(
                    $"Could not retrieve Employee. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        public async Task<EmployeeDto> GetEmployeeByEmployeeNumberAsync(string employeeNumber)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(employeeNumber))
                {
                    throw new UserFriendlyException(
                        "Employee number cannot be null or empty.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var employee = await AsyncQueryableExecuter.FirstOrDefaultAsync(
                    _employeeRepository
                        .GetAll()
                        .Where(e => e.EmployeeNumber == employeeNumber)
                );

                if (employee == null)
                {
                    throw new UserFriendlyException(
                        $"Employee with number {employeeNumber} not found.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                return ObjectMapper.Map<EmployeeDto>(employee);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error("Error retrieving employee by employee number", ex);
                throw new UserFriendlyException(
                    $"Could not retrieve Employee. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        public async Task<List<EmployeeDto>> GetEmployeesByDepartmentAsync(int departmentId)
        {
            try
            {
                var employees = await AsyncQueryableExecuter.ToListAsync(
                    _employeeRepository
                        .GetAll()
                        .Where(e => (int)e.Department == departmentId)
                );

                return ObjectMapper.Map<List<EmployeeDto>>(employees);
            }
            catch (Exception ex)
            {
                Logger.Error($"Error retrieving employees by department {departmentId}", ex);
                throw new UserFriendlyException(
                    $"Could not retrieve Employees by department. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        public async Task<List<EmployeeDto>> GetEmployeesByStatusAsync(int employmentStatusId)
        {
            try
            {
                var employees = await AsyncQueryableExecuter.ToListAsync(
                    _employeeRepository
                        .GetAll()
                        .Where(e => (int)e.EmploymentStatus == employmentStatusId)
                );

                return ObjectMapper.Map<List<EmployeeDto>>(employees);
            }
            catch (Exception ex)
            {
                Logger.Error($"Error retrieving employees by status {employmentStatusId}", ex);
                throw new UserFriendlyException(
                    $"Could not retrieve Employees by status. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        public async Task<List<EmployeeDto>> GetActiveEmployeesAsync()
        {
            try
            {
                var employees = await AsyncQueryableExecuter.ToListAsync(
                    _employeeRepository
                        .GetAll()
                        .Where(e => e.EmploymentStatus == RefListEmploymentStatus.Active)
                );

                return ObjectMapper.Map<List<EmployeeDto>>(employees);
            }
            catch (Exception ex)
            {
                Logger.Error("Error retrieving active employees", ex);
                throw new UserFriendlyException(
                    $"Could not retrieve active Employees. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        public async Task<bool> IsEmployeeEmailAvailableAsync(string employeeEmail)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(employeeEmail))
                {
                    throw new UserFriendlyException(
                        "Employee email cannot be null or empty.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var exists = await AsyncQueryableExecuter.AnyAsync(
                    _employeeRepository
                        .GetAll()
                        .Where(e => e.EmployeeEmail == employeeEmail)
                );

                return !exists;
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error("Error checking employee email availability", ex);
                throw new UserFriendlyException(
                    $"Could not check email availability. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        public async Task<EmployeeDto> CompleteProbationAsync(Guid employeeId)
        {
            try
            {
                if (employeeId == Guid.Empty)
                {
                    throw new UserFriendlyException(
                        "Invalid employee ID.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var employee = await _employeeRepository.GetAsync(employeeId);

                if (employee == null)
                {
                    throw new UserFriendlyException(
                        $"Employee with ID {employeeId} not found.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                if (employee.EmploymentStatus != RefListEmploymentStatus.Probation)
                {
                    throw new UserFriendlyException(
                        "Employee is not on probation.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                employee.EmploymentStatus = RefListEmploymentStatus.Active;
                var updatedEmployee = await _employeeRepository.UpdateAsync(employee);

                return ObjectMapper.Map<EmployeeDto>(updatedEmployee);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error completing probation for employee {employeeId}", ex);
                throw new UserFriendlyException(
                    $"Could not complete probation. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        public async Task<EmployeeDto> PromoteEmployeeAsync(Guid employeeId, string newPosition, decimal newSalary)
        {
            try
            {
                if (employeeId == Guid.Empty)
                {
                    throw new UserFriendlyException(
                        "Invalid employee ID.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                if (string.IsNullOrWhiteSpace(newPosition))
                {
                    throw new UserFriendlyException(
                        "New position cannot be null or empty.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                if (newSalary <= 0)
                {
                    throw new UserFriendlyException(
                        "New salary must be greater than zero.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var employee = await _employeeRepository.GetAsync(employeeId);

                if (employee == null)
                {
                    throw new UserFriendlyException(
                        $"Employee with ID {employeeId} not found.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                employee.Position = newPosition;
                employee.Salary = newSalary;
                var updatedEmployee = await _employeeRepository.UpdateAsync(employee);

                return ObjectMapper.Map<EmployeeDto>(updatedEmployee);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error promoting employee {employeeId}", ex);
                throw new UserFriendlyException(
                    $"Could not promote Employee. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        public async Task<EmployeeDto> TransferEmployeeAsync(Guid employeeId, int newDepartmentId)
        {
            try
            {
                if (employeeId == Guid.Empty)
                {
                    throw new UserFriendlyException(
                        "Invalid employee ID.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                if (!Enum.IsDefined(typeof(RefListDepartment), newDepartmentId))
                {
                    throw new UserFriendlyException(
                        "Invalid department ID.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var employee = await _employeeRepository.GetAsync(employeeId);

                if (employee == null)
                {
                    throw new UserFriendlyException(
                        $"Employee with ID {employeeId} not found.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                employee.Department = (RefListDepartment)newDepartmentId;
                var updatedEmployee = await _employeeRepository.UpdateAsync(employee);

                return ObjectMapper.Map<EmployeeDto>(updatedEmployee);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error transferring employee {employeeId}", ex);
                throw new UserFriendlyException(
                    $"Could not transfer Employee. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        public async Task<EmployeeDto> TerminateEmployeeAsync(Guid employeeId, DateOnly endDate)
        {
            try
            {
                if (employeeId == Guid.Empty)
                {
                    throw new UserFriendlyException(
                        "Invalid employee ID.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var employee = await _employeeRepository.GetAsync(employeeId);

                if (employee == null)
                {
                    throw new UserFriendlyException(
                        $"Employee with ID {employeeId} not found.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                if (employee.EmploymentStatus == RefListEmploymentStatus.Terminated)
                {
                    throw new UserFriendlyException(
                        "Employee is already terminated.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                employee.EmploymentStatus = RefListEmploymentStatus.Terminated;
                employee.EndDate = endDate;
                var updatedEmployee = await _employeeRepository.UpdateAsync(employee);

                return ObjectMapper.Map<EmployeeDto>(updatedEmployee);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error terminating employee {employeeId}", ex);
                throw new UserFriendlyException(
                    $"Could not terminate Employee. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }
    }
}