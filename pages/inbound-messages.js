import DashboardPageShell from "../components/dashboard/DashboardPageShell";
import MessagesLogCard from "../components/dashboard/MessagesLogCard";

export default function InboundMessagesPage() {
  return (
    <DashboardPageShell
      title="Incoming Messages"
      description="Review messages received by your WhatsApp number."
    >
      <MessagesLogCard direction="inbound" />
    </DashboardPageShell>
  );
}
