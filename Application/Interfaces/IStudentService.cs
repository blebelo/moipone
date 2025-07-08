using Application.DTOs;

namespace Application.Interfaces
{
    public interface IStudentService
    {
        Task<StudentDTO> GetByIdAsync(int id);
        Task<IEnumerable<StudentDTO>> GetAllAsync();
        Task<bool> AddAsync(StudentDTO student);
        Task<bool> UpdateAsync(StudentDTO student);
        Task<bool> DeleteAsync(int id);
    }
}
