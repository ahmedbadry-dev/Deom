export const REPORT_TYPES = [
  "تقرير معاينة",
  "تقرير زيارة",
  "تقرير خدمة",
  "تقرير متابعة",
] as const;

export type ReportType = (typeof REPORT_TYPES)[number];

export interface ReportData {
  fullName: string;
  company: string;
  phone: string;
  email: string;
  reportType: ReportType;
  title: string;
  description: string;
  date: string;
  consent: boolean;
}
