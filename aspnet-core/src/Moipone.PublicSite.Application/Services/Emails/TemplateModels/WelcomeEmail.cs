namespace Moipone.PublicSite.Services.Emails.TemplateModels
{
    public class WelcomeEmail
    {
        public WelcomeEmail(string firstName)
        {
            FirstName = firstName;
        }

        public string FirstName { get; set; }
    }
}
