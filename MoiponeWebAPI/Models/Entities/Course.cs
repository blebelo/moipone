using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace MoiponeWebAPI.Models.Entities
{
    public class Course
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
        
        [Required]
        public int MaxStudents { get; set; }

        [Required]
        public DateOnly StartDate { get; set; }

        [Required]
        public DateOnly ApplicationClose { get; set; }

        [Required]
        public bool EnrolmentOpen { get; set; }

        public ICollection<Student> Enrollments { get; set; }
    }
}
