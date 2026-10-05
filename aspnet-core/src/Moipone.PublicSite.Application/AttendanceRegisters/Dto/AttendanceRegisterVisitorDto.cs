using Abp.AutoMapper;
using Moipone.PublicSite.Domain.Visitors;

namespace Moipone.PublicSite.AttendanceRegisters.Dto
{
    [AutoMap(typeof(Visitor))]
    public class AttendanceRegisterVisitorDto 
    {
        public string? Name { get; set; }
        public string? Surname { get; set; }
    }
}