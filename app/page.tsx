"use client";

import { useState } from "react";
import AskOut from "./components/AskOut";
import Success from "./components/Success";

export default function Home() {
  const [accepted, setAccepted] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState("");

  if (accepted) {
    return <Success selectedChoice={selectedChoice} />;
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen px-4">
      <AskOut onAccept={(choice) => {
        setSelectedChoice(choice);
        setAccepted(true);
      }} />
    </div>
  );
}
