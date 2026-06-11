import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button"

async function logOut() {
  'use server';

  await signOut({ redirectTo: '/' });
}

export default async function Dashboard() {
  const session = await auth();

  return (
    <main className='m-16 flex flex-col items-center gap-6'>
      <p className='text-2xl'>Hi, {session?.user?.name}!</p>
      <Button onClick={logOut} variant='default' size='lg'>Logout</Button>
    </main>
  );
}
