import { ConversationType } from "@/generated/prisma/enums";
import z from "zod";

export const createConversationSchema = z.object({
  type: z.enum(ConversationType),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  avatarUrl: z.string().optional(),
  membersIds: z.array(z.string()),
});

export type TCreateConversation = z.infer<typeof createConversationSchema>;
