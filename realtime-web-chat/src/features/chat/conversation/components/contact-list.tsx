"use client";

import { ConversationType } from "@/generated/prisma/enums";
import { Contact, User } from "@/generated/prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckIcon, UserPlus2Icon } from "lucide-react";
import { useMemo, useState } from "react";

export type TContact = Contact & { contact: User };

interface ContactListProps {
  type?: ConversationType;
  callback?: (members: TContact | TContact[]) => void;
  contacts?: (Contact & { contact: User })[];
}

const usernameAbreviation = (name: string) => {
  let nameAbreviation = "";

  const nameSplited = name.split(" ");

  for (let i = 0; i < nameSplited.length; i++) {
    if (!nameSplited[i].trim()) {
      nameSplited.splice(i, 1);
    }
  }

  nameAbreviation = nameSplited[0][0].toUpperCase();

  if (nameSplited.length > 1) {
    nameAbreviation += nameSplited[1][0].toUpperCase();
  }

  return nameAbreviation;
};

export const ContactList = ({
  type = "PRIVATE",
  callback,
  contacts = [],
}: ContactListProps) => {
  const [selectedContacts, setSelectedContacts] = useState<TContact[]>([]);

  const selectedContactIds = useMemo(() => {
    return selectedContacts.map((contact) => contact.contactId);
  }, [selectedContacts]);

  const handleSelectContacts = (member: TContact) => {
    if (type === "PRIVATE") {
      callback?.(member);
    } else {
      if (selectedContactIds.includes(member.contactId)) {
        setSelectedContacts((prev) => {
          const newSelection = prev.filter(
            ({ contactId }) => contactId !== member.contactId,
          );
          callback?.(newSelection);

          return newSelection;
        });
      } else {
        setSelectedContacts((prev) => {
          callback?.([...prev, member]);

          return [...prev, member];
        });
      }
    }
  };

  return (
    <div className="flex size-full min-h-0 flex-col overflow-hidden">
      <div className="scroll-fade-b flex size-full min-h-0 min-w-0 scrollbar-thin scrollbar-thumb-mauve-300 scrollbar-track-transparent flex-col overflow-y-auto overscroll-contain contain-content data-autoscrolling:scrollbar-thumb-transparent data-autoscrolling:scrollbar-track-transparent data-pending-scroll:invisible">
        <div className="flex h-max min-h-full flex-col gap-4">
          {contacts.length === 0 ? (
            <div className="flex w-full flex-col items-center justify-center gap-4 p-4">
              <div className="bg-muted text-muted-foreground flex size-8 items-center justify-center rounded-md">
                <UserPlus2Icon />
              </div>

              <h2 className="text-foreground text-base font-semibold tracking-tight">
                No contacts yet
              </h2>

              <p className="text-muted-foreground text-sm leading-relaxed font-normal tracking-tight">
                You haven&apos;t add any contact yet. <br /> Get started by
                adding new contacts to your list.
              </p>
            </div>
          ) : (
            contacts.map((contact) => (
              <button
                type={type === "PRIVATE" ? "submit" : "button"}
                key={contact.id}
                className="hover:bg-muted flex w-full items-center gap-4 rounded-md p-2 transition-colors duration-150"
                onClick={() => {
                  handleSelectContacts(contact);
                }}
              >
                <Avatar>
                  <AvatarImage
                    src={contact.contact.image || ""}
                    alt="contact-image"
                  />
                  <AvatarFallback>
                    {usernameAbreviation(contact.contact.name)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex flex-1 flex-col items-start">
                  <p className="text-foreground text-sm font-semibold tracking-tight">
                    {contact.nickname}
                  </p>
                  <p className="text-muted-foreground text-xs font-normal tracking-tight">
                    {contact.contact.email}
                  </p>
                </div>

                {selectedContactIds.includes(contact.contactId) && (
                  <CheckIcon className="ml-auto" />
                )}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
