using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Domain.Enums;
using Domain.Interfaces;

namespace Domain.Entities
{
    public class Address
    {
        [Key]
        public int Id { get; private set; }

        private string _street;
        [Required(ErrorMessage = "Street is a required field")]
        public string Street
        {
            get => _street;
            set => _street = value.Trim();
        }

        private string _city;
        [Required(ErrorMessage = "City is a required field")]
        public string City
        {
            get => _city;
            set => _city = value.Trim();
        }

        private string _province;
        [Required(ErrorMessage = "Province is a required field")]
        public string Province
        {
            get => _province;
            set => _province = value.Trim();
        }

        private string _postalCode;
        [Required(ErrorMessage = "Postal Code is a required field")]
        public string PostalCode
        {
            get => _postalCode;
            set => _postalCode = value.Trim();
        }

        private string _country;
        [Required(ErrorMessage = "Country is a required field")]
        public string Country
        {
            get => _country;
            set => _country = value.Trim();
        }

        private Address() { }
        public Address(string street, string city, string province, string postalCode, string country )
        {
            Street = street;
            City = city;
            Province = province;
            PostalCode = postalCode;
            Country = country;
        }
    }
}
