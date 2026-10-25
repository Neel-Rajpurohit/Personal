import { createFileRoute } from "@tanstack/react-router";
import { LocateFixed, MapPin, Minus, Plus, Search } from "lucide-react";
import { Badge, Card, PageHeader } from "@/components/admin/AdminShell";
import map from "@/assets/map.jpg";
import truck from "@/assets/truck.jpg";

export const Route = createFileRoute("/live-tracking")({
  head: () => ({
    meta: [
      { title: "Live Tracking — GrainShield AI" },
      { name: "description", content: "Follow grain trucks on the map in real time." },
      { property: "og:title", content: "Live Tracking — GrainShield AI" },
      { property: "og:description", content: "Follow grain trucks on the map in real time." },
    ],
  }),
  component: Live,
});

const progress = [
  { n: "FCI Godown (Start)", t: "09:30 AM", s: "done" },
  { n: "Khudsil Godown", t: "10:45 AM", s: "current" },
  { n: "Fair Price Shop (End)", t: "ETA 12:30 PM", s: "next" },
];

function Live() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Live Tracking" }]}
        title="Trip Live Tracking"
        right={
          <div className="flex gap-2">
            <input type="date" defaultValue="2025-10-20" className="h-11 rounded-md border border-input bg-card px-3 text-sm" />
            <input placeholder="Enter Trip ID, Vehicle No..." className="h-11 w-56 rounded-md border border-input bg-card px-3 text-sm" />
            <button aria-label="Search" className="grid h-11 w-11 place-items-center rounded-md bg-info text-primary-foreground"><Search className="h-5 w-5" /></button>
          </div>
        }
      />
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="relative overflow-hidden rounded-lg border border-border shadow-card">
            <img src={map} alt="Route map" width={1024} height={1280} className="h-[560px] w-full object-cover" />
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
              <path d="M38 35 C42 40, 36 45, 42 52 S 40 62, 48 66 S 52 78, 62 84" className="fill-none stroke-info" strokeWidth="0.9" />
            </svg>
            <MapPin className="absolute left-[36%] top-[30%] h-8 w-8 fill-success text-card" />
            <MapPin className="absolute left-[46%] top-[60%] h-9 w-9 fill-info text-card" />
            <MapPin className="absolute left-[60%] top-[79%] h-8 w-8 fill-destructive text-card" />
            <div className="absolute left-[38%] top-[49%] rounded-md bg-navy px-3 py-2 text-sm text-primary-foreground shadow-card">TRIP-1042<br />GJ01AB1234</div>
            <div className="absolute right-3 top-3 flex flex-col overflow-hidden rounded-md border border-border bg-card">
              <button aria-label="Zoom in" className="p-2"><Plus className="h-4 w-4" /></button>
              <button aria-label="Zoom out" className="border-t border-border p-2"><Minus className="h-4 w-4" /></button>
              <button aria-label="Locate" className="border-t border-border p-2"><LocateFixed className="h-4 w-4" /></button>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap justify-around gap-3 rounded-lg border border-border bg-card p-3 text-sm shadow-card">
            <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-success" />Start (FCI Godown)</span>
            <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-info" />Current Location</span>
            <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-destructive" />End (FPS)</span>
          </div>
        </div>
        <div className="space-y-6">
          <Card title="Trip Details">
            <div className="mb-3 flex justify-between"><Badge tone="info">TRIP-1042</Badge><Badge tone="success">● On Route</Badge></div>
            <dl className="grid grid-cols-[130px_1fr] gap-y-2 text-sm">
              <dt className="text-muted-foreground">Vehicle No.</dt><dd>GJ01AB1234</dd>
              <dt className="text-muted-foreground">Driver</dt><dd>Ramesh Patel</dd>
              <dt className="text-muted-foreground">Current Location</dt><dd>Near Sanand</dd>
              <dt className="text-muted-foreground">Last Updated</dt><dd>20 Oct 2025, 11:15 AM</dd>
            </dl>
          </Card>
          <Card title="Route Progress">
            <ol className="relative ml-2 space-y-6 border-l-2 border-info pl-6">
              {progress.map((p) => (
                <li key={p.n} className="relative flex justify-between text-sm">
                  <span className={`absolute -left-[33px] top-0.5 h-4 w-4 rounded-full border-2 ${p.s === "done" ? "border-success bg-success" : p.s === "current" ? "border-info bg-info" : "border-info bg-card"}`} />
                  <span className={p.s === "current" ? "font-medium text-info" : ""}>{p.n}</span>
                  <span className="text-muted-foreground">{p.t}</span>
                </li>
              ))}
            </ol>
          </Card>
          <Card title="Live Feed" action={<button className="text-sm text-info">View All</button>}>
            <div className="flex gap-4">
              <img src={truck} alt="Feed photo" loading="lazy" width={1024} height={768} className="h-20 w-28 rounded-md object-cover" />
              <p className="text-sm">Photo uploaded at Khudsil Godown<br /><span className="text-muted-foreground">10:45 AM</span></p>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
