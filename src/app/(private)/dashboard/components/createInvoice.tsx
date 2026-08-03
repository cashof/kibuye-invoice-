"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { invoiceSchema, invoiceType } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Domain } from "domain";
import { Plus } from "lucide-react";
import { Days_One } from "next/font/google";
import React from "react";
import { Controller, useForm } from "react-hook-form";

export default function CreateInvoice() {
  const statuses = [
    { label: "Draft", value: "draft" },
    { label: "cancelled", value: "cancelled" },
    { label: "Paid", value: "paid" },
    { label: "Sent", value: "sent" },
  ] as const;

  const form = useForm<invoiceType>({
    mode: "onBlur",
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      due_date: "",
      invoiceNumber: 0,
      items: [
        {
          name: "",
          price: 0,
          quantity: 1,
        },
      ],
      status: "draft",
      totalAmount: 0,
      invoiceDescription: "",
    },
  });
  return (
    <div>
      <Dialog>
        <DialogTrigger
          render={
            <Button>
              New Invoice <Plus size={14} />
            </Button>
          }
        />
        <DialogContent className={""}>
          <DialogHeader>
            <DialogTitle>Create new invoice</DialogTitle>
            <DialogDescription>
              invoice created in this form will be reflected on the dashboard
            </DialogDescription>
          </DialogHeader>
          <Separator className={"my-2"} />
          <div className="">
            <form action="">
              <FieldGroup className="gap-3">
                <Controller
                  name="invoiceNumber"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Invoice Number</FieldLabel>
                      <Input
                        {...field}
                        placeholder="123"
                        aria-invalid={fieldState.invalid}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="invoiceDescription"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Description (optional)</FieldLabel>
                      <Input
                        {...field}
                        placeholder="from invoSend ltd"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Separator className={"my-2"} />

                <Controller
                  name="status"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="w-full max-w-1/2"
                    >
                      <FieldLabel>Invoice Status</FieldLabel>
                      <Select
                        items={statuses}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger aria-invalid={fieldState.invalid}>
                          <SelectValue placeholder="Invoice Satuts" />
                        </SelectTrigger>
                        <SelectContent alignItemWithTrigger>
                          {statuses.map((statusItem) => (
                            <SelectItem
                              key={statusItem.value}
                              value={statusItem.value}
                            >
                              {statusItem.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                  )}
                />

                <Controller
                  name="due_date"
                  control={form.control}
                  render={({ field, fieldState }) => {}}
                />
              </FieldGroup>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
