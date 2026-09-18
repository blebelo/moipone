using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Moipone.PublicSite.Domain.Visits;
using System;

namespace Moipone.PublicSite.Visits.Dto
{
    [AutoMap(typeof(Visit))]
    public class VisitDto : EntityDto<Guid>
    {
    }
}
