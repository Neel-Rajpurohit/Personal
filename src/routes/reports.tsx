import { createFileRoute } from "@tanstack/react-router";
import { Download, FileSpreadsheet, FileText } from "lucide-react";
import { Card, DataTable, PageHeader, Select, btn } from "@/components/admin/AdminShell";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reports — GrainShield AI" },
      { name: "description", content: "District-wise trip and verification reports." },
      { property: "og:title", content: "Reports — GrainShield AI" },
      { property: "og:description", content: "District-wise trip and verification reports." },
    ],
  }),
  component: Reports,
});

const districts = [
  ["Ahmedabad", 412, 381, 22, 9],
  ["Gandhinagar", 198, 187, 8, 3],
  ["Vadodara", 305, 271, 25, 9],
  ["Surat", 356, 330, 18, 8],
  ["Rajkot", 241, 219, 14, 8],
] as const;
const weekly = [62, 78, 70, 88, 94, 81, 90];

function Reports() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Reports" }]}
        title="Reports"
        subtitle="Verification summary by district"
        right={<div className="flex gap-2"><button className={btn.outline}><FileText className="h-4 w-4" />PDF</button><button className={btn.primary}><FileSpreadsheet className="h-4 w-4" />Excel</button></div>}
      />
      <div className="mb-6 grid gap-3 md:grid-cols-3">
        <Select options={["Last 7 days", "Last 30 days", "This quarter"]} />
        <Select options={["All Districts", "Ahmedabad", "Gandhinagar", "Vadodara", "Surat", "Rajkot"]} />
        <Select options={["All Stages", "First Mile", "Middle Mile", "Last Mile"]} />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card title="Daily Pass Rate (%)" className="lg:col-span-1">
          <div className="flex h-48 items-end gap-3">
            {weekly.map((v, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <div className="w-full rounded-t bg-primary" style={{ height: `${v * 1.8}px` }} />
                <span className="text-xs text-muted-foreground">{["M", "T", "W", "T", "F", "S", "S"][i]}</span>
              </div>
            ))}
          </div>
        </Card>
        <div className="lg:col-span-2">
          <DataTable
            head={["District", "Total Trips", "Passed", "Reviewed", "Rejected", ""]}
            rows={districts.map(([d, t, p, r, x]) => [
              <b>{d}</b>, t, <span className="text-success">{p}</span>, <span className="text-warning">{r}</span>, <span className="text-destructive">{x}</span>,
              <button aria-label="Download" className="text-info"><Download className="h-4 w-4" /></button>,
            ])}
          />
        </div>
      </div>
    </>
  );
}
