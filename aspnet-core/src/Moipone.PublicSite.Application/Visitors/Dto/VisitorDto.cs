using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Moipone.PublicSite.Domain.Visitors;
using System;

namespace Moipone.PublicSite.Visitors.Dto
{
    [AutoMap(typeof(Visitor))]
    public class VisitorDto : EntityDto<Guid>
    {
    }
}
