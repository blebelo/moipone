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
        public string Name { get; set; }
        public string Surname { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
        public string EmailAddress { get; set; }
        public string PhoneNumber { get; set; }
        public AddressDto ResidentialAddress { get; set; }
        #endregion

        #region Documents
        public byte[] CertifiedId { get; set; }
        public byte[] ProofOfResidence { get; set; }
        public byte[] CurriculumVitae { get; set; }
        public byte[] CertifiedHighestQualification { get; set; }
        #endregion

    }
}