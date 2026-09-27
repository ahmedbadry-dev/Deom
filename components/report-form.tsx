"use client";

import { useRef, useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import {
  Building2,
  CalendarDays,
  Check,
  ChevronLeft,
  FileCheck2,
  ImagePlus,
  LoaderCircle,
  Mail,
  Phone,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import type { ReportFormValues } from "@/lib/validation";
import { REPORT_TYPES } from "@/types/report";

interface ReportFormProps {
  imageUrl: string | null;
  onImageChange: (url: string | null) => void;
  onSubmit: (data: ReportFormValues) => void;
  status: "idle" | "loading" | "success";
}

const contactFields = [
  { name: "fullName", label: "الاسم الكامل", placeholder: "مثال: أحمد محمد", icon: UserRound, inputMode: "text" },
  { name: "company", label: "الشركة / الجهة", placeholder: "اسم الجهة", icon: Building2, inputMode: "text" },
  { name: "phone", label: "رقم الجوال", placeholder: "05xxxxxxxx", icon: Phone, inputMode: "tel" },
  { name: "email", label: "البريد الإلكتروني", placeholder: "name@example.com", icon: Mail, inputMode: "email" },
] as const;

export function ReportForm({ imageUrl, onImageChange, onSubmit, status }: ReportFormProps) {
  const { register, control, handleSubmit, formState: { errors } } = useFormContext<ReportFormValues>();
  const description = useWatch({ control, name: "description" });
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  function handleFile(file?: File) {
    if (!file) return;
    if (!file.type.match(/^image\/(jpeg|png)$/)) {
      setUploadError("صيغة الملف غير مدعومة. اختر صورة JPG أو PNG.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("حجم الصورة أكبر من 5 ميجابايت.");
      return;
    }
    setUploadError(null);
    const reader = new FileReader();
    reader.onload = () => onImageChange(String(reader.result));
    reader.readAsDataURL(file);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="overflow-hidden rounded-2xl border border-black/[.07] bg-white shadow-[0_20px_60px_rgba(23,34,31,.07)]" noValidate>
      <div className="flex items-start justify-between gap-4 border-b border-black/[.06] bg-[#fcfcfa] px-5 py-5 sm:px-7">
        <div>
          <div className="mb-1.5 flex items-center gap-2 text-[11px] font-semibold text-[#9a753b]"><span className="h-px w-5 bg-[#b8904f]" /> بيانات التقرير</div>
          <h2 className="text-xl font-bold text-[#17221f]">أنشئ تقريرًا جديدًا</h2>
          <p className="mt-1 text-xs leading-5 text-black/45">الحقول المعلّمة بنجمة مطلوبة لإتمام التقرير.</p>
        </div>
        <span className="grid size-10 place-items-center rounded-xl border border-[#123f35]/8 bg-[#edf4f1] text-[#123f35]"><FileCheck2 size={19} /></span>
      </div>

      <div className="px-5 py-6 sm:px-7">
        <FormSection number="01" title="بيانات العميل" description="معلومات التواصل الأساسية">
          <div className="grid gap-4 sm:grid-cols-2">
            {contactFields.map(({ name, label, placeholder, icon: Icon, inputMode }) => (
              <FormField key={name} id={name} label={label} error={errors[name]?.message} required>
                <div className="relative" dir={inputMode === "email" ? "ltr" : "rtl"}>
                  <Icon className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-black/30" size={16} strokeWidth={1.8} />
                  <input
                    id={name}
                    {...register(name)}
                    type={inputMode === "email" ? "email" : inputMode === "tel" ? "tel" : "text"}
                    inputMode={inputMode === "tel" ? "tel" : inputMode === "email" ? "email" : "text"}
                    placeholder={placeholder}
                    dir={inputMode === "email" ? "ltr" : "rtl"}
                    aria-invalid={Boolean(errors[name])}
                    className={`field field-with-leading-icon ${inputMode === "email" ? "text-left" : ""} ${errors[name] ? "field-error" : ""}`}
                  />
                </div>
              </FormField>
            ))}
          </div>
        </FormSection>

        <FormSection number="02" title="محتوى التقرير" description="حدّد النوع وأضف تفاصيل واضحة">
          <Controller control={control} name="reportType" render={({ field }) => (
            <fieldset>
              <legend className="mb-2.5 text-[13px] font-semibold text-[#303936]">نوع التقرير <span className="text-[#a54545]">*</span></legend>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {REPORT_TYPES.map((type) => {
                  const active = field.value === type;
                  return (
                    <button key={type} type="button" onClick={() => field.onChange(type)} className={`focus-ring relative min-h-11 rounded-lg border px-2.5 py-2 text-xs font-semibold transition ${active ? "border-[#123f35] bg-[#edf4f1] text-[#123f35] shadow-[inset_0_0_0_1px_#123f35]" : "border-black/10 bg-white text-black/50 hover:border-black/20 hover:bg-[#fafaf8]"}`}>
                      {active && <Check className="absolute left-1.5 top-1.5" size={11} />}{type.replace("تقرير ", "")}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          )} />

          <div className="mt-4 grid gap-4 sm:grid-cols-[1.35fr_.65fr]">
            <FormField id="title" label="عنوان التقرير" error={errors.title?.message} required>
              <input id="title" {...register("title")} aria-invalid={Boolean(errors.title)} className={`field ${errors.title ? "field-error" : ""}`} placeholder="اكتب عنوانًا مختصرًا وواضحًا" />
            </FormField>
            <FormField id="date" label="تاريخ التقرير" error={errors.date?.message} required>
              <div className="relative">
                <input id="date" {...register("date")} type="date" className={`field field-with-trailing-icon ${errors.date ? "field-error" : ""}`} />
                <CalendarDays className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-black/30" size={16} />
              </div>
            </FormField>
          </div>

          <div className="mt-4">
            <FormField id="description" label="تفاصيل التقرير" error={errors.description?.message} required hint={`${description?.length ?? 0} حرف`}>
              <textarea id="description" {...register("description")} rows={5} aria-invalid={Boolean(errors.description)} className={`field resize-y leading-7 ${errors.description ? "field-error" : ""}`} placeholder="اكتب ملخص الزيارة أو الخدمة والملاحظات والتوصيات..." />
            </FormField>
          </div>
        </FormSection>

        <FormSection number="03" title="المرفقات" description="أضف صورة داعمة للتقرير (اختياري)" last>
          <input ref={fileRef} type="file" accept="image/png,image/jpeg" className="sr-only" onChange={(event) => handleFile(event.target.files?.[0])} />
          {imageUrl ? (
            <div className="flex items-center gap-3 rounded-xl border border-[#123f35]/12 bg-[#f7faf8] p-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageUrl} alt="معاينة الصورة المرفقة" className="size-16 rounded-lg object-cover" />
              <div className="min-w-0 flex-1"><p className="text-sm font-semibold text-[#26312e]">تم إرفاق الصورة</p><p className="mt-1 text-xs text-black/40">ستظهر تلقائيًا داخل التقرير</p></div>
              <button type="button" onClick={() => { onImageChange(null); if (fileRef.current) fileRef.current.value = ""; }} className="focus-ring grid size-9 place-items-center rounded-lg border border-black/8 bg-white text-black/45 transition hover:border-red-200 hover:text-red-600" aria-label="حذف الصورة"><X size={16} /></button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              onDragEnter={(event) => { event.preventDefault(); setDragging(true); }}
              onDragOver={(event) => event.preventDefault()}
              onDragLeave={() => setDragging(false)}
              onDrop={(event) => { event.preventDefault(); setDragging(false); handleFile(event.dataTransfer.files[0]); }}
              className={`focus-ring flex w-full flex-col items-center justify-center rounded-xl border border-dashed px-4 py-5 text-center transition ${dragging ? "border-[#123f35] bg-[#edf4f1]" : "border-black/15 bg-[#fafaf8] hover:border-[#b8904f]/60 hover:bg-[#fcfaf5]"}`}
            >
              <span className="mb-2 grid size-9 place-items-center rounded-lg bg-white text-[#8a692f] shadow-sm"><ImagePlus size={18} /></span>
              <span className="text-sm font-semibold text-[#303936]">اسحب الصورة هنا أو <span className="text-[#8a692f]">اختر من جهازك</span></span>
              <span className="mt-1 text-[11px] text-black/38">JPG أو PNG — بحد أقصى 5 ميجابايت</span>
            </button>
          )}
          {uploadError && <p role="alert" className="mt-2 text-xs text-red-600">{uploadError}</p>}
        </FormSection>

        <Controller control={control} name="consent" render={({ field }) => (
          <label className={`mt-5 flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition ${errors.consent ? "border-red-200 bg-red-50/40" : "border-black/[.07] bg-[#fafaf8] hover:border-black/15"}`}>
            <input type="checkbox" checked={field.value} onChange={field.onChange} className="peer sr-only" />
            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded border border-black/20 bg-white text-white peer-checked:border-[#123f35] peer-checked:bg-[#123f35]">{field.value && <Check size={13} />}</span>
            <span><span className="block text-[13px] font-medium text-black/65">أوافق على استخدام البيانات لإنشاء هذا التقرير</span>{errors.consent && <span className="mt-1 block text-[11px] text-red-600">{errors.consent.message}</span>}</span>
          </label>
        )} />

        <button type="submit" disabled={status === "loading"} className="focus-ring mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#123f35] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(18,63,53,.2)] transition hover:-translate-y-0.5 hover:bg-[#0b3029] disabled:cursor-wait disabled:translate-y-0 disabled:opacity-70">
          {status === "loading" ? <><LoaderCircle className="animate-spin" size={18} /> جارٍ تجهيز التقرير...</> : status === "success" ? <><Check size={18} /> التقرير جاهز</> : <><Sparkles size={17} /> إنشاء التقرير <ChevronLeft size={16} /></>}
        </button>
        <p className="mt-2.5 text-center text-[11px] text-black/35">يمكنك مراجعة التقرير وتعديله قبل التحميل</p>
      </div>
    </form>
  );
}

function FormSection({ number, title, description, last = false, children }: { number: string; title: string; description: string; last?: boolean; children: React.ReactNode }) {
  return (
    <section className={last ? "" : "mb-6 border-b border-black/[.06] pb-6"}>
      <div className="mb-4 flex items-start gap-3">
        <span className="mt-0.5 font-mono text-[10px] font-bold tracking-wider text-[#a17b3f]">{number}</span>
        <div><h3 className="text-[15px] font-bold text-[#1f2a27]">{title}</h3><p className="mt-0.5 text-[11px] text-black/38">{description}</p></div>
      </div>
      {children}
    </section>
  );
}

function FormField({ id, label, error, hint, required, children }: { id: string; label: string; error?: string; hint?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-2">
        <label htmlFor={id} className="text-[13px] font-semibold text-[#303936]">{label} {required && <span className="text-[#a54545]">*</span>}</label>
        {hint && <span className="text-[10px] text-black/30">{hint}</span>}
      </div>
      {children}
      {error && <p role="alert" className="mt-1.5 text-[11px] text-red-600">{error}</p>}
    </div>
  );
}
