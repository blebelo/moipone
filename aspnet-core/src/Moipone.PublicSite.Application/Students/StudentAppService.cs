using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using Moipone.PublicSite.Domain.Students;
using Moipone.PublicSite.Students.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Moipone.PublicSite.Students
{
    public class StudentAppService
        : AsyncCrudAppService<Student, StudentDto, Guid, PagedAndSortedResultRequestDto, StudentDto, StudentDto>,
          IStudentAppService
    {
        private readonly IRepository<Student, Guid> _studentRepository;

        public StudentAppService(IRepository<Student, Guid> studentRepository)
            : base(studentRepository)
        {
            _studentRepository = studentRepository;
        }

        public async override Task<StudentDto> CreateAsync(StudentDto input)
        {
            try
            {
                if (input == null)
                {
                    throw new UserFriendlyException(
                        "Student data cannot be null.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var student = ObjectMapper.Map<Student>(input);
                var result = await _studentRepository.InsertAsync(student);
                return ObjectMapper.Map<StudentDto>(result);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error("Error creating student", ex);
                throw new UserFriendlyException(
                    $"Could not create Student. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        public async override Task<PagedResultDto<StudentDto>> GetAllAsync(
            PagedAndSortedResultRequestDto input)
        {
            try
            {
                var query = Repository.GetAll();
                var totalCount = await AsyncQueryableExecuter.CountAsync(query);

                var students = await AsyncQueryableExecuter.ToListAsync(
                    query.OrderBy(s => s.Id)
                         .Skip(input.SkipCount)
                         .Take(input.MaxResultCount)
                );

                var result = ObjectMapper.Map<List<StudentDto>>(students);
                return new PagedResultDto<StudentDto>(totalCount, result);
            }
            catch (Exception ex)
            {
                Logger.Error("Error retrieving students", ex);
                throw new UserFriendlyException(
                    $"Could not retrieve Students. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        public async override Task<StudentDto> GetAsync(EntityDto<Guid> input)
        {
            try
            {
                if (input == null || input.Id == Guid.Empty)
                {
                    throw new UserFriendlyException(
                        "Invalid student ID.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var student = await _studentRepository.GetAsync(input.Id);

                if (student == null)
                {
                    throw new UserFriendlyException(
                        $"Student with ID {input.Id} not found.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                return ObjectMapper.Map<StudentDto>(student);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error retrieving student with ID {input?.Id}", ex);
                throw new UserFriendlyException(
                    $"Could not retrieve Student. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        public async override Task<StudentDto> UpdateAsync(StudentDto input)
        {
            try
            {
                if (input == null)
                {
                    throw new UserFriendlyException(
                        "Student data cannot be null.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                if (input.Id == Guid.Empty)
                {
                    throw new UserFriendlyException(
                        "Invalid student ID.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var student = await _studentRepository.GetAsync(input.Id);

                ObjectMapper.Map(input, student);
                var updatedStudent = await _studentRepository.UpdateAsync(student);

                return ObjectMapper.Map<StudentDto>(updatedStudent);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error updating student with ID {input?.Id}", ex);
                throw new UserFriendlyException(
                    $"Could not update Student. Error: {ex.Message}",
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
                        "Invalid student ID.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var student = await _studentRepository.GetAsync(input.Id);

                if (student == null)
                {
                    throw new UserFriendlyException(
                        $"Student with ID {input.Id} not found.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                await _studentRepository.DeleteAsync(input.Id);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error deleting student with ID {input?.Id}", ex);
                throw new UserFriendlyException(
                    $"Could not delete Student. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        public async Task<StudentDto> GetStudentByEmailAsync(string emailAddress)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(emailAddress))
                {
                    throw new UserFriendlyException(
                        "Email address cannot be null or empty.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var student = await AsyncQueryableExecuter.FirstOrDefaultAsync(
                    _studentRepository
                        .GetAll()
                        .Where(s => s.EmailAddress == emailAddress)
                );

                if (student == null)
                {
                    throw new UserFriendlyException(
                        $"Student with email {emailAddress} not found.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                return ObjectMapper.Map<StudentDto>(student);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error("Error retrieving student by email", ex);
                throw new UserFriendlyException(
                    $"Could not retrieve Student. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

    }
}
