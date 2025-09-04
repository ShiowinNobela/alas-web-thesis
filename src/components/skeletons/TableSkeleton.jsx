import { Skeleton } from '@/components/ui/skeleton.jsx';

function TableSkeleton({ columns = 5, rows = 8 }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            {[...Array(columns)].map((_, idx) => (
              <th key={idx} className="px-4 py-2">
                <Skeleton className="w-24 h-4" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(rows)].map((_, rowIdx) => (
            <tr key={rowIdx} className="border-b">
              {[...Array(columns)].map((_, colIdx) => (
                <td key={colIdx} className="px-4 py-3">
                  <Skeleton className="w-full h-4" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableSkeleton;