using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace Moipone.PublicSite.Documents.Templates.Dto
{
    [AutoMap(typeof(DocumentTemplate))]
    public class CreateDocumentTemplateDto : EntityDto<int>
    {
        public string Name { get; set; } = string.Empty;
        public RefListTemplateCategory Category { get; set; }
        [Required]
        public IFormFile File { get; set; } = null!;
    }
}
