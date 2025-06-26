namespace Domain.Interfaces
{
    public class ICourse
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int MaxStudents { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly ApplicationClose { get; set; }
        public bool EnrolmentOpen { get; set; }
        public ICollection<IStudent> Enrollments { get; set; }

    }
}
