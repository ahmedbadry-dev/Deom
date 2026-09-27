import type { ReportFormValues } from "@/lib/validation";
import type { ReportType } from "@/types/report";

export function getToday(): string {
  const date = new Date();
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60_000).toISOString().split("T")[0];
}

export function createReference(): string {
  const year = new Date().getFullYear();
  const number = Math.floor(10000 + Math.random() * 90000);
  return `RPT-${year}-${number}`;
}

export const defaultReport: ReportFormValues = {
  fullName: "أحمد محمد",
  company: "شركة النمو للأعمال",
  phone: "0501234567",
  email: "ahmed@example.com",
  reportType: "تقرير زيارة",
  title: "تقرير زيارة الموقع",
  description:
    "تمت زيارة الموقع ومراجعة نطاق العمل والمتطلبات الأولية، وتم توثيق الملاحظات الأساسية والتوصيات المقترحة للمرحلة القادمة.",
  date: "",
  consent: true,
};

const summaries: Record<ReportType, string> = {
  "تقرير زيارة":
    "تم تسجيل بيانات الزيارة والملاحظات المرتبطة بها بنجاح، ويُنصح بمراجعة التفاصيل الواردة في التقرير قبل اعتماد الإجراءات التالية.",
  "تقرير معاينة":
    "تم توثيق نتائج المعاينة والمعلومات الأساسية ذات الصلة، ويوصى بدراسة الملاحظات المسجلة لتحديد الخطوات التنفيذية المناسبة.",
  "تقرير خدمة":
    "تم توثيق بيانات الخدمة ونطاقها بصورة متكاملة، مع تسجيل التفاصيل اللازمة لدعم المتابعة ورفع جودة التنفيذ.",
  "تقرير متابعة":
    "تم تحديث حالة المتابعة وتسجيل آخر المستجدات، ويوصى بمواصلة مراجعة البنود المفتوحة وفق الأولويات المحددة.",
};

export function getSummary(type: ReportType): string {
  return summaries[type];
}

export function formatArabicDate(value: string): string {
  if (!value) return "—";
  return new Intl.DateTimeFormat("ar-SA-u-ca-gregory", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${value}T12:00:00`));
}
