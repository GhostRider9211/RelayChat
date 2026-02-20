"use client";
import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function loginModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Getting Start</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl ">Welcome to RelayChat</DialogTitle>
          <DialogDescription>
            RelayChat is a real-time chat application built with Next.js,
            Prisma, and Socket.IO. It allows you to connect with friends and
            family in a seamless and interactive way. To get started, please
            sign in with your Google account.
          </DialogDescription>
        </DialogHeader>
        <Button variant="outline">
          <Image
            src="/images/google.png"
            className="mr-4"
            width={25}
            height={25}
            alt="google_logo"
          />
          continue with google
        </Button>
      </DialogContent>
    </Dialog>
  );
}
