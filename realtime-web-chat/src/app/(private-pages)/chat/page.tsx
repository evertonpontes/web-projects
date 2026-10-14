import { ChatPanel } from "@/features/chat";
import { Suspense } from "react";

const ChatPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatPanel />
    </Suspense>
  );
};

export default ChatPage;
