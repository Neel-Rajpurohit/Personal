export const trips = [
  { id: "TRIP-1042", vehicle: "GJ01AB1234", driver: "Ramesh Patel", stage: "First Mile", from: "FCI Godown", to: "Fair Price Shop #112", status: "On Route" },
  { id: "TRIP-1036", vehicle: "GJ01XY5521", driver: "Suresh Desai", stage: "Middle Mile", from: "FCI Godown", to: "Khudsil Godown", status: "Rejected" },
  { id: "TRIP-1035", vehicle: "GJ05MN2210", driver: "Mahesh Shah", stage: "Last Mile", from: "Khudsil Godown", to: "FPS #87", status: "Completed" },
  { id: "TRIP-1025", vehicle: "GJ01AB6789", driver: "Kiran Joshi", stage: "Last Mile", from: "Sanand Godown", to: "FPS #45", status: "Review" },
  { id: "TRIP-1021", vehicle: "GJ01CD4321", driver: "Vijay Rathod", stage: "Middle Mile", from: "FCI Godown", to: "Bavla Godown", status: "Review" },
  { id: "TRIP-1020", vehicle: "GJ01EF8765", driver: "Anil Parmar", stage: "First Mile", from: "FCI Godown", to: "Dholka Godown", status: "On Route" },
  { id: "TRIP-1002", vehicle: "GJ03OP4312", driver: "Nilesh Vora", stage: "Middle Mile", from: "FCI Godown", to: "Viramgam Godown", status: "Completed" },
];

export const reviewQueue = [
  { id: "TRIP-1025", vehicle: "GJ01AB6789", stage: "Last Mile", issue: "Missing FPS Receipt", priority: "High" },
  { id: "TRIP-1021", vehicle: "GJ01CD4321", stage: "Middle Mile", issue: "Number mismatch", priority: "High" },
  { id: "TRIP-1020", vehicle: "GJ01EF8765", stage: "First Mile", issue: "Blurry Image", priority: "Medium" },
  { id: "TRIP-1011", vehicle: "GJ02KL0321", stage: "Last Mile", issue: "Vehicle-Type Mismatch", priority: "High" },
  { id: "TRIP-1017", vehicle: "GJ03OP4312", stage: "Middle Mile", issue: "Unclear Image", priority: "Medium" },
];

export const auditLogs = [
  { time: "20 Oct 2025, 11:20 AM", trip: "TRIP-1042", action: "System Pass", by: "AI System", remarks: "—" },
  { time: "20 Oct 2025, 11:07 AM", trip: "TRIP-1035", action: "Manual Pass", by: "Officer", remarks: "Approved with manual pass" },
  { time: "20 Oct 2025, 10:55 AM", trip: "TRIP-1036", action: "System Reject", by: "AI System", remarks: "Plate mismatch" },
  { time: "20 Oct 2025, 10:48 AM", trip: "TRIP-1025", action: "Manual Pass", by: "Officer", remarks: "Approved with manual pass" },
  { time: "19 Oct 2025, 06:15 PM", trip: "TRIP-1002", action: "System Pass", by: "AI System", remarks: "—" },
];
