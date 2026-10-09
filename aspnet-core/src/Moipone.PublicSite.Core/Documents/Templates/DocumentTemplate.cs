using Abp.Domain.Entities.Auditing;

namespace Moipone.PublicSite.Documents.Templates
{
    public class DocumentTemplate : FullAuditedEntity<int>
    {
        public string Name { get; set; } = string.Empty;
        public RefListTemplateCategory Category { get; set; } 

        public string FileName { get; set; } = string.Empty;

        public byte[] Content { get; set; } = [];

        public int Version { get; set; } = 1;

        public bool IsActive { get; set; } = true;
    }
}
