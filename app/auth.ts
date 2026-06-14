import NextAuth from 'next-auth';
import { authConfig } from '../auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import type { UserModel } from '@/generated/prisma/models';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import Google from 'next-auth/providers/google';

async function getUser(email: string): Promise<UserModel | undefined> {
  try {
    return await prisma.user.findUniqueOrThrow({ where: { email } });
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.email(), password: z.string().min(6) })
          .safeParse(credentials);
        
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);

          if (!user) { return null; }

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) { return user; }
        }

        return null;
      }
    }),
    Google({ clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET }),
  ],
});
