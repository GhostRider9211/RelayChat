"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function JoinChat() {
  const [open, setOpen] = useState(false);
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = roomId.trim();
    const uuidRegex =
      /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;
    const match = trimmed.match(uuidRegex);
    if (!match) {
      toast.error("Please enter a valid Room ID");
      return;
    }
    setOpen(false);
    router.push(`/chats/${match[0]}`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Join Room</Button>
      </DialogTrigger>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Join a Chat Room</DialogTitle>
          <DialogDescription>
            Enter the Room ID to join an existing chat room.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <Input
              placeholder="Enter Room ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <Button className="w-full" type="submit">
              Join
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
