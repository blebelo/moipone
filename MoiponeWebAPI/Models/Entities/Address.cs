using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace MoiponeWebAPI.Models.Entities
{
    public class Address
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string Street { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string Province { get; set; }

        [Required]
        public string PostalCode { get; set; }

        [Required]
        public string Country { get; set; }

        // Foreign key to link Address to Student
        public int StudentId { get; set; }

        // Navigation property for reverse navigation
        [ForeignKey("CustomerId")]
        public Student Student{ get; set; }
    }
}