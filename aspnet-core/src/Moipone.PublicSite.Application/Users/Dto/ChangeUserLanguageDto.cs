using System.ComponentModel.DataAnnotations;

namespace Moipone.PublicSite.Users.Dto;

public class ChangeUserLanguageDto
{
    [Required]
    public string LanguageName { get; set; }
}