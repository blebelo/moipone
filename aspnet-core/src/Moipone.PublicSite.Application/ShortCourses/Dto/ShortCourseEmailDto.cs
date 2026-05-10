using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;

namespace Moipone.PublicSite.ShortCourses.Dto
{
    public class ShortCourseEmailDto : EntityDto<Guid>
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int Capacity { get; set; }
        public DateTime StartDate { get; set; }
        public TimeSpan Duration { get; set; }
        public ICollection<string> Features { get; set; }
    }
}
