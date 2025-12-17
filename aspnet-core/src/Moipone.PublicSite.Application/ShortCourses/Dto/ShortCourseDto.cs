using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Moipone.PublicSite.CourseApplications.Dto;
using Moipone.PublicSite.Domain.ShortCourses;
using Moipone.PublicSite.Students.Dto;
using System;
using System.Collections.Generic;

namespace Moipone.PublicSite.ShortCourses.Dto
{
    [AutoMap(typeof(ShortCourse))]
    public class ShortCourseDto : EntityDto<Guid>
    {
        #region Core Details
        public string? Title { get; set; }
        public string? Description { get; set; }
        public int? Capacity { get; set; }
        public string? Requirements { get; set; }
        public string? Code { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? StartDate { get; set; }
        public TimeSpan? Duration { get; set; }
        #endregion

        #region Enrollment Data
        public ICollection<StudentDto> EnrolledStudents { get; set; }
        public ICollection<CourseApplicationDto> Applications { get; set; }
        #endregion
    }
}