"use client";
import React, { useState, useEffect } from "react";
import ChatNav from "./ChatNav";
import ChatUserDialog from "./ChatUserDialog";
import ChatSideBar from "./ChatSideBar";
import Chats from "./Chats";

interface ChatBaseProps {
  groupId: string;
  group: GroupChatType;
  users: Array<GroupChatUserType> | [];
  oldMessages: Array<MessageType> | [];
}

export default function ChatBase({
  groupId,
  group,
  users,
  oldMessages,
}: ChatBaseProps) {
  const [open, setOpen] = useState(true);
  const [chatUser, setChatUser] = useState<GroupChatUserType | undefined>();

  useEffect(() => {
    if (group?.id) {
      const data = localStorage.getItem(group.id);
      if (data) {
        const pData = JSON.parse(data);
        setChatUser(pData);
        setOpen(false);
      }
    }
  }, [group?.id]);

  useEffect(() => {
    if (!open && !chatUser && group?.id) {
      const data = localStorage.getItem(group.id);
      if (data) {
        setChatUser(JSON.parse(data));
      }
    }
  }, [open, chatUser, group?.id]);

  return (
    <div className="flex h-screen">
      <ChatSideBar users={users} />
      <div className="w-full md:w-4/5 bg-gradient-to-b from-gray-50 to-white">
        {open ? (
          <ChatUserDialog open={open} setOpen={setOpen} group={group} />
        ) : (
          <ChatNav chatGroup={group} users={users} user={chatUser} />
        )}
        <Chats oldMessages={oldMessages} group={group} chatUser={chatUser} />
      </div>
    </div>
  );
}
