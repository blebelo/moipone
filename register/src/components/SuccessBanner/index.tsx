'use client'

const SuccessBanner: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  return (
    <section className="relative flex w-full max-w-xl flex-col overflow-hidden rounded-lg border border-border bg-background shadow-lg">
      <div className="success-banner flex min-h-120 flex-col justify-center overflow-hidden bg-background px-6 py-10 text-center sm:px-10">
        <div className="success-icon-wrap mx-auto">
          <div className="success-icon-ring" aria-hidden="true" />
          <div className="success-icon grid size-20 place-items-center border-2 border-success bg-success-soft">
            <span className="material-symbols-outlined text-5xl text-success" aria-hidden="true">
              check
            </span>
          </div>
        </div>

        <div className="success-copy mt-7">
          <p className="mb-3 font-label text-label-md uppercase text-success">
            Check-in complete
          </p>
          <h2 className="font-display text-[2rem] leading-none text-on-surface sm:text-[2.5rem]">
            You&apos;re checked in!
          </h2>

          <p className="mx-auto mt-4 max-w-sm font-body text-body-md text-on-surface-variant">
            Your visit has been registered on today&apos;s attendance register.
          </p>
        </div>

        <div className="success-action mt-8">
          <button
            type="button"
            onClick={onDone}
            className="btn-primary w-full font-label text-label-md uppercase transition-transform hover:-translate-y-1 sm:w-48"
          >
            Done
          </button>
        </div>
      </div>
    </section>
  );
};

export default SuccessBanner;
