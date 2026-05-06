using Abp.MailKit;
using Abp.Net.Mail.Smtp;
using Castle.Core.Configuration;
using MailKit.Net.Smtp;
using MailKit.Security;
using Moipone.PublicSite.Configuration;

namespace Moipone.PublicSite.Emails
{
    public class MailKitSmtpBuilder : DefaultMailKitSmtpBuilder
    {
        private readonly IConfiguration _configuration;
        public MailKitSmtpBuilder(
            ISmtpEmailSenderConfiguration smtpEmailSenderConfiguration, 
            IAbpMailKitConfiguration abpMailKitConfiguration,
            IConfiguration configuration
            )
            : base(smtpEmailSenderConfiguration, abpMailKitConfiguration)
            {
                _configuration = configuration;
            }

        protected override void ConfigureClient(SmtpClient client)
        {
            client.ServerCertificateValidationCallback = (sender, certificate, chain, errors) => true;
            base.ConfigureClient(client);
        }

    }
}