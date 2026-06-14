'use client';

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authenticate } from "@/lib/actions/authenticate";
import { useActionState } from "react";
import Form from "./components/form";

export default function LoginForm() {
  const [result, formAction, isPending] = useActionState(
    authenticate,
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
            placeholder='Enter your email address'
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor='password'>Password</FieldLabel>
          <Input
            id='password'
            type='password'
            name='password'
            placeholder='Enter your password'
            required
            minLength={6}
          />
        </Field>
        <Button type='submit' aria-disabled={isPending}>Sign In</Button>
        {result && (
          <p className='text-red-500'>{result}</p>
        )}
      </Form>
  );
}
