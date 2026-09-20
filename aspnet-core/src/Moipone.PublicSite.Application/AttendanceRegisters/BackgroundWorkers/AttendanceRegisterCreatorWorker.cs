using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Abp.Threading.BackgroundWorkers;
using Abp.Threading.Timers;
using Moipone.PublicSite.Domain.Visits;
using System;
using System.Threading.Tasks;

namespace Moipone.PublicSite.AttendanceRegisters.BackgroundWorkers
{
    public sealed class AttendanceRegisterCreatorWorker : AsyncPeriodicBackgroundWorkerBase
    {
        private static readonly TimeSpan RegisterCloseTime = new(16, 30, 0);

        private readonly IRepository<AttendanceRegister, int> _attendanceRegisterRepository;
        private readonly IUnitOfWorkManager _unitOfWorkManager;

        private static readonly TimeZoneInfo SouthAfricaTimeZone =
            TimeZoneInfo.FindSystemTimeZoneById("Africa/Johannesburg");

        public AttendanceRegisterCreatorWorker(AbpAsyncTimer timer, IRepository<AttendanceRegister, int> attendanceRegisterRepository,
            IUnitOfWorkManager unitOfWorkManager)
            : base(timer)
        {
            _attendanceRegisterRepository = attendanceRegisterRepository;
            _unitOfWorkManager = unitOfWorkManager;

            Timer.RunOnStart = false;

            var now = GetSouthAfricaTime();
            var nextRun = GetNextRun(now);

            Timer.Period = (int)(nextRun - now).TotalMilliseconds;
        }

        protected override async Task DoWorkAsync()
        {
            using (var uow = _unitOfWorkManager.Begin())
            {
                var now = GetSouthAfricaTime();
                var today = DateOnly.FromDateTime(now);

                var register =
                    await _attendanceRegisterRepository.FirstOrDefaultAsync(
                        r => r.Date == today);

                if (register == null)
                {
                    register = new AttendanceRegister
                    {
                        Date = today,
                        IsClosed = false
                    };

                    await _attendanceRegisterRepository.InsertAsync(register);
                }

                if (!register.IsClosed && now.TimeOfDay >= RegisterCloseTime)
                {
                    register.IsClosed = true;

                    await _attendanceRegisterRepository.UpdateAsync(register);
                }

                await uow.CompleteAsync();
            }

            Timer.Period = 15 * 60 * 1000;
        }

        private static DateTime GetSouthAfricaTime()
        {
            return TimeZoneInfo.ConvertTimeFromUtc(
                DateTime.UtcNow,
                SouthAfricaTimeZone);
        }

        private static DateTime GetNextRun(DateTime now)
        {
            var nextMinute = ((now.Minute / 15) + 1) * 15;

            if (nextMinute >= 60)
            {
                return new DateTime(
                    now.Year,
                    now.Month,
                    now.Day,
                    now.Hour,
                    0,
                    0).AddHours(1);
            }

            return new DateTime(
                now.Year,
                now.Month,
                now.Day,
                now.Hour,
                nextMinute,
                0);
        }
    }
}