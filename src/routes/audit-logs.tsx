import { createFileRoute } from "@tanstack/react-router";
import { Badge, DataTable, PageHeader, Pagination, SearchBox, Select } from "@/components/admin/AdminShell";
import { auditLogs } from "@/lib/admin-data";

export const Route = createFileRoute("/audit-logs")({
  head: () => ({
    meta: [
      { title: "Audit Logs — GrainShield AI" },
      { name: "description", content: "History of all actions performed by users and the AI system." },
      { property: "og:title", content: "Audit Logs — GrainShield AI" },
      { property: "og:description", content: "History of all actions performed by users and the AI system." },
    ],
  }),
  component: Logs,
});

const tone = (a: string) => (a === "System Pass" ? "success" : a === "System Reject" ? "danger" : "warning") as "success";

function Logs() {
  return (
    <>
      <PageHeader crumbs={[{ label: "Audit Logs" }]} title="Audit Logs" subtitle="History of all actions performed by users and system" />
      <div className="mb-4 grid gap-3 md:grid-cols-2">
        <label className="rounded-lg border border-border bg-card p-4 shadow-card">
          <span className="mb-2 block text-sm font-medium">Date Range</span>
          <div className="flex gap-2">
            <input type="date" defaultValue="2025-10-20" className="h-11 flex-1 rounded-md border border-input px-3 text-sm" />
            <input type="date" defaultValue="2025-10-20" className="h-11 flex-1 rounded-md border border-input px-3 text-sm" />
          </div>
        </label>
        <label className="rounded-lg border border-border bg-card p-4 shadow-card">
          <span className="mb-2 block text-sm font-medium">Action Type</span>
          <Select options={["All Actions", "System Pass", "System Reject", "Manual Pass"]} />
        </label>
      </div>
      <div className="mb-5"><SearchBox placeholder="Search by Trip ID, Vehicle No." /></div>
      <DataTable
        head={["Date & Time", "Trip ID", "Action", "Performed By", "Remarks"]}
        rows={auditLogs.map((l) => [l.time, l.trip, <Badge tone={tone(l.action)}>{l.action}</Badge>, l.by, l.remarks])}
      />
      <Pagination last={5} />
    </>
  );
}
