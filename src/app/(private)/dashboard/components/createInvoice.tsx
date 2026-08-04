"use client";

import * as React from "react";

import { useIsMobile } from "@/hooks/use-mobile";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { toast } from "@/components/ui/toast";
import { PlusCircle } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { invoiceSchema, invoiceType } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function CreateInvoice() {
  const [open, setOpen] = React.useState(false);

  const isMobile = useIsMobile();
  const form = useForm<invoiceType>({
    mode: "onBlur",
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      due_date: "",
      invoiceNumber: "",
      items: [],
      status: undefined,
      totalAmount: undefined,
      invoiceDescription: "",
    },
  });

  function onSubmit(data: invoiceType) {
    setOpen(false);
    toast.add({
      title: "Delivery time confirmed",
      description: (
        <pre className="mt-2  overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      showSwipeHandle={isMobile}
      swipeDirection={isMobile ? "down" : "right"}
    >
      <form onClick={form.handleSubmit(onSubmit)}>
        <DrawerTrigger
          render={
            <Button variant="default">
              Create Invoice <PlusCircle size={12} />
            </Button>
          }
        />
        <DrawerContent className="md:w-1/2 py-4">
          <DrawerHeader>
            <DrawerTitle>Create and share Invoices</DrawerTitle>
            <DrawerDescription>
              Through this you can generate share and download invoices at the
              same time
            </DrawerDescription>
          </DrawerHeader>
          <Separator className="my-4" />

          <div className="flex-1 scroll overflow-y-auto gap-4">
            <FieldGroup>
              <Controller
                name="invoiceNumber"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className=" flex flex-col md:flex-row md:items-center justify-center md:justify-between">
                      <FieldLabel htmlFor={field.name}>
                        Invoice Number
                      </FieldLabel>
                      <div className="md:w-2/3">
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="123"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </div>
                    </div>
                  </Field>
                )}
              />
            </FieldGroup>

            <FieldGroup>
              <Controller
                name="invoiceDescription"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className=" flex flex-col md:flex-row md:items-center justify-center md:justify-between">
                      <FieldLabel htmlFor={field.name}>
                        Invoice Description (optional)
                      </FieldLabel>
                      <div className="md:w-2/3">
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </div>
                    </div>
                  </Field>
                )}
              />
            </FieldGroup>
          </div>

          <DrawerFooter className="flex flex-row justify-end-safe items-center">
            <DrawerClose render={<Button variant="outline">Cancel</Button>} />
            <Button type="submit">Save</Button>
            <Button>Save and share</Button>
          </DrawerFooter>
        </DrawerContent>
      </form>
    </Drawer>
  );
}
