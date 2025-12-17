using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Moipone.PublicSite.Domain.CourseApplications;
using Moipone.PublicSite.Students.Dto;
using Moipone.PublicSite.ShortCourses.Dto;
using System;

namespace Moipone.PublicSite.CourseApplications.Dto
{
    [AutoMap(typeof(CourseApplication))]
    public class CourseApplicationDto : EntityDto<Guid>
    {
        #region Application Data
        public StudentDto? Student { get; set; }
        public ShortCourseDto? ShortCourse { get; set; }

        public RefListApplicationStatus? Status { get; set; }
        public string? DecisionReason { get; set; }
        public DateTime? DecisionDate { get; set; }
        #endregion
    }
}
