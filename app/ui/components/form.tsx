import { FieldGroup } from '@/components/ui/field';
import { ReactNode } from 'react';

interface FormProps {
  action: string | ((formData: FormData) => void | Promise<void>) | undefined;
  children: ReactNode
}

export default function Form({ action, children}: FormProps) {
  return (
    <div className='flex flex-col items-center text-center sm:text-left'>
      <form action={action}>
        <FieldGroup className='w-62.5 p-6 m-6'>
          {children}
        </FieldGroup>
      </form>
    </div>
  );
}