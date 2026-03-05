"use client";
import React from "react";
import ProfileMenu from "../auth/Profilemenu";

export default function DashNav(
    {
  name,
  image,
}: {
  name: string;
  image?: string;
}
) {
    return (
        <nav className="w-full h-16 border-b flex items-center justify-end px-4">
            <ProfileMenu name={name} image={image} />
        </nav>
    );
}