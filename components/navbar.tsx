import { FileText, LockKeyhole, Sparkles } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#153e35]/8 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1480px] items-center justify-between px-4 py-3 sm:px-8">
        <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          <div className="relative grid size-10 shrink-0 place-items-center rounded-[.7rem] bg-[#123f35] text-[#e0c38f] shadow-[0_6px_18px_rgba(18,63,53,.2)] sm:size-11">
            <FileText size={20} strokeWidth={1.7} />
            <span className="absolute -bottom-1 -left-1 grid size-4 place-items-center rounded-full border-2 border-white bg-[#b8904f] text-white"><Sparkles size={8} /></span>
          </div>
          <div className="min-w-0">
            <p className="truncate text-[.84rem] font-bold text-[#123f35] sm:text-[.93rem]">حلول المواسم للأعمال</p>
            <p className="mt-0.5 hidden text-[8px] font-medium tracking-[.16em] text-black/40 sm:block" dir="ltr">MAWASIM BUSINESS SOLUTIONS</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <span className="hidden items-center gap-1.5 text-xs font-medium text-black/45 md:flex"><LockKeyhole size={13} /> بياناتك آمنة ولا يتم حفظها</span>
          <span className="h-5 w-px bg-black/10" />
          <span className="rounded-full border border-[#b8904f]/25 bg-[#fbf7ef] px-3 py-1.5 text-[11px] font-semibold text-[#7c602f]">نسخة تجريبية</span>
        </div>
      </div>
    </header>
  );
}
