import Link from "next/link";
import { buttonVariants } from "./components/ui/button";

export default function Home() {
  return (
    <main className='flex p-10 gap-5 bg-background'>
      <Link href='/login' className={buttonVariants({ variant: "default" })}>Login</Link>
      <Link href='/register' className={buttonVariants({ variant: "default" })}>Register</Link>
    </main>
  );
}
