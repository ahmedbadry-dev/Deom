"use client";

import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Info, Zap } from "lucide-react";
import { defaultReport } from "@/lib/report";
import { reportSchema, type ReportFormValues } from "@/lib/validation";
import { ReportForm } from "@/components/report-form";
import { ReportPreview } from "@/components/report-preview";
import { ReportActions } from "@/components/report-actions";
import { StepIndicator } from "@/components/step-indicator";

interface ReportBuilderProps {
  initialReference: string;
  initialDate: string;
}

export function ReportBuilder({ initialReference, initialDate }: ReportBuilderProps) {
  const methods = useForm<ReportFormValues>({ resolver: zodResolver(reportSchema), defaultValues: { ...defaultReport, date: initialDate }, mode: "onBlur" });
  const watched = useWatch({ control: methods.control });
  const liveData: ReportFormValues = { ...defaultReport, ...watched } as ReportFormValues;
  const [reference] = useState(initialReference);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [toast, setToast] = useState<string | null>(null);
  const formSection = useRef<HTMLDivElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (toastTimer.current) clearTimeout(toastTimer.current); }, []);
  function notify(message: string) { setToast(message); if (toastTimer.current) clearTimeout(toastTimer.current); toastTimer.current = setTimeout(() => setToast(null), 2800); }
  async function submit() { setStatus("loading"); await new Promise((resolve) => setTimeout(resolve, 700)); setStatus("success"); notify("تم إنشاء التقرير بنجاح"); setTimeout(() => setStatus("idle"), 1700); document.getElementById("preview")?.scrollIntoView({ behavior: "smooth", block: "start" }); }

  return (
    <FormProvider {...methods}>
      <main className="app-background min-h-[calc(100vh-69px)] px-4 py-8 sm:px-8 sm:py-11">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_580px] lg:items-end">
            <div>
              <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold text-[#8b6a35]"><span className="grid size-6 place-items-center rounded-full bg-[#b8904f]/12"><Zap size={12} /></span> منصة إنشاء التقارير</div>
              <h1 className="max-w-2xl text-[1.7rem] font-bold leading-[1.35] text-[#17221f] sm:text-[2.15rem]">بيانات واضحة، تقرير احترافي.</h1>
              <p className="mt-2 max-w-xl text-sm leading-7 text-black/48">أنشئ تقريرًا مؤسسيًا بهوية متكاملة، وراجعه لحظيًا قبل التحميل أو المشاركة.</p>
            </div>
            <div className="w-full"><StepIndicator /></div>
          </div>

          <div className="grid min-w-0 items-start gap-8 xl:grid-cols-[minmax(500px,.92fr)_minmax(570px,1.08fr)]">
            <div ref={formSection} className="min-w-0">
              <ReportForm imageUrl={imageUrl} onImageChange={setImageUrl} onSubmit={submit} status={status} />
              <div className="mt-4 flex gap-3 rounded-xl border border-[#b8904f]/18 bg-[#fcfaf5] p-4 text-xs leading-6 text-black/52"><Info size={16} className="mt-0.5 shrink-0 text-[#9a753b]" /><p><span className="font-semibold text-[#5e4a29]">ملاحظة:</span> هذه نسخة تجريبية توضح آلية إنشاء التقرير تلقائيًا من البيانات المدخلة، ولا يتم حفظ البيانات.</p></div>
            </div>
            <section id="preview" className="min-w-0 scroll-mt-24 xl:sticky xl:top-24">
              <div className="mb-3 flex items-end justify-between">
                <div><div className="mb-1 flex items-center gap-2 text-[11px] font-semibold text-[#9a753b]"><span className="h-px w-5 bg-[#b8904f]" /> معاينة مباشرة</div><h2 className="text-lg font-bold text-[#17221f]">شكل التقرير النهائي</h2></div>
                <span className="flex items-center gap-2 rounded-full border border-[#123f35]/8 bg-white px-3 py-1.5 text-[11px] font-medium text-[#315f54] shadow-sm"><span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-50" /><span className="relative inline-flex size-2 rounded-full bg-emerald-500" /></span> يتحدث تلقائيًا</span>
              </div>
              <div className="rounded-2xl border border-black/[.07] bg-[#e9ece9] p-3 shadow-[0_22px_70px_rgba(23,34,31,.1)] sm:p-5"><ReportPreview data={liveData} reference={reference} imageUrl={imageUrl} /></div>
              <ReportActions reference={reference} onEdit={() => formSection.current?.scrollIntoView({ behavior: "smooth" })} onNotify={notify} />
            </section>
          </div>
        </div>
      </main>
      {toast && <div role="status" aria-live="polite" className="toast-in fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-xl border border-white/10 bg-[#123f35] px-4 py-3 text-sm font-semibold text-white shadow-2xl"><CheckCircle2 size={18} className="text-[#dec08a]" />{toast}</div>}
    </FormProvider>
  );
}
