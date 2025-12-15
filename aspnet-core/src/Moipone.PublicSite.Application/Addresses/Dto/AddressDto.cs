using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Moipone.PublicSite.Domain.Addresses;
using System;

namespace Moipone.PublicSite.Addresses.Dto
{
    [AutoMap(typeof(Address))]
    public class AddressDto : EntityDto<Guid>
    {
        public string Street { get; set; }
        public string Suburb { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
    }
}