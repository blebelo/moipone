using Abp.Application.Services;
using Microsoft.AspNetCore.Mvc;
using Moipone.PublicSite.Documents.Templates.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Moipone.PublicSite.Documents.Templates
{
    public interface IDocumentTemplateAppService : IApplicationService
    {
        Task<int> CreateAsync(CreateDocumentTemplateDto input);

        Task<DocumentTemplateDto> GetAsync(int id);

        Task<List<DocumentTemplateDto>> GetAllAsync();

        Task UpdateAsync(UpdateDocumentTemplateDto input);

        Task DeleteAsync(int id);
        Task<IActionResult> Download(int id);
    }
}