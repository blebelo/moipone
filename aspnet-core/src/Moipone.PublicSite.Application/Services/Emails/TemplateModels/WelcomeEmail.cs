namespace Moipone.PublicSite.Services.Emails.TemplateModels
{
    public class WelcomeEmail
    {
        public string FirstName { get; set; }

        public WelcomeEmail(string firstName)
        {
            FirstName = firstName;
        }

    }


}
