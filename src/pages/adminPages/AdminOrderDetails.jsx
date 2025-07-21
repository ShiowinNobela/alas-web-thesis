import { useParams } from 'react-router-dom';

function AdminOrderDetails() {
  const { id } = useParams();
  return (
    <div className="mx-auto mt-10 max-w-xl space-y-4 rounded-md bg-white p-6 shadow">
      <h1 className="text-2xl font-bold">Order Details</h1>

      <div>
        <p>
          <span className="font-semibold">Order ID:</span> ORD123456
        </p>
        <p>
          <span className="font-semibold">Status:</span> Pending
        </p>
        <p>
          <span className="font-semibold">Date:</span> July 19, 2025
        </p>
      </div>

      <div>
        <h2 className="mt-4 text-lg font-semibold">Customer</h2>
        <p>Name: Juan Dela Cruz</p>
        <p>Email: juan@example.com</p>
        <p>Address: 123 Mabuhay St, QC</p>
      </div>

      <div>
        <h2 className="mt-4 text-lg font-semibold">Items</h2>
        <ul className="list-inside list-disc space-y-1">
          <li>Spicy Garlic Sauce x2 - ₱300</li>
          <li>Sweet Chili Sauce x1 - ₱120</li>
        </ul>
      </div>

      <div className="text-right text-xl font-bold">Total: ₱420</div>
    </div>
  );
}

export default AdminOrderDetails;
