import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, CheckCircle2, Truck, XCircle } from "lucide-react";
import { Badge, Card, DataTable, PageHeader } from "@/components/admin/AdminShell";
import { auditLogs, reviewQueue } from "@/lib/admin-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — GrainShield AI" },
      { name: "description", content: "Today's trips, AI verification results and pending reviews." },
      { property: "og:title", content: "Dashboard — GrainShield AI" },
      { property: "og:description", content: "Today's trips, AI verification results and pending reviews." },
    ],
  }),
  component: Dashboard,
});

const kpis = [
  { label: "Active Trips", value: 148, icon: Truck, tone: "text-info bg-info-soft" },
  { label: "AI Passed", value: 1204, icon: CheckCircle2, tone: "text-success bg-success-soft" },
  { label: "Pending Review", value: 32, icon: AlertTriangle, tone: "text-warning bg-warning-soft" },
  { label: "Rejected", value: 17, icon: XCircle, tone: "text-destructive bg-danger-soft" },
];
const stages = [
  { name: "First Mile", pass: 92 },
  { name: "Middle Mile", pass: 87 },
  { name: "Last Mile", pass: 79 },
];

function Dashboard() {
  return (
    <>
      <PageHeader crumbs={[{ label: "Dashboard" }]} title="Dashboard" subtitle="District Ahmedabad · 20 Oct 2025" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="flex items-center gap-4 rounded-lg border border-border bg-card p-5 shadow-card">
            <div className={`grid h-12 w-12 place-items-center rounded-full ${k.tone}`}><k.icon className="h-6 w-6" /></div>
            <div>
              <div className="text-2xl font-bold text-navy">{k.value.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">{k.label}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card title="AI Pass Rate by Stage">
          <div className="space-y-5">
            {stages.map((s) => (
              <div key={s.name}>
                <div className="mb-1 flex justify-between text-sm"><span>{s.name}</span><span className="font-semibold">{s.pass}%</span></div>
                <div className="h-2.5 rounded-full bg-muted"><div className="h-full rounded-full bg-success" style={{ width: `${s.pass}%` }} /></div>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Pending Reviews" className="lg:col-span-2" action={<Link to="/verification" className="text-sm text-info">View all</Link>}>
          <DataTable
            head={["Trip ID", "Vehicle", "Issue", "Priority"]}
            rows={reviewQueue.slice(0, 4).map((r) => [
              r.id, r.vehicle, r.issue,
              <Badge tone={r.priority === "High" ? "danger" : "warning"}>{r.priority}</Badge>,
            ])}
          />
        </Card>
      </div>
      <div className="mt-6">
        <Card title="Recent Activity" action={<Link to="/audit-logs" className="text-sm text-info">Audit logs</Link>}>
          <ul className="divide-y divide-border">
            {auditLogs.map((l) => (
              <li key={l.time} className="flex flex-wrap justify-between gap-2 py-3 text-sm">
                <span><b>{l.trip}</b> — {l.action} by {l.by}</span>
                <span className="text-muted-foreground">{l.time}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
