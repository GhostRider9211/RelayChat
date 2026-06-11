"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useParams } from "next/navigation";
import axios from "axios";
import { CHAT_GROUP_USERS } from "@/lib/apiAuthRoutes";
import { toast } from "sonner";

export default function ChatUserDialog({
  open,
  setOpen,
  group,
  users,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  group: GroupChatType;
  users: Array<GroupChatUserType> | [];
}) {
  const params = useParams();
  const [state, setState] = useState({
    name: "",
    passcode: "",
  });

  useEffect(() => {
    const data = localStorage.getItem(params["id"] as string);
    if (data) {
      const jsonData = JSON.parse(data);
      if (jsonData?.name && jsonData?.group_id) {
        setOpen(false);
      }
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const name = state.name.trim();

    if (!name) {
      toast.error("Please enter your name!");
      return;
    }

    if (group.passcode != state.passcode) {
      toast.error("Please enter correct passcode!");
      return;
    }

    const localData = localStorage.getItem(params["id"] as string);
    if (!localData) {
      const existingUser = users.find(
        (user) => user.group_id === params["id"] && user.name === name
      );

      if (existingUser) {
        localStorage.setItem(
          params["id"] as string,
          JSON.stringify(existingUser)
        );
        setOpen(false);
        return;
      }

      try {
        const { data } = await axios.post(CHAT_GROUP_USERS, {
          name,
          group_id: params["id"] as string,
        });
        localStorage.setItem(
          params["id"] as string,
          JSON.stringify(data?.data)
        );
      } catch (error) {
        toast.error("Something went wrong. Please try again!");
        return;
      }
    }
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Name and Passcode</DialogTitle>
          <DialogDescription>
            Add your name and passcode to join the room
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="mt-2">
            <Input
              placeholder="Enter your name"
              value={state.name}
              onChange={(e) => setState({ ...state, name: e.target.value })}
            />
          </div>
          <div className="mt-2">
            <Input
              placeholder="Enter your passcode"
              value={state.passcode}
              onChange={(e) =>
                setState({ ...state, passcode: e.target.value })
              }
            />
          </div>
          <div className="mt-2">
            <Button className="w-full">Submit</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
