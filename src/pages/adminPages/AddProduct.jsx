import { useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'sonner';
import BackButton from '@/components/bigComponents/BackButton.jsx';

function AddProduct() {
  return (
    <>
      <div className="bg-admin flex flex-col overflow-x-auto p-4">
        <main className="bg-card mx-auto w-full overflow-x-auto rounded-xl border shadow ring-1">
          <div className="flex w-full items-center justify-between pt-5">
            <BackButton />
          </div>
        </main>
      </div>

      <Toaster richColors />
    </>
  );
}

export default AddProduct;
