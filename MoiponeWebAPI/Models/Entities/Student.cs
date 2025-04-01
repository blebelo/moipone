using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Net;
using MoiponeWebAPI.Models.Enums;

namespace MoiponeWebAPI.Models.Entities
{
    public class Student
    {
        /* 
         *  Basic Student Info
         */
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(100)]
        public string LastName { get; set; }

        [Required]
        [Range(18,35)]
        public int Age { get; set; }

        [Required, MaxLength(10)]
        public string PhoneNumber { get; set; }

        [Required, MaxLength(256), EmailAddress]
        public string Email { get; set; }

        [Required]
        public DateOnly DateOfBirth { get; set; }

        [Required]
        public Gender Gender { get; set; }

        [Required]
        public string IdentityNumber { get; set; }

        [Required]
        public Address Address { get; set; }

        [Required]
        public string HighestQualification { get; set; }


        /* 
         *  Student Document Links - Uploaded To Google Cloud Storage Bucket
         */
        [Required]
        [MaxLength(500)]
        public string CertifiedIdCopyUrl { get; set; }


        [Required]
        [MaxLength(500)]
        public string CvUrl { get; set; }

        [Required]
        [MaxLength(500)]
        public string ProofOfResidenceUrl { get; set; }

        [Required]
        [MaxLength(500)]
        public string HighestQualificationProofUrl { get; set; }
    

        public DateTime DateEnrolled { get; } = DateTime.UtcNow;
    }
}
