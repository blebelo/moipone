using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Moipone.PublicSite.Configuration;
using Moipone.PublicSite.Domain.Students;
using Moipone.PublicSite.Services.Emails;
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
        private readonly IEmailAppService _email;
        private readonly IConfigurationRoot _config;

        public StudentAppService(IRepository<Student, Guid> studentRepository, IConfigurationRoot config, IEmailAppService email)
            : base(studentRepository)
        {
            _email = email;
            _config = config;
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


                _email.SendWelcomeEmail(input);
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

        public async override Task<PagedResultDto<StudentDto>> GetAllAsync(PagedAndSortedResultRequestDto input)
        {
            try
            {
                var query = await Repository.GetAllIncludingAsync(s => s.ResidentialAddress);

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

                var query = await _studentRepository.GetAllIncludingAsync(s => s.ResidentialAddress);

                var student = await AsyncQueryableExecuter.FirstOrDefaultAsync(
                    query.Where(s => s.Id == input.Id)
                );

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

        public async Task<StudentDto> GetByEmailAsync(string emailAddress)
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

        public async Task<StudentDto> RegisterStudentDocumentsAsync(Guid studentId)
        {
            try
            {
                if (studentId == Guid.Empty)
                {
                    throw new UserFriendlyException(
                        "Invalid student ID.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }
                var student = await _studentRepository.GetAsync(studentId);
                if (student == null)
                {
                    throw new UserFriendlyException(
                        $"Student with ID {studentId} not found.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                string s3Prefix = _config["App:S3Prefix"];

                student.CertifiedId = $"{s3Prefix}/{studentId}/id.pdf";
                student.ProofOfResidence = $"{s3Prefix}/{studentId}/proof-of-residence.pdf";
                student.CurriculumVitae = $"{s3Prefix}/{studentId}/cv.pdf";
                student.CertifiedHighestQualification = $"{s3Prefix}/{studentId}/highest-qualifications.pdf";

                var updatedStudent = await _studentRepository.UpdateAsync(student);
                return ObjectMapper.Map<StudentDto>(updatedStudent);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error registering documents", ex);
                throw new UserFriendlyException(
                    $"Could not register documents for Student. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        public async Task<StudentDto> GetByIdNumberAsync (string idNumber)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(idNumber))
                {
                    throw new UserFriendlyException(
                        "ID number cannot be null or empty.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var sanitised = idNumber.Replace(" ", "");

                if (sanitised.Length != 13 || !sanitised.All(char.IsDigit))
                {
                    throw new UserFriendlyException(
                        "ID number must be exactly 13 digits.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var student = await AsyncQueryableExecuter.FirstOrDefaultAsync(
                    _studentRepository
                        .GetAllIncluding(s => s.ResidentialAddress)
                        .Where(s => s.IdNumber == sanitised)
                );

                if (student == null)
                {
                    throw new UserFriendlyException(
                        $"No student found with given ID number.",
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
                Logger.Error("Error retrieving student by ID number", ex);
                throw new UserFriendlyException(
                    $"Could not retrieve student. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }
    }
}
