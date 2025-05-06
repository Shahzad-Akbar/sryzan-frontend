import { OrderStatus } from "@/types/order";

function StatusBadge({ status }: { status: OrderStatus }) {
  const statusConfig = {
    pending: { color: 'bg-blue-100 text-blue-800', label: 'Pending' },
    preparing: { color: 'bg-yellow-100 text-yellow-800', label: 'Preparing' },
    ready: { color: 'bg-green-100 text-green-800', label: 'Ready for Pickup' },
    delivered: { color: 'bg-secondary-1 bg-opacity-10 text-secondary-1', label: 'Delivered' },
    cancelled: { color: 'bg-red-100 text-red-800', label: 'Cancelled' },
  };

  const config = statusConfig[status];

  return (
    <span className={`${config.color} text-xs font-medium px-2.5 py-0.5 rounded-full`}>
      {config.label}
    </span>
  );
}

export default StatusBadge;