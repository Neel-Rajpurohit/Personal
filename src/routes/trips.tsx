import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { Badge, DataTable, PageHeader, Pagination, SearchBox, Select, btn } from "@/components/admin/AdminShell";
import { trips } from "@/lib/admin-data";

export const Route = createFileRoute("/trips")({
  head: () => ({
    meta: [
      { title: "Trips — GrainShield AI" },
      { name: "description", content: "All food grain transport trips with stage and status." },
      { property: "og:title", content: "Trips — GrainShield AI" },
      { property: "og:description", content: "All food grain transport trips with stage and status." },
    ],
  }),
  component: Trips,
});

const tone = (s: string) => (s === "Completed" ? "success" : s === "Rejected" ? "danger" : s === "Review" ? "warning" : "info") as "success";

function Trips() {
  return (
    <>
      <PageHeader crumbs={[{ label: "Trips" }]} title="All Trips" subtitle="Every grain movement across the district" right={<button className={btn.primary}><Plus className="h-4 w-4" />Create Trip</button>} />
      <div className="mb-4 grid gap-3 md:grid-cols-4">
        <Select options={["All Stages", "First Mile", "Middle Mile", "Last Mile"]} />
        <Select options={["All Status", "On Route", "Completed", "Review", "Rejected"]} />
        <div className="md:col-span-2"><SearchBox placeholder="Search Trip ID / Vehicle No." /></div>
      </div>
      <DataTable
        head={["Trip ID", "Vehicle No.", "Driver", "Stage", "Route", "Status", ""]}
        rows={trips.map((t) => [
          <b>{t.id}</b>, t.vehicle, t.driver, t.stage, `${t.from} → ${t.to}`,
          <Badge tone={tone(t.status)}>{t.status}</Badge>,
          <Link to="/verification/$tripId" params={{ tripId: t.id }} className="text-info hover:underline">View</Link>,
        ])}
      />
      <Pagination last={12} />
    </>
  );
}
