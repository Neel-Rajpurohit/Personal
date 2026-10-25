import { createFileRoute, Link } from "@tanstack/react-router";
import { SlidersHorizontal } from "lucide-react";
import { DataTable, PageHeader, Pagination, SearchBox, Select, btn } from "@/components/admin/AdminShell";
import { reviewQueue } from "@/lib/admin-data";

export const Route = createFileRoute("/verification/")({
  head: () => ({
    meta: [
      { title: "Manual Review Queue — GrainShield AI" },
      { name: "description", content: "Trips flagged by AI that need officer review." },
      { property: "og:title", content: "Manual Review Queue — GrainShield AI" },
      { property: "og:description", content: "Trips flagged by AI that need officer review." },
    ],
  }),
  component: Queue,
});

function Queue() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Manual Review" }]}
        title="Manual Review Queue"
        right={<span className="rounded-md bg-secondary px-3 py-1.5 font-semibold text-secondary-foreground">32 In Queue</span>}
      />
      <div className="mb-4 grid gap-3 md:grid-cols-3">
        <Select options={["All Stages", "First Mile", "Middle Mile", "Last Mile"]} />
        <Select options={["All Status", "Pending", "Retake requested"]} />
        <input type="date" defaultValue="2025-10-20" className="h-11 rounded-md border border-input bg-card px-3 text-sm" />
      </div>
      <div className="mb-5 flex gap-3">
        <SearchBox placeholder="Search Trip ID / Vehicle No." />
        <button className={btn.outline}><SlidersHorizontal className="h-4 w-4" />Filters</button>
      </div>
      <DataTable
        head={["Trip ID", "Vehicle No.", "Stage", "Issue", "Priority", "Action"]}
        rows={reviewQueue.map((r) => [
          r.id, r.vehicle, r.stage,
          <span className={r.priority === "High" ? "text-destructive" : "text-muted-foreground"}>{r.issue}</span>,
          <span className={`font-semibold ${r.priority === "High" ? "text-destructive" : "text-warning"}`}>{r.priority}</span>,
          <Link to="/verification/$tripId" params={{ tripId: r.id }} className={btn.review}>Review</Link>,
        ])}
      />
      <Pagination last={8} />
    </>
  );
}
