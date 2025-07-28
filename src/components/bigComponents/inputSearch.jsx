import { useId, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowRightIcon, SearchIcon, XIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function InputSearch() {
  const id = useId();
  const [searchParams, setSearchParams] = useSearchParams();
  const submittedOrderId = searchParams.get('order_id') || '';
  const [value, setValue] = useState(submittedOrderId);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    const trimmed = value.trim();

    if (trimmed) {
      newParams.set('order_id', trimmed);
      newParams.delete('status');
      newParams.delete('payment_method');
    } else {
      newParams.delete('order_id');
    }

    setSearchParams(newParams, { replace: true });
  };

  const handleClear = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('order_id');
    setSearchParams(newParams, { replace: true });
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="relative">
        <Input
          id={id}
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="e.g. ALAS12345"
          className="peer ps-9 pe-9 text-sm"
        />

        {/* Left Icon */}
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3 peer-disabled:opacity-50">
          <SearchIcon size={16} />
        </div>

        {/* Right Button: show X only if searchParam is present */}
        {submittedOrderId ? (
          <button
            type="button"
            onClick={handleClear}
            className="text-muted-foreground/80 hover:text-foreground focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition outline-none focus:z-10 focus-visible:ring-[3px]"
          >
            <XIcon size={16} aria-hidden="true" />
          </button>
        ) : (
          <button
            type="submit"
            aria-label="Submit search"
            className="text-muted-foreground/80 hover:text-foreground focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition outline-none focus:z-10 focus-visible:ring-[3px]"
          >
            <ArrowRightIcon size={16} aria-hidden="true" />
          </button>
        )}
      </div>
    </form>
  );
}
