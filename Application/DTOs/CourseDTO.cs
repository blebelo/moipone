namespace Application.DTOs
{
    public class CourseDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int DurationInWeeks { get; set; }
        public string InstructorName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public ICollection<StudentDTO> EnrolledStudents { get; set; } = new List<StudentDTO>();
    }
}
