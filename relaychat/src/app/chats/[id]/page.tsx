import ChatBase from "@/components/chat/ChatBase";
import { fetchChatGroup, fetchChatGroupUsers } from "@/fetch/groupFetch";
import { fetchChats } from "@/fetch/chatsFetch";

interface ChatPageProps {
  params: Promise<{ id: string }>;
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { id } = await params;

  const [group, users, oldMessages] = await Promise.all([
    fetchChatGroup(id),
    fetchChatGroupUsers(id),
    fetchChats(id),
  ]);

  return (
    <ChatBase
      group={group}
      users={users}
      oldMessages={oldMessages}
      groupId={id}
    />
  );
}
