import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Car, Check, CheckCircle2, MapPin, Maximize2, ScanLine, Truck, XCircle, RotateCcw } from "lucide-react";
import { Card, PageHeader, btn } from "@/components/admin/AdminShell";
import truck from "@/assets/truck.jpg";

export const Route = createFileRoute("/verification/$tripId")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.tripId} Verification — GrainShield AI` },
      { name: "description", content: `AI photo verification results for ${params.tripId}.` },
      { property: "og:title", content: `${params.tripId} Verification — GrainShield AI` },
      { property: "og:description", content: `AI photo verification results for ${params.tripId}.` },
    ],
  }),
  component: Detail,
});

const checks = [
  ["Image Quality", "Clear"],
  ["Vehicle Detection", "Detected"],
  ["Number Plate OCR", "GJ01AB1234 (Match)"],
  ["Vehicle Type", "Truck (Match)"],
  ["Required Evidence", "Vehicle + Plate Visible"],
];

function Detail() {
  const { tripId } = Route.useParams();
  const summary = [
    ["Trip ID", tripId, ScanLine],
    ["Vehicle No.", "GJ01AB1234", Car],
    ["Stage", "First Mile", Truck],
    ["Date & Time", "20 Oct 2025, 10:15 AM", Calendar],
    ["District", "Ahmedabad", MapPin],
  ] as const;
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Trip Verification", to: "/verification" }, { label: tripId }]}
        title="Trip Verification Details"
        right={<div className="text-right text-sm"><span className="mb-2 inline-block rounded-md bg-warning-soft px-3 py-1 font-semibold text-warning">In Progress</span><div>Last updated: 20 Oct 2025, 11:24 AM</div></div>}
      />
      <div className="mb-6 grid grid-cols-2 gap-4 rounded-lg border border-border bg-card p-5 shadow-card md:grid-cols-5">
        {summary.map(([l, v, I]) => (
          <div key={l} className="flex items-start gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-info-soft text-navy"><I className="h-5 w-5" /></div>
            <div><div className="text-sm text-muted-foreground">{l}</div><div className="font-medium">{v}</div></div>
          </div>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card title="Uploaded Photo & AI Results" className="lg:col-span-2">
          <div className="grid gap-5 md:grid-cols-[260px_1fr]">
            <div className="space-y-3">
              <img src={truck} alt="Uploaded truck photo" width={1024} height={768} className="aspect-[4/5] w-full rounded-md object-cover" />
              <button className={`${btn.outline} w-full justify-center`}><Maximize2 className="h-4 w-4" />View Full Image</button>
              <button className="flex items-center gap-1 text-sm text-info"><MapPin className="h-4 w-4" />View Location on Map</button>
            </div>
            <div>
              <ul className="divide-y divide-border">
                {checks.map(([k, v]) => (
                  <li key={k} className="flex items-center gap-3 py-3">
                    <CheckCircle2 className="h-6 w-6 text-success" />
                    <span className="w-40">{k}</span>
                    <span className="flex-1 font-medium text-success">{v}</span>
                    <Check className="h-4 w-4 text-success" />
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center gap-4 rounded-md border-l-4 border-success bg-success-soft p-4">
                <CheckCircle2 className="h-9 w-9 text-success" />
                <div><div className="text-xl font-bold text-success">PASS</div><div className="text-sm">All checks passed successfully. Photo is verified.</div></div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <button className={btn.primary}><Check className="h-4 w-4" />Approve</button>
                <button className={btn.outline}><RotateCcw className="h-4 w-4" />Request Retake</button>
                <button className="inline-flex items-center gap-2 rounded-md bg-danger-soft px-4 py-2 text-sm font-medium text-destructive"><XCircle className="h-4 w-4" />Reject</button>
              </div>
            </div>
          </div>
        </Card>
        <Card title="Trip Information">
          <ul className="divide-y divide-border">
            {[["Assigned Vehicle", "GJ01AB1234"], ["Vehicle Type", "Truck"], ["Trip Stage", "First Mile"], ["Expected Evidence", "Vehicle + Plate"]].map(([k, v]) => (
              <li key={k} className="py-3"><div className="text-sm text-muted-foreground">{k}</div><div className="font-medium">{v}</div></li>
            ))}
          </ul>
          <Link to="/live-tracking" className={`${btn.outline} mt-4 w-full justify-center`}>View Trip Route <ArrowRight className="h-4 w-4" /></Link>
        </Card>
      </div>
    </>
  );
}
