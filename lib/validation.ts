import { z } from "zod";
import { REPORT_TYPES } from "@/types/report";

export const reportSchema = z.object({
  fullName: z.string().trim().min(3, "يرجى إدخال الاسم الكامل"),
  company: z.string().trim().min(2, "يرجى إدخال اسم الشركة أو الجهة"),
  phone: z.string().trim().regex(/^(?:\+?966|0)?5\d{8}$/, "يرجى إدخال رقم جوال سعودي صحيح"),
  email: z.email("يرجى إدخال بريد إلكتروني صحيح"),
  reportType: z.enum(REPORT_TYPES),
  title: z.string().trim().min(5, "عنوان التقرير يجب أن يتكون من 5 أحرف على الأقل"),
  description: z.string().trim().min(20, "يرجى إضافة تفاصيل أوضح للتقرير (20 حرفًا على الأقل)"),
  date: z.string().min(1, "يرجى اختيار التاريخ"),
  consent: z.literal(true, { error: "الموافقة مطلوبة لإنشاء التقرير" }),
});

export type ReportFormValues = z.infer<typeof reportSchema>;
