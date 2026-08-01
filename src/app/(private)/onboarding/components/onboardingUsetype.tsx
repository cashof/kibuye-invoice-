"use client";

import { usertypeSchema, type UserTypeType } from "@/utils/types";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  User,
  Building2,
  ShieldCheck,
  Loader2,
  ArrowRight,
} from "lucide-react";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { userTypeAction } from "./actions";
import { toast } from "@/components/ui/toast";

const USER_TYPES = [
  {
    value: "client",
    icon: User,
    title: "Client",
    description: "Receive invoices and manage your payments.",
  },
  {
    value: "employee",
    icon: Building2,
    title: "Employee",
    description: "Work within an existing company.",
  },
  {
    value: "admin",
    icon: ShieldCheck,
    title: "Admin",
    description: "Create and manage a company, employees, and invoices.",
  },
] as const;

export default function OnboardingUsertype() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UserTypeType>({
    resolver: zodResolver(usertypeSchema),
    defaultValues: {
      usertype: undefined, // ← explicit undefined so Zod catches "required"
    },
  });

  const onSubmit = async (data: UserTypeType) => {
    try {
      await userTypeAction(data);
      toast.add({
        type: "success",
        description: "User type has been submitted.",
      });
      router.push(
        data.usertype === "admin" ? "/onboarding/company" : "/dashboard",
      );
    } catch {
      toast.add({
        type: "error",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <FieldGroup>
        <FieldTitle className="text-2xl">
          How are you planning to use InvoSend?
        </FieldTitle>
        <FieldDescription>
          Choose the role that best describes how you'll use the platform.
        </FieldDescription>

        <Controller
          name="usertype"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <RadioGroup
                value={field.value ?? ""} // ← never undefined, fixes the warning
                onValueChange={field.onChange}
                className="space-y-2"
              >
                {USER_TYPES.map(({ value, icon: Icon, title, description }) => (
                  <FieldLabel key={value} htmlFor={value}>
                    <Field orientation="horizontal">
                      <div className="flex items-center gap-3 w-full">
                        <Icon className="size-5 shrink-0" />
                        <FieldContent>
                          <FieldTitle>{title}</FieldTitle>
                          <FieldDescription>{description}</FieldDescription>
                        </FieldContent>
                      </div>
                      <RadioGroupItem id={value} value={value} />
                    </Field>
                  </FieldLabel>
                ))}
              </RadioGroup>

              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Please wait...
            </>
          ) : (
            <>
              Continue
              <ArrowRight className="ml-2 size-4" />
            </>
          )}
        </Button>
      </FieldGroup>
    </form>
  );
}
