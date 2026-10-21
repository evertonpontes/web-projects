"use client";

import { Modal } from "@/components/modal";
import { useCreateConversation } from "../hooks";
import { Controller } from "react-hook-form";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2Icon, SearchIcon } from "lucide-react";
import { ConversationType } from "@/generated/prisma/enums";
import { useGetContact } from "../../contact";
import { useGetCurrent } from "@/features/auth";
import { ContactList, TContact } from "./contact-list";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { ChangeEvent, useEffect, useMemo, useState } from "react";

type User = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null | undefined;
};

interface CreateConversationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type?: ConversationType;
  user: User;
}

export const CreateConversationModal = ({
  open,
  onOpenChange,
  type = "PRIVATE",
  user,
}: CreateConversationModalProps) => {
  const [searchContact, setSearchContact] = useState<string>("");

  const { form, action, handleSubmitWithAction } = useCreateConversation({
    onOpenChange,
    type,
  });

  const { data: contacts } = useGetContact(user.id);

  const handleSearchContactChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (!value) return setSearchContact("");

    setSearchContact(value);
  };

  const filteredContacts = useMemo(() => {
    if (!contacts) return [];

    if (!searchContact) return contacts;

    const filterByEmail = contacts.filter((contact) =>
      contact.contact.email
        .toLocaleLowerCase()
        .includes(searchContact.trim().toLocaleLowerCase()),
    );

    const filterByNickname = contacts.filter(
      (contact) =>
        contact.nickname &&
        contact.nickname
          .toLocaleLowerCase()
          .includes(searchContact.trim().toLocaleLowerCase()),
    );

    const removeDuplicates = new Set([...filterByEmail, ...filterByNickname]);

    return [...removeDuplicates];
  }, [contacts, searchContact]);

  const handleNewChat = (member: TContact) => {
    form.setValue("title", member.nickname || member.contact.name);

    action.execute({
      ...form.getValues(),
      membersIds: [member.userId],
    });
  };

  const handleNewGroup = (members: TContact[]) => {
    form.setValue(
      "membersIds",
      members.map((member) => member.contactId),
    );
  };

  useEffect(() => {
    form.setValue("type", type);
  }, [form, type]);

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={type === "PRIVATE" ? "New chat" : "Create group"}
      description={
        type === "GROUP" &&
        "Give your group a name and select the members you want to invite."
      }
    >
      <form onSubmit={handleSubmitWithAction}>
        <FieldGroup>
          {type === "GROUP" && (
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    id="title"
                    placeholder="Group name"
                    {...field}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          )}

          <div className="flex max-h-92 w-full flex-col gap-2">
            <InputGroup>
              <InputGroupAddon align="inline-start">
                <SearchIcon />
              </InputGroupAddon>
              <InputGroupInput
                placeholder="Search contacts..."
                value={searchContact}
                onChange={handleSearchContactChange}
              />
            </InputGroup>
            <ContactList
              type={type}
              contacts={filteredContacts}
              callback={(members) =>
                type === "PRIVATE"
                  ? handleNewChat(Array.isArray(members) ? members[0] : members)
                  : handleNewGroup(Array.isArray(members) ? members : [members])
              }
            />
          </div>

          {type === "GROUP" && (
            <Field orientation="horizontal">
              <Button
                type="submit"
                disabled={action.isPending}
                className="ml-auto px-6"
              >
                {action.isPending ? (
                  <>
                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                    Creating group...
                  </>
                ) : (
                  "Create group"
                )}
              </Button>
            </Field>
          )}
        </FieldGroup>
      </form>
    </Modal>
  );
};
