import { Suspense } from "react";
import RegisterForm from "../ui/register-form";

export default function RegisterPage() {
  return (
    <main>
      <Suspense>
        <RegisterForm />
      </Suspense>
    </main>
  );
}