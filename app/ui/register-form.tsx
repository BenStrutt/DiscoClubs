'use client';

import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import { registerUser } from '@/lib/actions/register';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Form from '@/ui/components/form';

export default function RegisterForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [result, formAction, isPending] = useActionState(
    registerUser,
    undefined,
  );

  return (
    <Form action={formAction}>
      <Field>
        <FieldLabel htmlFor='email'>Email</FieldLabel>
        <Input
          id='email'
          type='email'
          name='email'
          required
        />
      </Field>
      <Field>
        <FieldLabel htmlFor='name'>Username</FieldLabel>
        <Input 
          id='name'
          type='text'
          name='name'
          required
        />
      </Field>
      <Field>
        <FieldLabel htmlFor='password'>Password</FieldLabel>
        <Input 
          id='password'
          type='password'
          name='password'
          required
        />
      </Field>
      <Field>
        <FieldLabel htmlFor='confirm-password'>Confirm Password</FieldLabel>
        <Input 
          id='password-confirmation'
          type='password'
          name='password-confirmation'
          required
        />
      </Field>
      <input type="hidden" name="redirectTo" value={callbackUrl} />
      <Button type='submit' aria-disabled={isPending}>Sign Up</Button>
      {result && !result.success && (
        <p>Error registering</p>
      )}
    </Form>
  );
}