"use client";

import { usertypeSchema, type UserTypeType } from "@/utils/types";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { User, Building2, ShieldCheck, Loader2, ArrowRight } from "lucide-react";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { userTypeAction } from "./actions";
import { toast } from "@/components/ui/toast";
import { success } from "zod";

export default function OnboardingUsertype() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserTypeType>({
    resolver: zodResolver(usertypeSchema),
    defaultValues: {
      usertype: "client",
    },
  });

  const onSubmit = async (data: UserTypeType) => {

    const usertypeaction = await userTypeAction(data);
    if (usertypeaction!){
      toast.add({
        type: "success",
        description: " User type submited successfuly"
      })
    }
      if (data.usertype === "admin") {
        router.push("/onboarding/company");
        return;
      }

    router.push("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FieldGroup>
        <FieldTitle className="text-2xl">How are you planning to use InvoSend?</FieldTitle>

        <FieldDescription>
          Choose the role that best describes how you'll use the platform.
        </FieldDescription>

        <FieldContent>
          <Controller
            name="usertype"
            control={control}
            render={({ field }) => (
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="space-y-3"
              >
                <FieldLabel htmlFor="client">
                  <Field orientation="horizontal">
                    <div className="flex items-center gap-3 w-full">
                      <User className="size-5" />

                      <FieldContent>
                        <FieldTitle>Client</FieldTitle>
                        <FieldDescription>
                          Receive invoices and manage your payments.
                        </FieldDescription>
                      </FieldContent>
                    </div>

                    <RadioGroupItem id="client" value="client" />
                  </Field>
                </FieldLabel>

                <FieldLabel htmlFor="employee">
                  <Field orientation="horizontal">
                    <div className="flex items-center gap-3 w-full">
                      <Building2 className="size-5 " />

                      <FieldContent>
                        <FieldTitle>Employee</FieldTitle>
                        <FieldDescription>
                          Work within an existing company.
                        </FieldDescription>
                      </FieldContent>
                    </div>

                    <RadioGroupItem id="employee" value="employee" />
                  </Field>
                </FieldLabel>

                <FieldLabel htmlFor="admin">
                  <Field orientation="horizontal">
                    <div className="flex items-center gap-3 w-full">
                      <ShieldCheck className="size-5 " />

                      <FieldContent>
                        <FieldTitle>Admin</FieldTitle>
                        <FieldDescription>
                          Create and manage a company, employees, and invoices.
                        </FieldDescription>
                      </FieldContent>
                    </div>

                    <RadioGroupItem id="admin" value="admin" />
                  </Field>
                </FieldLabel>
              </RadioGroup>
            )}
          />

          {errors.usertype && (
            <p className="mt-2 text-sm text-destructive">
              {errors.usertype.message}
            </p>
          )}
        </FieldContent>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Please wait...
            </>
          ) : (
            <p className="flex flex-row gap-3 items-center justify-center">
              Continue
              <ArrowRight />
            </p>
          )}
        </Button>
      </FieldGroup>
    </form>
  );
}
