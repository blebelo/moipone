using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
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

        [AbpAuthorize]
        public override async Task<EmployeeDto> CreateAsync(EmployeeDto input)
        {
            if (input == null)
            {
                throw new UserFriendlyException("Employee data cannot be null.");
            }

            var entity = ObjectMapper.Map<Employee>(input);
            var result = await _employeeRepository.InsertAsync(entity);

            return ObjectMapper.Map<EmployeeDto>(result);
        }
        
        [AbpAuthorize]
        public override async Task<PagedResultDto<EmployeeDto>> GetAllAsync(PagedAndSortedResultRequestDto input)
        {
            var query = Repository.GetAll();
            var totalCount = await AsyncQueryableExecuter.CountAsync(query);

            var items = await AsyncQueryableExecuter.ToListAsync(
                query.OrderBy(x => x.Id)
                     .Skip(input.SkipCount)
                     .Take(input.MaxResultCount)
            );

            return new PagedResultDto<EmployeeDto>(
                totalCount,
                ObjectMapper.Map<List<EmployeeDto>>(items)
            );
        }
        
        [AbpAuthorize]
        public override async Task<EmployeeDto> GetAsync(EntityDto<Guid> input)
        {
            if (input == null || input.Id == Guid.Empty)
            {
                throw new UserFriendlyException("Invalid ID.");
            }

            var entity = await _employeeRepository.GetAsync(input.Id);
            return ObjectMapper.Map<EmployeeDto>(entity);
        }

        [AbpAuthorize]
        public override async Task<EmployeeDto> UpdateAsync(EmployeeDto input)
        {
            if (input == null || input.Id == Guid.Empty)
            {
                throw new UserFriendlyException("Invalid ID.");
            }

            var entity = await _employeeRepository.GetAsync(input.Id);
            ObjectMapper.Map(input, entity);

            var updated = await _employeeRepository.UpdateAsync(entity);
            return ObjectMapper.Map<EmployeeDto>(updated);
        }

        [AbpAuthorize]
        public override async Task DeleteAsync(EntityDto<Guid> input)
        {
            if (input == null || input.Id == Guid.Empty)
            {
                throw new UserFriendlyException("Invalid ID.");
            }

            await _employeeRepository.DeleteAsync(input.Id);
        }
    }
}
