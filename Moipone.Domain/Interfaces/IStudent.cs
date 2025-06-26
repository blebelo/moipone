using Domain.Enums;

namespace Domain.Interfaces
{
    public class IStudent
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public Sex Sex { get; set; }
        public string IdentityNumber { get; set; }
        public IAddress Address { get; set; }
        public Qualification HighestQualification { get; set; }

    }
}
