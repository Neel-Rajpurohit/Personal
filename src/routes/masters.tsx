import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Pencil, Plus } from "lucide-react";
import { Badge, DataTable, PageHeader, SearchBox, btn } from "@/components/admin/AdminShell";

export const Route = createFileRoute("/masters")({
  head: () => ({
    meta: [
      { title: "Masters — GrainShield AI" },
      { name: "description", content: "Manage vehicles, godowns, fair price shops and users." },
      { property: "og:title", content: "Masters — GrainShield AI" },
      { property: "og:description", content: "Manage vehicles, godowns, fair price shops and users." },
    ],
  }),
  component: Masters,
});

const data = {
  Vehicles: { head: ["Vehicle No.", "Type", "Transporter", "Capacity", "Status"], rows: [["GJ01AB1234", "Truck", "Patel Logistics", "10 T", "Active"], ["GJ01CD4321", "Truck", "Shree Transport", "12 T", "Active"], ["GJ02KL0321", "Mini Truck", "Jay Ambe Roadways", "5 T", "Blocked"]] },
  Godowns: { head: ["Code", "Name", "Type", "District", "Status"], rows: [["FCI-AHD-01", "FCI Godown Naroda", "FCI", "Ahmedabad", "Active"], ["GSC-AHD-07", "Khudsil Godown", "State", "Ahmedabad", "Active"], ["GSC-AHD-11", "Sanand Godown", "State", "Ahmedabad", "Active"]] },
  "Fair Price Shops": { head: ["FPS No.", "Dealer", "Village / Ward", "Taluka", "Status"], rows: [["FPS-112", "Haresh Modi", "Sanand", "Sanand", "Active"], ["FPS-087", "Meena Patel", "Bavla", "Bavla", "Active"], ["FPS-045", "Jignesh Shah", "Dholka", "Dholka", "Inactive"]] },
  Users: { head: ["Name", "Role", "District", "Mobile", "Status"], rows: [["R. Sharma", "Food Inspector", "Ahmedabad", "98xxxx2110", "Active"], ["K. Mehta", "District Officer", "Ahmedabad", "97xxxx8812", "Active"], ["P. Desai", "Godown Manager", "Gandhinagar", "99xxxx4401", "Active"]] },
};
type Tab = keyof typeof data;

function Masters() {
  const [tab, setTab] = useState<Tab>("Vehicles");
  const d = data[tab];
  return (
    <>
      <PageHeader crumbs={[{ label: "Masters" }, { label: tab }]} title="Master Data" right={<button className={btn.primary}><Plus className="h-4 w-4" />Add {tab.replace(/s$/, "")}</button>} />
      <div className="mb-4 flex flex-wrap gap-2 border-b border-border">
        {(Object.keys(data) as Tab[]).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`-mb-px border-b-2 px-4 py-2 text-sm font-medium ${t === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground"}`}>{t}</button>
        ))}
      </div>
      <div className="mb-4 max-w-md"><SearchBox placeholder={`Search ${tab.toLowerCase()}...`} /></div>
      <DataTable
        head={[...d.head, ""]}
        rows={d.rows.map((r) => [
          <b>{r[0]}</b>, r[1], r[2], r[3],
          <Badge tone={r[4] === "Active" ? "success" : r[4] === "Blocked" ? "danger" : "muted"}>{r[4]}</Badge>,
          <button aria-label="Edit" className="text-info"><Pencil className="h-4 w-4" /></button>,
        ])}
      />
    </>
  );
}
