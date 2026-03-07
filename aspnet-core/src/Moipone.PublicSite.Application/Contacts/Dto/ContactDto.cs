using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Moipone.PublicSite.Domain.Contacts;
using System;

namespace Moipone.PublicSite.Contacts.Dto
{
    [AutoMap(typeof(Contact))]
    public class ContactDto : EntityDto<Guid>
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public RefListContactSubject Subject { get; set; }
        public string Message { get; set; }
    }
}
