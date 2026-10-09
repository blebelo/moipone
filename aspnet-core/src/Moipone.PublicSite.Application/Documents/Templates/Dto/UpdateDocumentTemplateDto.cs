using Abp.Application.Services.Dto;
using Microsoft.AspNetCore.Http;

namespace Moipone.PublicSite.Documents.Templates.Dto
{
    public class UpdateDocumentTemplateDto : EntityDto<int>
    {
     
        public string Name { get; set; } = string.Empty;

        public RefListTemplateCategory Category { get; set; }

        public IFormFile? File { get; set; }
    }
}