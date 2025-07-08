using Application.DTOs;

namespace Application.Interfaces
{
    public interface ICourseService
    {
        Task<CourseDTO> GetByIdAsync(int id);
        Task<IEnumerable<CourseDTO>> GetAllAsync();
        Task<bool> AddAsync(CourseDTO course);
        Task<bool> UpdateAsync(CourseDTO course);
        Task<bool> DeleteAsync(int id);
    }
}
