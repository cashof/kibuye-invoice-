"use client";

import * as React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle, Trash2 } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";

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

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { toast } from "@/components/ui/toast";

import { invoiceSchema, invoiceType } from "@/utils/types";

const defaultInvoiceValues: invoiceType = {
  invoiceNumber: undefined as unknown as number,
  invoiceDescription: "",
  due_date: "",
  status: "draft",
  totalAmount: 0,
  items: [
    {
      name: "",
      quantity: 1,
      price: 0,
    },
  ],
};

export function CreateInvoice() {
  const [open, setOpen] = React.useState(false);

  const isMobile = useIsMobile();

  const form = useForm<invoiceType>({
    resolver: zodResolver(invoiceSchema),
    mode: "onBlur",
    defaultValues: defaultInvoiceValues,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const items = form.watch("items");

  React.useEffect(() => {
    const total = items.reduce(
      (sum, item) =>
        sum + (Number(item.quantity) || 0) * (Number(item.price) || 0),
      0,
    );

    form.setValue("totalAmount", total);
  }, [items, form]);

  function onSubmit(data: invoiceType) {
    console.log(data);

    toast.add({
      title: "Invoice created",
      description: "Invoice saved successfully.",
    });

    form.reset(defaultInvoiceValues);
    setOpen(false);
  }

  function handleOpenChange(next: boolean) {
    if (!next) {
      form.reset(defaultInvoiceValues);
    }
    setOpen(next);
  }

  return (
    <Drawer
      open={open}
      onOpenChange={handleOpenChange}
      showSwipeHandle={isMobile}
      swipeDirection={isMobile ? "down" : "right"}
    >
      <DrawerTrigger
        render={
          <Button>
            Create Invoice
            <PlusCircle size={15} />
          </Button>
        }
      />

      <DrawerContent className="md:w-1/2 py-4">
        <DrawerHeader>
          <DrawerTitle>Create Invoice</DrawerTitle>
          <DrawerDescription>
            Create, download and share invoices.
          </DrawerDescription>
        </DrawerHeader>

        <Separator />

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex h-full flex-col"
        >
          <div className="flex-1 space-y-6 overflow-y-auto p-4">
            {/* Invoice Number */}
            <Controller
              control={form.control}
              name="invoiceNumber"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Invoice Number</FieldLabel>

                  <Input
                    name={field.name}
                    ref={field.ref}
                    onBlur={field.onBlur}
                    type="number"
                    placeholder="1001"
                    value={field.value ?? ""}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === ""
                          ? undefined
                          : e.target.valueAsNumber,
                      )
                    }
                  />

                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />

            {/* Due Date */}
            <Controller
              control={form.control}
              name="due_date"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Due Date</FieldLabel>

                  <Input {...field} type="date" />

                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />

            {/* Description */}
            <Controller
              control={form.control}
              name="invoiceDescription"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Description</FieldLabel>

                  <Textarea
                    {...field}
                    rows={4}
                    placeholder="Describe this invoice..."
                  />

                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />

            <Separator />

            <div className="space-y-4">
              <h3 className="font-semibold">Invoice Items</h3>

              {fields.map((item, index) => (
                <FieldGroup key={item.id} className="rounded-lg border p-4">
                  <Controller
                    control={form.control}
                    name={`items.${index}.name`}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Name</FieldLabel>

                        <Input {...field} />

                        <FieldError errors={[fieldState.error]} />
                      </Field>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <Controller
                      control={form.control}
                      name={`items.${index}.quantity`}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel>Quantity</FieldLabel>

                          <Input
                            name={field.name}
                            ref={field.ref}
                            onBlur={field.onBlur}
                            type="number"
                            value={Number.isNaN(field.value) ? "" : field.value}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value === ""
                                  ? ""
                                  : e.target.valueAsNumber,
                              )
                            }
                          />

                          <FieldError errors={[fieldState.error]} />
                        </Field>
                      )}
                    />

                    <Controller
                      control={form.control}
                      name={`items.${index}.price`}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel>Price</FieldLabel>

                          <Input
                            name={field.name}
                            ref={field.ref}
                            onBlur={field.onBlur}
                            type="number"
                            step="0.01"
                            value={Number.isNaN(field.value) ? "" : field.value}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value === ""
                                  ? ""
                                  : e.target.valueAsNumber,
                              )
                            }
                          />

                          <FieldError errors={[fieldState.error]} />
                        </Field>
                      )}
                    />
                  </div>

                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="mt-4"
                    disabled={fields.length === 1}
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                </FieldGroup>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  append({
                    name: "",
                    quantity: 1,
                    price: 0,
                  })
                }
              >
                Add Item
              </Button>
            </div>

            <Field>
              <FieldLabel>Total</FieldLabel>

              <Input value={form.watch("totalAmount")} readOnly />
            </Field>
          </div>

          <DrawerFooter className="flex-row justify-end gap-2">
            <DrawerClose render={<Button variant="outline">Cancel</Button>} />

            <Button type="submit">Save Invoice</Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
