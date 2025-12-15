using System;
using Abp.Domain.Entities.Auditing;
using Moipone.PublicSite.Domain.Addresses;

namespace Moipone.PublicSite.Domain.Students;

public class Student : FullAuditedEntity<Guid>
{
    #region Personal Information
    public string Name { get; set; }
    public string Surname { get; set; }
    public int Age { get; set; }
    public string Gender { get; set; }
    public string EmailAddress { get; set; }
    public string PhoneNumber { get; set; }
    public Address ResidentialAddress { get; set; }
    #endregion

    #region Address Documents
    public byte[] CertifiedId { get; set; }
    public byte[] ProofOfResidence { get; set; }
    public byte[] CurriculumVitae { get; set; }
    public byte[] CertifiedHighestQualification { get; set; }
    #endregion
}
