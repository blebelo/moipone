using Abp.Dependency;
using Abp.Events.Bus.Exceptions;
using Abp.Events.Bus.Handlers;
using Abp.Runtime.Session;
using Abp.UI;
using Sentry;

namespace Moipone.PublicSite.Web.Host.Startup
{
    public class SentryExceptionSubscriber :
        IEventHandler<AbpHandledExceptionData>,
        ITransientDependency
    {
        private readonly IAbpSession _abpSession;

        public SentryExceptionSubscriber(IAbpSession abpSession)
        {
            _abpSession = abpSession;
        }

        public void HandleEvent(AbpHandledExceptionData eventData)
        {
            if (eventData.Exception is UserFriendlyException)
                return;
            eventData.Exception.Data["UserSession"] = _abpSession;
            SentrySdk.CaptureException(eventData.Exception);
        }
    }
}
