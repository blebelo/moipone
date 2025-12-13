using System.ComponentModel.DataAnnotations;

namespace Moipone.PublicSite.Configuration.Dto;

public class ChangeUiThemeInput
{
    [Required]
    [StringLength(32)]
    public string Theme { get; set; }
}
