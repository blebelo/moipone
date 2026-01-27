using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Moipone.PublicSite.Domain.CourseApplications;
using System;

namespace Moipone.PublicSite.CourseApplications.Dto
{
    [AutoMap(typeof(CourseApplication))]
    public class CourseApplicationDto : EntityDto<Guid>
    {
        #region Application Data
        public Guid? StudentId { get; set; }
        public Guid? ShortCourseId { get; set; }
        public RefListApplicationStatus? Status { get; set; }
        public string? DecisionReason { get; set; }
        public DateTime? DecisionDate { get; set; }
        #endregion
    }
}