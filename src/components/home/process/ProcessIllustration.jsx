import { Check, Navigation, Star } from "lucide-react";

export default function ProcessIllustration({ step }) {
  if (step === 0)
    return (
      <div
        className="bg-brand-petroleum flex w-4/5 flex-col gap-3 rounded-xl p-3"
        aria-hidden="true"
      >
        {["w-2/5", "w-full", "w-3/5"].map((width) => (
          <div className="flex items-center gap-2" key={width}>
            <span className="bg-brand-mint size-1.5 shrink-0 rounded-full" />
            <span className={`bg-brand-mint/30 h-2 rounded-full ${width}`} />
          </div>
        ))}
      </div>
    );
  if (step === 1)
    return (
      <div
        className="bg-brand-mint relative flex size-full items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        <div className="animate-scanner-sweep pointer-events-none absolute inset-y-0 flex w-8 justify-center bg-linear-to-r from-transparent via-white/30 to-transparent motion-reduce:animate-none">
          <div className="shadow-scanner h-full w-0.5 bg-white/70" />
        </div>
        <span className="bg-brand-petroleum relative rounded-full px-3 py-2 text-xs font-semibold text-white">
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
            className={`bg-brand-mint flex items-center gap-2 rounded-xl p-2 ${index ? "mr-2" : "ml-2"}`}
          >
            <span className="size-4 shrink-0 rounded-full bg-white/60" />
            <span className="h-1.5 flex-1 rounded-full bg-white/70" />
            <Check className="text-brand-petroleum size-3" />
          </div>
        ))}
      </div>
    );
  if (step === 3)
    return (
      <div
        className="border-brand-mint flex size-16 items-center justify-center rounded-full border bg-white"
        aria-hidden="true"
      >
        <Navigation className="fill-brand-mint text-brand-petroleum size-8" />
      </div>
    );
  return (
    <div
      className="text-brand-petroleum flex flex-wrap justify-center gap-1 px-3"
      aria-hidden="true"
    >
      {[0, 1, 2, 3, 4].map((star) => (
        <Star key={star} className="fill-brand-mint size-5" />
      ))}
    </div>
  );
}
