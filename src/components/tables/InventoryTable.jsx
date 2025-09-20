import {
  Badge,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  ToggleSwitch,
} from 'flowbite-react';
import { Edit, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

function InventoryTable({ products, onEdit, onToggle }) {
  return (
    <div className="overflow-x-auto">
      <Table hoverable striped>
        <TableHead className="uppercase">
          <TableRow>
            <TableHeadCell>ID</TableHeadCell>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Category</TableHeadCell>
            <TableHeadCell>Stock</TableHeadCell>
            <TableHeadCell>Price</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell>Last Updated</TableHeadCell>
            <TableHeadCell>Actions</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="text-content">
          {products.map((product) => (
            <TableRow key={product.id} className="transition duration-150 ease-in-out hover:bg-gray-50">
              <TableCell className="font-medium">{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>
                <Badge color="gray" className="w-fit">
                  {product.category}
                </Badge>
              </TableCell>
              <TableCell>
                {product.stock_quantity <= 10 ? (
                  <Badge color="failure" icon={AlertTriangle}>
                    {product.stock_quantity} (Low)
                  </Badge>
                ) : (
                  product.stock_quantity
                )}
              </TableCell>
              <TableCell>₱{parseFloat(product.price).toFixed(2)}</TableCell>
              <TableCell>
                <Badge
                  color={product.is_active ? 'success' : 'failure'}
                  icon={product.is_active ? CheckCircle : XCircle}
                  className="flex items-center justify-center gap-1 px-3"
                >
                  {product.is_active ? 'Active' : 'Inactive'}
                </Badge>
              </TableCell>
              <TableCell className="text-sm">{new Date(product.updated_at).toLocaleString()}</TableCell>
              <TableCell className="flex items-center gap-2">
                <Button outline color="gray" size="sm" onClick={() => onEdit(product)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <ToggleSwitch
                  checked={product.is_active}
                  label=""
                  onChange={() =>
                    onToggle({
                      id: product.id,
                      newStatus: !product.is_active,
                    })
                  }
                  color={product.is_active ? 'success' : 'failure'}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default InventoryTable;
