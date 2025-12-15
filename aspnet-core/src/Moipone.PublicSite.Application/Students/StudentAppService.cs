using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moipone.PublicSite.Domain.Students;
using Moipone.PublicSite.Students.Dto;
using System;
using System.Threading.Tasks;

namespace Moipone.PublicSite.Students
{
    public class StudentAppService : IStudentAppService
    {
        private readonly IRepository<Student, Guid> _studentRepository;

        public StudentAppService(IRepository<Student, Guid> studentRepository)
        {
            _studentRepository = studentRepository;
        }


        public async Task<StudentDto> CreateAsync(StudentDto input)
        {
            throw new NotImplementedException();
        }

        public Task DeleteAsync(EntityDto<Guid> input)
        {
            throw new NotImplementedException();
        }

        public Task<PagedResultDto<StudentDto>> GetAllAsync(PagedAndSortedResultRequestDto input)
        {
            throw new NotImplementedException();
        }

        public Task<StudentDto> GetAsync(EntityDto<Guid> input)
        {
            throw new NotImplementedException();
        }

        public Task<ActionResult> GetStudentByEmailAsync(Guid? studentId, string emailAddress)
        {
            throw new NotImplementedException();
        }

        public Task<StudentDto> UpdateAsync(StudentDto input)
        {
            throw new NotImplementedException();
        }
    }
}
