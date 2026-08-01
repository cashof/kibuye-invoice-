"use client";

import { onboardingcompanySchema, onboardingcompanyType } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { onboardingCompanyAction } from "./actions";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

export default function OnboardingCompanyInfo() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<onboardingcompanyType>({
    resolver: zodResolver(onboardingcompanySchema),
    defaultValues: {
      name: "",
      description: "",
      telephoneNumber: "",
      location: "",
      logo: "",
      POBox: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: onboardingcompanyType) => {
    try {
      await onboardingCompanyAction(data);
      toast.add({ type: "success", description: "Company has been created!" });
      router.push("/dashboard");
    } catch (err) {
      toast.add({
        type: "error",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <FieldSet className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        {/* Header */}
        <div>
          <FieldTitle className="text-2xl">Create Your Company</FieldTitle>
          <FieldDescription>
            Information provided should relate to your company.
          </FieldDescription>
        </div>

        <FieldSeparator />

        <FieldGroup className="gap-3">
          {/* Company Name */}
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Company Name</FieldLabel>
                <Input
                  {...field}
                  placeholder="invosend Ltd."
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Description */}
          <Controller
            name="description"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Description</FieldLabel>
                <Textarea
                  {...field}
                  placeholder="What does your company do?"
                  aria-invalid={fieldState.invalid}
                  rows={2}
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Telephone */}
          <Controller
            name="telephoneNumber"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Telephone Number</FieldLabel>
                <Input
                  {...field}
                  type="tel"
                  placeholder="+256 700 123 456"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Location + PO Box */}
          <div className="grid grid-cols-2 gap-3">
            <Controller
              name="location"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Location</FieldLabel>
                  <Input
                    {...field}
                    placeholder="Kampala, Uganda"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="POBox"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>P.O. Box</FieldLabel>
                  <Input
                    {...field}
                    placeholder="P.O. Box 1234"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* Logo URL */}
          <Controller
            name="logo"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>
                  Logo URL
                  <span className="text-muted-foreground font-normal">
                    (Optional)
                  </span>
                </FieldLabel>
                <Input
                  {...field}
                  placeholder="https://invosend.com/logo.png"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <Spinner /> : "Continue"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </FieldSet>
  );
}
