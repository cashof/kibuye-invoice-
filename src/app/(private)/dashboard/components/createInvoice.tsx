"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { invoiceSchema, invoiceType } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Plus, Trash, XIcon } from "lucide-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

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
      due_date: undefined,
      client_id: "",
      invoiceNumber: undefined,
      items: [
        {
          name: "",
          price: undefined,
          quantity: undefined,
        },
        {
          name: "",
          price: undefined,
          quantity: undefined,
        },
      ],
      status: "draft",
      totalAmount: 0,
      invoiceDescription: "",
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "items",
  });

  return (
    <div>
      <Field>
        <FieldContent>
          <div>
            <form action="">
              <Controller
                name="client_id"
                control={form.control}
                render={({ field, fieldState }) => {
                  <Field data-invalid={fieldState.invalid} className="w-2/3">
                    <FieldLabel>Billing to</FieldLabel>
                    <Select
                      items={statuses}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger aria-invalid={fieldState.invalid}>
                        <SelectValue placeholder="Client" />
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
                  </Field>;
                }}
              />

              <Separator className={"my-2"} />
              <FieldGroup className="gap-2">
                <Controller
                  name="invoiceNumber"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="md:flex md:flex-row md:gap-4 md:items-center md:justify-start"
                    >
                      <div className=" ">
                        <FieldLabel>Invoice Number</FieldLabel>
                      </div>
                      <div className="flex flex-col items-start  ">
                        <Input
                          {...field}
                          placeholder="123"
                          className=""
                          aria-invalid={fieldState.invalid}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                        {fieldState.error && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </div>
                    </Field>
                  )}
                />

                <Separator className={"my-2"} />

                <div className=" grid md:grid-cols-2 gap-2 justify-center items-center">
                  <Controller
                    name="status"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        className="w-2/3"
                      >
                        <FieldLabel>Status</FieldLabel>
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
                    render={({ field, fieldState }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        className="w-2/3"
                      >
                        <FieldLabel>Due Date</FieldLabel>

                        <FieldContent>
                          <Popover>
                            <PopoverTrigger
                              render={
                                <Button
                                  variant="outline"
                                  className="w-full justify-start"
                                >
                                  {field.value
                                    ? format(field.value, "PPP")
                                    : "Pick a date"}
                                </Button>
                              }
                            />

                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                defaultMonth={field.value ?? new Date()}
                              />
                            </PopoverContent>
                          </Popover>
                        </FieldContent>

                        {fieldState.error && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>
                {/* select client  */}

                {/* add itmes  */}

                <Field>
                  <FieldLabel>Invoice Items</FieldLabel>

                  <FieldContent className="space-y-4">
                    {fields.map((item, index) => (
                      <div
                        key={item.id}
                        className="grid grid-cols-5 gap-2 items-end"
                      >
                        <div className="col-span-2">
                          <Controller
                            name={`items.${index}.name`}
                            control={form.control}
                            render={({ field, fieldState }) => (
                              <Field data-invalid={fieldState.invalid}>
                                <Input {...field} placeholder="Name" />
                              </Field>
                            )}
                          />
                        </div>

                        <div className="col-span-1">
                          <Controller
                            name={`items.${index}.quantity`}
                            control={form.control}
                            render={({ field, fieldState }) => (
                              <Field data-invalid={fieldState.invalid}>
                                <Input
                                  type="string"
                                  value={field.value}
                                  placeholder="@123"
                                  onChange={(e) =>
                                    field.onChange(
                                      e.target.value === ""
                                        ? undefined
                                        : Number(e.target.value),
                                    )
                                  }
                                />
                              </Field>
                            )}
                          />
                        </div>

                        <div className="col-span-1">
                          <Controller
                            name={`items.${index}.price`}
                            control={form.control}
                            render={({ field, fieldState }) => (
                              <Field data-invalid={fieldState.invalid}>
                                <InputGroup>
                                  <InputGroupInput
                                    type="number"
                                    value={field.value}
                                    placeholder="UGX:25000"
                                    onChange={(e) =>
                                      field.onChange(
                                        e.target.value === ""
                                          ? undefined
                                          : Number(e.target.value),
                                      )
                                    }
                                  />

                                  {fields.length > 1 && (
                                    <InputGroupAddon align="inline-end">
                                      <Separator orientation="vertical" />
                                      <InputGroupButton
                                        type="button"
                                        variant="ghost"
                                        size="icon-xs"
                                        onClick={() => remove(index)}
                                        aria-label={`Remove email ${index + 1}`}
                                      >
                                        <XIcon />
                                      </InputGroupButton>
                                    </InputGroupAddon>
                                  )}
                                </InputGroup>
                              </Field>
                            )}
                          />
                        </div>
                      </div>
                    ))}
                  </FieldContent>

                </Field>
              </FieldGroup>
              <Button
                type="button"
                onClick={() =>
                  append({
                    name: "",
                    quantity: undefined,
                    price: undefined,
                  })
                }
                disabled={fields.length >= 10}
                variant={"outline"}
                className={" outline-card my-4 px-5"}
              >
                Add <Plus />
              </Button>

              <Separator className={"my-2"} />
              <Controller
                name="invoiceDescription"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Description (optional)</FieldLabel>
                    <Textarea
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
            </form>
          </div>
        </FieldContent>
      </Field>
    </div>
  );
}