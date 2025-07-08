using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    public class Course
    {
        [Key]
        public int Id { get; private set; }

        private string _name;
        [Required(ErrorMessage = "Name is a required field")]
        public required string Name
        {
            get => _name;
            set => _name = value.Trim();
        }

        private string _instructorName;
        [Required(ErrorMessage = "InstructorName is a required field")]
        public required string InstructorName
        {
            get => _instructorName;
            set => _instructorName = value.Trim();
        }

        private int _maxStudents;
        [Required(ErrorMessage = "MaxStudents is a required field")]
        public int MaxStudents
        {
            get => _maxStudents;
            set => _maxStudents = value;
        }

        private DateOnly _startDate;
        [Required(ErrorMessage = "StartDate is a required field")]
        public DateOnly StartDate
        {
            get => _startDate;
            set => _startDate = value;
        }

        private DateOnly _applicationClose;
        [Required(ErrorMessage = "ApplicationClose is a required field")]
        public DateOnly ApplicationClose
        {
            get => _applicationClose;
            set => _applicationClose = value;
        }

        private bool _enrolmentOpen;
        [Required(ErrorMessage = "EnrolmentOpen is a required field")]
        public bool EnrolmentOpen
        {
            get => _enrolmentOpen;
            set => _enrolmentOpen = value;
        }

        private ICollection<Student> _enrollments;
        public ICollection<Student> Enrollments
        {
            get => _enrollments;
            set => _enrollments = value;
        }

        private Course() { }

        public Course(string name, int maxStudents, DateOnly startDate, DateOnly applicationClose, bool enrolmentOpen, string instructorName)
        {
            Name = name;
            MaxStudents = maxStudents;
            StartDate = startDate;
            ApplicationClose = applicationClose;
            EnrolmentOpen = enrolmentOpen;
            Enrollments = new List<Student>();
            InstructorName = instructorName;
        }
    }
}
