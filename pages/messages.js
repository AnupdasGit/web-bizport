import DashboardPageShell from "../components/dashboard/DashboardPageShell";
import MessagesLogCard from "../components/dashboard/MessagesLogCard";

export default function MessagesPage() {
  return (
    <DashboardPageShell
      title="Outgoing Messages"
      description="Track delivery status and export message history."
    >
      <MessagesLogCard />
    </DashboardPageShell>
  );
}
