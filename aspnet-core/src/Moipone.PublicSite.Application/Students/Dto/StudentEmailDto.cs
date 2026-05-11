using Abp.Application.Services.Dto;
using System;

namespace Moipone.PublicSite.Students.Dto
{
    public class StudentEmailDto : EntityDto<Guid>
    {
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public string? EmailAddress { get; set; }

    }
}
