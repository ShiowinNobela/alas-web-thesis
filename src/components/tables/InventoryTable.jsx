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
import { Edit, AlertTriangle, CheckCircle, XCircle, History } from 'lucide-react';

function InventoryTable({ products, onEdit, onToggle, onViewHistory }) {
  return (
    <div className="overflow-x-auto">
      <Table hoverable striped>
        <TableHead>
          <TableRow>
            <TableHeadCell className="table-header">ID</TableHeadCell>
            <TableHeadCell className="table-header">Name</TableHeadCell>
            <TableHeadCell className="table-header">Category</TableHeadCell>
            <TableHeadCell className="table-header">Stock</TableHeadCell>
            <TableHeadCell className="table-header">Price</TableHeadCell>
            <TableHeadCell className="table-header">Status</TableHeadCell>
            <TableHeadCell className="table-header">Last Updated</TableHeadCell>
            <TableHeadCell className="table-header">Actions</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="text-content">
          {products.map((product) => (
            <TableRow key={product.id} className="transition duration-150 ease-in-out hover:bg-gray-50">
              <TableCell className="font-medium">{product.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <img src={product.image} alt={product.name} className="size-8 object-cover" />
                  <span className="font-medium">{product.name}</span>
                </div>
              </TableCell>

              <TableCell>
                <Badge color="gray" className="w-fit">
                  {product.category}
                </Badge>
              </TableCell>
              <TableCell>
                {product.stock_quantity <= 10 ? (
                  <Badge color="failure" icon={AlertTriangle} className="animate-pulse">
                    {product.stock_quantity} (Low)
                  </Badge>
                ) : (
                  product.stock_quantity
                )}
              </TableCell>
              <TableCell className="text-emerald-500">₱{parseFloat(product.price).toFixed(2)}</TableCell>
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
              <TableCell>
                <div className="flex items-center gap-2">
                  {/* History Button */}
                  <Button
                    outline
                    color="light"
                    size="sm"
                    onClick={() => onViewHistory && onViewHistory(product)}
                    title="View Inventory History"
                  >
                    <History className="h-4 w-4" />
                  </Button>

                  {/* Edit Button */}
                  <Button outline color="gray" size="sm" onClick={() => onEdit(product)} title="Edit Product">
                    <Edit className="h-4 w-4" />
                  </Button>

                  {/* Toggle Switch */}
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
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default InventoryTable;
