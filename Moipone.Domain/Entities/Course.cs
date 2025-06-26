using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Domain.Interfaces;

namespace Domain.Entities
{
    public class Course
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; private set; }

        private string _name;
        [Required]
        public required string Name
        {
            get => _name;
            set => _name = value.Trim();
        }

        private int _maxStudents;
        [Required]
        public int MaxStudents
        {
            get => _maxStudents;
            set => _maxStudents = value;
        }

        private DateOnly _startDate;
        [Required]
        public DateOnly StartDate
        {
            get => _startDate;
            set => _startDate = value;
        }

        private DateOnly _applicationClose;
        [Required]
        public DateOnly ApplicationClose
        {
            get => _applicationClose;
            set => _applicationClose = value;
        }

        private bool _enrolmentOpen;
        [Required]
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

        public Course(ICourse course)
        {
            Name = course.Name;
            MaxStudents = course.MaxStudents;
            StartDate = course.StartDate;
            ApplicationClose = course.ApplicationClose;
            EnrolmentOpen = course.EnrolmentOpen;
            Enrollments = course.Enrollments;
        }
    }
}
