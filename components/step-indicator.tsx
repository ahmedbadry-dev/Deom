import { Check } from "lucide-react";

const steps = ["إدخال البيانات", "معاينة التقرير", "تحميل ومشاركة"];

export function StepIndicator() {
  return (
    <ol className="grid grid-cols-3 rounded-xl border border-black/[.06] bg-white p-1.5 shadow-[0_8px_25px_rgba(23,32,29,.04)]" aria-label="مراحل إنشاء التقرير">
      {steps.map((step, index) => (
        <li key={step} className={`relative flex min-w-0 items-center justify-center gap-2 rounded-lg px-2 py-2.5 text-center text-[10px] font-semibold sm:text-xs ${index === 0 ? "bg-[#edf4f1] text-[#123f35]" : "text-black/42"}`}>
          <span className={`grid size-6 shrink-0 place-items-center rounded-full text-[11px] ${index === 0 ? "bg-[#123f35] text-white shadow-sm" : "border border-black/10 bg-white text-black/45"}`}>
            {index === 0 ? <Check size={13} /> : index + 1}
          </span>
          <span>{step}</span>
        </li>
      ))}
    </ol>
  );
}
