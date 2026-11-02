import { Check, Navigation, Star } from "lucide-react";

export default function ProcessIllustration({ step }) {
  if (step === 0)
    return (
      <div
        className="flex w-4/5 flex-col gap-3 rounded-xl bg-brand-petroleum p-3"
        aria-hidden="true"
      >
        {["w-2/5", "w-full", "w-3/5"].map((width) => (
          <div className="flex items-center gap-2" key={width}>
            <span className="size-1.5 shrink-0 rounded-full bg-brand-mint" />
            <span className={`h-2 rounded-full bg-brand-mint/30 ${width}`} />
          </div>
        ))}
      </div>
    );
  if (step === 1)
    return (
      <div
        className="relative flex size-full items-center justify-center overflow-hidden bg-brand-mint"
        aria-hidden="true"
      >
        <div className="pointer-events-none absolute inset-y-0 flex w-8 animate-scanner-sweep justify-center bg-linear-to-r from-transparent via-white/30 to-transparent motion-reduce:animate-none">
          <div className="h-full w-0.5 bg-white/70 shadow-scanner" />
        </div>
        <span className="relative rounded-full bg-brand-petroleum px-3 py-2 text-xs font-semibold text-white">
          Match 94%
        </span>
      </div>
    );
  if (step === 2)
    return (
      <div className="flex w-4/5 flex-col gap-2" aria-hidden="true">
        {[0, 1].map((index) => (
          <div
            key={index}
            className={`flex items-center gap-2 rounded-xl bg-brand-mint p-2 ${index ? "mr-2" : "ml-2"}`}
          >
            <span className="size-4 shrink-0 rounded-full bg-white/60" />
            <span className="h-1.5 flex-1 rounded-full bg-white/70" />
            <Check className="size-3 text-brand-petroleum" />
          </div>
        ))}
      </div>
    );
  if (step === 3)
    return (
      <div
        className="flex size-16 items-center justify-center rounded-full border border-brand-mint bg-white"
        aria-hidden="true"
      >
        <Navigation className="size-8 fill-brand-mint text-brand-petroleum" />
      </div>
    );
  return (
    <div
      className="flex flex-wrap justify-center gap-1 px-3 text-brand-petroleum"
      aria-hidden="true"
    >
      {[0, 1, 2, 3, 4].map((star) => (
        <Star key={star} className="size-5 fill-brand-mint" />
      ))}
    </div>
  );
}
