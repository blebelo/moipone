using Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace Domain.Entities
{
    public class Student
    {
        [Key]
        public int Id { get; private set; }

        private string _firstName;
        [Required(ErrorMessage = "First name is a required field")]
        public required string FirstName
        {
            get => _firstName;
            set => _firstName = value.Trim();
        }

        private string _lastName;
        [Required(ErrorMessage = "Last name is a required field")]
        public required string LastName
        {
            get => _lastName;
            set => _lastName = value.Trim();
        }

        private int _age;
        [Required(ErrorMessage = "Age is a required field")]
        [Range(18, 35)]
        public int Age
        {
            get => _age;
            set => _age = value;
        }

        private string _phoneNumber;
        [Required(ErrorMessage = "Phone Number is a required field")]
        [MaxLength(10)]
        public string PhoneNumber
        {
            get => _phoneNumber;
            set => _phoneNumber = value.Trim();
        }

        private string _email;
        [Required(ErrorMessage = "Email is a required field")]

        [EmailAddress]
        public string Email
        {
            get => _email;
            set => _email = value.Trim();
        }

        private DateOnly _dateOfBirth;
        [Required(ErrorMessage = "Date Of Birth is a required field")]
        public DateOnly DateOfBirth
        {
            get => _dateOfBirth;
            set => _dateOfBirth = value;
        }

        private Sex _sex;
        [Required(ErrorMessage = "Sex is a required field")]
        public Sex Sex
        {
            get => _sex;
            set => _sex = value;
        }

        private string _identityNumber;
        [Required(ErrorMessage = "Identity Number is a required field")]
        public string IdentityNumber
        {
            get => _identityNumber;
            set => _identityNumber = value.Trim();
        }

        private Address _address;
        [Required(ErrorMessage = "Address is a required field")]
        public Address Address
        {
            get => _address;
            set => _address = value;
        }

        private Qualification _highestQualification;
        [Required(ErrorMessage = "Highest Qualification is a required field")]
        public Qualification HighestQualification
        {
            get => _highestQualification;
            set => _highestQualification = value;
        }

        private Student() { }

        public Student(string firstName, string lastName, int age, string phoneNumber, string email, DateOnly dateOfBirth, Sex sex, string identityNumber, Address address, Qualification highestQualification)
        {
            FirstName = firstName;
            LastName = lastName;
            Age = age;
            PhoneNumber = phoneNumber;
            Email = email;
            DateOfBirth = dateOfBirth;
            Sex = sex;
            IdentityNumber = identityNumber;
            Address = address;
            HighestQualification = highestQualification;
        }
    }

}
