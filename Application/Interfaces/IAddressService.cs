using Application.DTOs;

namespace Application.Interfaces
{
    public interface IAddressService
    {
        Task<AddressDTO> GetByIdAsync(int id);
        Task<IEnumerable<AddressDTO>> GetAllAsync();
        Task<bool> AddAsync(AddressDTO address);
        Task<bool> UpdateAsync(AddressDTO address);
        Task<bool> DeleteAsync(int id);
    }
}
