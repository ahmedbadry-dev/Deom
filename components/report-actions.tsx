"use client";

import { useState } from "react";
import { toPng } from "html-to-image";
import { Check, Edit3, ImageDown, Link2, LoaderCircle, Printer } from "lucide-react";

interface ReportActionsProps { reference: string; onEdit: () => void; onNotify: (message: string) => void; }

export function ReportActions({ reference, onEdit, onNotify }: ReportActionsProps) {
  const [exporting, setExporting] = useState(false);
  const [copied, setCopied] = useState(false);

  async function downloadImage() {
    const node = document.getElementById("report-paper");
    if (!node || exporting) return;
    setExporting(true);
    try {
      const dataUrl = await toPng(node, { cacheBust: true, pixelRatio: 2, backgroundColor: "#fffefa" });
      const link = document.createElement("a");
      link.download = `${reference}.png`;
      link.href = dataUrl;
      link.click();
      onNotify("تم تحميل التقرير كصورة");
    } catch { onNotify("تعذر إنشاء الصورة، يرجى المحاولة مرة أخرى"); }
    finally { setExporting(false); }
  }

  async function copyLink() {
    const url = `${window.location.origin}/report/${reference}`;
    try { await navigator.clipboard.writeText(url); }
    catch {
      const input = document.createElement("textarea"); input.value = url; document.body.appendChild(input); input.select(); document.execCommand("copy"); input.remove();
    }
    setCopied(true); onNotify("تم نسخ رابط التقرير"); setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="mt-3 grid grid-cols-2 gap-2 rounded-xl border border-black/[.07] bg-white p-2.5 shadow-[0_8px_25px_rgba(23,34,31,.05)] sm:grid-cols-4">
      <Action primary icon={<Printer size={16} />} label="تحميل PDF" onClick={() => window.print()} />
      <Action icon={exporting ? <LoaderCircle className="animate-spin" size={16} /> : <ImageDown size={16} />} label={exporting ? "جارٍ التحميل" : "تحميل كصورة"} onClick={downloadImage} disabled={exporting} />
      <Action icon={copied ? <Check size={16} /> : <Link2 size={16} />} label={copied ? "تم النسخ" : "نسخ رابط المشاركة"} onClick={copyLink} />
      <Action icon={<Edit3 size={16} />} label="تعديل البيانات" onClick={onEdit} />
    </div>
  );
}

function Action({ icon, label, onClick, disabled, primary = false }: { icon: React.ReactNode; label: string; onClick: () => void; disabled?: boolean; primary?: boolean }) {
  return <button type="button" onClick={onClick} disabled={disabled} className={`focus-ring flex min-h-10 items-center justify-center gap-2 rounded-lg px-2 py-2 text-[11px] font-semibold transition disabled:opacity-60 ${primary ? "bg-[#123f35] text-white shadow-sm hover:bg-[#0b3029]" : "border border-transparent bg-[#f7f8f6] text-[#39423f] hover:border-black/10 hover:bg-white"}`}>{icon}<span>{label}</span></button>;
}
