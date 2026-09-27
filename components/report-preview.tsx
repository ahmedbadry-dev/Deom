import { Building2, CalendarDays, FileText, Hash, Mail, Phone, UserRound } from "lucide-react";
import { formatArabicDate, getSummary } from "@/lib/report";
import type { ReportFormValues } from "@/lib/validation";

interface ReportPreviewProps { data: ReportFormValues; reference: string; imageUrl: string | null; }

export function ReportPreview({ data, reference, imageUrl }: ReportPreviewProps) {
  const details = [
    { label: "العميل", value: data.fullName, icon: UserRound, ltr: false },
    { label: "الشركة", value: data.company, icon: Building2, ltr: false },
    { label: "رقم الجوال", value: data.phone, icon: Phone, ltr: true },
    { label: "البريد الإلكتروني", value: data.email, icon: Mail, ltr: true },
  ];

  return (
    <article id="report-paper" className="report-paper relative flex w-full flex-col overflow-hidden border border-black/8 bg-[#fffefa] shadow-[0_22px_70px_rgba(23,32,29,.16)]">
      <div className="absolute right-0 top-0 h-1.5 w-full bg-[#153e35]"><span className="block h-full w-[32%] bg-[#bd9656]" /></div>
      <div className="pointer-events-none absolute -left-24 -top-24 size-64 rounded-full border-[38px] border-[#bd9656]/[.06]" />

      <header className="flex items-center justify-between border-b border-black/8 px-[6.5%] pb-[3.4%] pt-[5.2%]">
        <div className="flex items-center gap-3">
          <div className="grid size-11 place-items-center rounded-sm bg-[#153e35] text-[#dec08a]"><FileText size={21} strokeWidth={1.5} /></div>
          <div><h2 className="text-[clamp(.64rem,1.35vw,.94rem)] font-black text-[#153e35]">حلول المواسم للأعمال</h2><p className="mt-0.5 text-[clamp(.38rem,.7vw,.54rem)] tracking-[.14em] text-black/45" dir="ltr">MAWASIM BUSINESS SOLUTIONS</p></div>
        </div>
        <div className="text-left"><span className="text-[clamp(.42rem,.78vw,.58rem)] font-bold text-black/35">الرقم المرجعي</span><p dir="ltr" className="mt-1 font-mono text-[clamp(.48rem,.9vw,.68rem)] font-bold text-[#153e35]">{reference}</p></div>
      </header>

      <div className="flex flex-1 flex-col px-[6.5%] py-[4.5%]">
        <section className="flex items-start justify-between gap-5">
          <div><span className="inline-block rounded-sm bg-[#bd9656]/15 px-2 py-1 text-[clamp(.45rem,.8vw,.62rem)] font-bold text-[#89682f]">{data.reportType || "نوع التقرير"}</span><h1 className="mt-3 text-[clamp(1rem,2.4vw,1.7rem)] font-black leading-tight text-[#17201d]">{data.title || "عنوان التقرير"}</h1></div>
          <div className="flex shrink-0 items-center gap-2 text-[clamp(.46rem,.78vw,.62rem)] text-black/48"><CalendarDays size={14} className="text-[#bd9656]" /><span>{formatArabicDate(data.date)}</span></div>
        </section>

        <section className="mt-[4.5%] grid grid-cols-2 overflow-hidden rounded-md border border-black/8">
          {details.map(({ label, value, icon: Icon, ltr }, i) => <div key={label} className={`flex items-center gap-2.5 p-[3.2%] ${i < 2 ? "border-b border-black/8" : ""} ${i % 2 === 0 ? "border-l border-black/8" : ""}`}><span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#e9f0ed] text-[#153e35]"><Icon size={13} /></span><div className="min-w-0"><p className="text-[clamp(.42rem,.72vw,.56rem)] text-black/38">{label}</p><p dir={ltr ? "ltr" : "rtl"} className={`mt-0.5 truncate text-[clamp(.5rem,.9vw,.68rem)] font-bold text-[#28302e] ${ltr ? "text-right" : ""}`}>{value || "—"}</p></div></div>)}
        </section>

        <section className="mt-[4.2%]">
          <div className="mb-2.5 flex items-center gap-2"><span className="h-4 w-1 rounded-full bg-[#bd9656]" /><h3 className="text-[clamp(.58rem,1vw,.76rem)] font-black">تفاصيل التقرير</h3></div>
          <p className="whitespace-pre-wrap text-[clamp(.48rem,.88vw,.67rem)] leading-[1.9] text-black/66">{data.description || "ستظهر تفاصيل التقرير هنا بعد إدخالها."}</p>
        </section>

        {imageUrl && (
          <div className="mt-[3.8%] overflow-hidden rounded-md border border-black/8 bg-[#f4f3ef] p-1.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageUrl} alt="مرفق التقرير" className="h-[clamp(90px,13vw,155px)] w-full rounded-sm object-cover" />
          </div>
        )}

        <section className="mt-auto rounded-md border-r-[3px] border-[#bd9656] bg-[#f3f6f4] p-[3.4%]">
          <div className="mb-1.5 flex items-center gap-2 text-[#153e35]"><Hash size={13} /><h3 className="text-[clamp(.55rem,.95vw,.72rem)] font-black">ملخص التقرير</h3></div>
          <p className="text-[clamp(.45rem,.82vw,.62rem)] leading-[1.8] text-black/62">{getSummary(data.reportType)}</p>
        </section>
      </div>

      <footer className="flex items-center justify-between border-t border-black/8 bg-[#faf9f5] px-[6.5%] py-[2.6%] text-[clamp(.4rem,.7vw,.53rem)] text-black/42"><div><p>تم إنشاء هذا التقرير إلكترونيًا</p><p className="mt-0.5 font-bold text-[#153e35]">حلول المواسم للأعمال</p></div><span dir="ltr" className="font-mono">{reference}</span></footer>
    </article>
  );
}
