import React from 'react'
import OnboardingCompanyInfo from "../components/onboardingCompanyInfo";

export default function page() {
  return (
    <div className="flex md:min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <OnboardingCompanyInfo />
      </div>
    </div>
  );
}
