'use server';

import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { signIn } from "@/auth";

export async function registerUser(
  prevData: { success: boolean, userId?: string } | undefined,
  formData: FormData
) {
  const email = formData.get('email') as string;
  const name = formData.get('name') as string;
  const password = formData.get('password') as string;
  const passwordConfirmation = formData.get('password-confirmation') as string;

  if (password !== passwordConfirmation) {
    throw new Error('Passwords do not match');
  }

  if (!email || !password) {
    throw new Error('Missing required form data.');
  }

  const uniquenessChecks = [
    prisma.user.findUnique({ where: { email } }),
    prisma.user.findUnique({ where: { name } }),
  ];

  const [existingEmail, existingName] = await Promise.all(uniquenessChecks);
  if (existingEmail) { throw new Error('An account with this email already exists.'); }
  if (existingName) { throw new Error('An account with this email already exists.'); }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  await signIn('credentials', {
    email, password, redirectTo: '/dashboard',
  });

  if (newUser) {
    return { success: true, userId: newUser.id };
  } else {
    return { success: false };
  }
}