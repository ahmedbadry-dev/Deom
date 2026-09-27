import { Navbar } from "@/components/navbar";
import { ReportBuilder } from "@/components/report-builder";
import { createReference, getToday } from "@/lib/report";

export const dynamic = "force-dynamic";

export default function Home() {
  const initialReference = createReference();
  const initialDate = getToday();

  return <><Navbar /><ReportBuilder initialReference={initialReference} initialDate={initialDate} /></>;
}
