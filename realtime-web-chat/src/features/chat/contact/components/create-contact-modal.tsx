"use client";

import { Modal } from "@/components/modal";
import { useCreateContact } from "../hooks";
import { Controller } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";

interface CreateContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateContactModal = ({
  open,
  onOpenChange,
}: CreateContactModalProps) => {
  const { form, action, handleSubmitWithAction } =
    useCreateContact(onOpenChange);

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Add contact"
      description="Give a nickname and enter the email to add a contact"
    >
      <form onSubmit={handleSubmitWithAction}>
        <FieldGroup>
          <Controller
            name="nickname"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="nickname"
                  aria-invalid={fieldState.invalid}
                >
                  Nickname
                </FieldLabel>
                <Input
                  id="nickname"
                  placeholder="John Doe"
                  {...field}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email" aria-invalid={fieldState.invalid}>
                  Email
                </FieldLabel>
                <Input
                  id="email"
                  placeholder="john.doe@example.com"
                  {...field}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Field orientation="horizontal">
            <Button
              type="button"
              variant="outline"
              disabled={action.isPending}
              onClick={() => onOpenChange(false)}
              className="px-6"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={action.isPending}
              className="ml-auto px-6"
            >
              {action.isPending ? (
                <>
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                  Saving contact...
                </>
              ) : (
                "Add contact"
              )}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </Modal>
  );
};
