namespace Domain.Interfaces
{
    public interface IAddress
    {
        string Street { get; set; }
        string City { get; set; }
        string Province { get; set; }
        string PostalCode { get; set; }
        string Country { get; set; }
    }
}