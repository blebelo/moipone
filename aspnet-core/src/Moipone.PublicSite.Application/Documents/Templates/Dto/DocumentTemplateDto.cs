using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;

namespace Moipone.PublicSite.Documents.Templates.Dto
{
    [AutoMap(typeof(DocumentTemplate))]
    public class DocumentTemplateDto : EntityDto<int>
    {
        public string Name { get; set; } = string.Empty;
        public RefListTemplateCategory Category { get; set; }
        public string FileName { get; set; } = string.Empty;
        public int Version { get; set; }
        public bool IsActive { get; set; }
    }
}