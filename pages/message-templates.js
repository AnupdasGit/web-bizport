import DashboardPageShell from "../components/dashboard/DashboardPageShell";
import MessageTemplatesCard from "../components/dashboard/MessageTemplatesCard";

export default function MessageTemplatesPage() {
  return (
    <DashboardPageShell
      title="Message Templates"
      description="Review and synchronize your WhatsApp templates."
    >
      <MessageTemplatesCard />
    </DashboardPageShell>
  );
}
