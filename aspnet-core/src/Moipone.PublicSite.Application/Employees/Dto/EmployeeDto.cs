using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Moipone.PublicSite.Domain.Employees;
using System;

namespace Moipone.PublicSite.Employees.Dto
{
    [AutoMap(typeof(Employee))]
    public class EmployeeDto : EntityDto<Guid>
    {
    }
}
