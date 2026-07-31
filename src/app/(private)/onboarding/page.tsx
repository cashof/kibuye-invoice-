import { headers } from "next/headers";
import { redirect } from "next/navigation";

import OnboardingUsetype from "./components/onboardingUsetype";
import { auth } from "@/lib/auth";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <OnboardingUsetype />
      </div>
    </div>
  );
}
