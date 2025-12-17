using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Moipone.PublicSite.Addresses.Dto;
using Moipone.PublicSite.Domain.Students;
using System;

namespace Moipone.PublicSite.Students.Dto
{
    [AutoMap(typeof(Student))]
    public class StudentDto : EntityDto<Guid>
    {
        #region Personal Information
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public int? Age { get; set; }
        public string? Gender { get; set; }
        public string? EmailAddress { get; set; }
        public string? PhoneNumber { get; set; }
        public AddressDto? ResidentialAddress { get; set; }
        #endregion

        #region Documents
        public string? CertifiedId { get; set; }
        public string? ProofOfResidence { get; set; }
        public string? CurriculumVitae { get; set; }
        public string? CertifiedHighestQualification { get; set; }
        #endregion
    }
}