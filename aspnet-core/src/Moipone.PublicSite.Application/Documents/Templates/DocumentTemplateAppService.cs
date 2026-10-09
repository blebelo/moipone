using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Entities;
using Abp.Domain.Repositories;
using Abp.UI;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moipone.PublicSite.Documents.Templates.Dto;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Moipone.PublicSite.Documents.Templates
{
    public class DocumentTemplateAppService : ApplicationService, IDocumentTemplateAppService
    {
        private const long MaxFileSize = 10 * 1024 * 1024;

        private readonly IRepository<DocumentTemplate, int> _repository;

        public DocumentTemplateAppService(IRepository<DocumentTemplate, int> repository)
        {
            _repository = repository;
        }

        [AbpAuthorize]
        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<int> CreateAsync(
            [FromForm] CreateDocumentTemplateDto input)
        {
            try
            {
                if (input == null)
                {
                    throw new UserFriendlyException(
                        "Invalid document template data.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                ValidateDocx(input.File);

                await using var stream = new MemoryStream();
                await input.File!.CopyToAsync(stream);

                var template = new DocumentTemplate
                {
                    Name = input.Name,
                    Category = input.Category,
                    FileName = Path.GetFileName(input.File.FileName),
                    Content = stream.ToArray(),
                    Version = 1,
                    IsActive = true
                };

                return await _repository.InsertAndGetIdAsync(template);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error("Error creating DocumentTemplate.", ex);

                throw new UserFriendlyException(
                    "Could not create the document template. Please try again.",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        [AbpAuthorize]
        [HttpGet]
        public async Task<DocumentTemplateDto> GetAsync(int id)
        {
            try
            {
                if (id <= 0)
                {
                    throw new UserFriendlyException(
                        "Invalid document template ID.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var template = await _repository.GetAsync(id);

                return MapToDto(template);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (EntityNotFoundException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error(
                    $"Error retrieving DocumentTemplate with ID {id}.",
                    ex
                );

                throw new UserFriendlyException(
                    "Could not retrieve the document template. Please try again.",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        [AbpAuthorize]
        [HttpGet]
        public async Task<List<DocumentTemplateDto>> GetAllAsync()
        {
            try
            {
                var templates = await _repository.GetAllListAsync();

                return templates
                    .Select(MapToDto)
                    .ToList();
            }
            catch (Exception ex)
            {
                Logger.Error("Error retrieving DocumentTemplates.", ex);

                throw new UserFriendlyException(
                    "Could not retrieve document templates. Please try again.",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        [AbpAuthorize]
        [HttpPut]
        [Consumes("multipart/form-data")]
        public async Task UpdateAsync([FromForm] UpdateDocumentTemplateDto input)
        {
            try
            {
                if (input == null || input.Id <= 0)
                {
                    throw new UserFriendlyException(
                        "Invalid document template data.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var template = await _repository.GetAsync(input.Id);

                template.Name = input.Name;
                template.Category = input.Category;

                if (input.File != null)
                {
                    ValidateDocx(input.File);

                    await using var stream = new MemoryStream();
                    await input.File.CopyToAsync(stream);

                    template.FileName = Path.GetFileName(input.File.FileName);
                    template.Content = stream.ToArray();
                }

                template.Version++;

                await _repository.UpdateAsync(template);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (EntityNotFoundException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error(
                    $"Error updating DocumentTemplate with ID {input?.Id}.",
                    ex
                );

                throw new UserFriendlyException(
                    "Could not update the document template. Please try again.",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        [AbpAuthorize]
        [HttpDelete]
        public async Task DeleteAsync(int id)
        {
            try
            {
                if (id <= 0)
                {
                    throw new UserFriendlyException(
                        "Invalid document template ID.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var template = await _repository.GetAsync(id);

                await _repository.DeleteAsync(template);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (EntityNotFoundException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error(
                    $"Error deleting DocumentTemplate with ID {id}.",
                    ex
                );

                throw new UserFriendlyException(
                    "Could not delete the document template. Please try again.",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        private static void ValidateDocx(IFormFile? file)
        {
            if (file == null || file.Length == 0)
            {
                throw new UserFriendlyException(
                    "Please upload a document.",
                    Abp.Logging.LogSeverity.Warn
                );
            }

            if (!string.Equals(
                    Path.GetExtension(file.FileName),
                    ".docx",
                    StringComparison.OrdinalIgnoreCase))
            {
                throw new UserFriendlyException(
                    "Only DOCX files are supported.",
                    Abp.Logging.LogSeverity.Warn
                );
            }

            if (file.Length > MaxFileSize)
            {
                throw new UserFriendlyException(
                    "The document cannot exceed 10 MB.",
                    Abp.Logging.LogSeverity.Warn
                );
            }
        }

        private static DocumentTemplateDto MapToDto(
            DocumentTemplate template)
        {
            return new DocumentTemplateDto
            {
                Id = template.Id,
                Name = template.Name,
                Category = template.Category,
                FileName = template.FileName,
                Version = template.Version,
                IsActive = template.IsActive
            };
        }

        [HttpGet]
        public async Task<IActionResult> Download(int id)
        {
            var template = await _repository.GetAsync(id);

            return new FileContentResult(
                template.Content,
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
            {
                FileDownloadName = template.FileName
            };
        }
    }
}