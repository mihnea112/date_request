"use client";

import { useState, useEffect } from "react";
import AskOut from "./components/AskOut";
import Success from "./components/Success";

export default function Home() {
  const [accepted, setAccepted] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("dateRequestAccepted");
    const savedChoice = localStorage.getItem("dateRequestChoice");

    if (saved === "true") {
      setAccepted(true);
      setSelectedChoice(savedChoice || "");
    }

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center min-h-screen px-4">
        <div className="text-rose-400 text-lg">Încărcând...</div>
      </div>
    );
  }

  if (accepted) {
    return <Success selectedChoice={selectedChoice} />;
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen px-4">
      <AskOut onAccept={(choice) => {
        localStorage.setItem("dateRequestAccepted", "true");
        localStorage.setItem("dateRequestChoice", choice);
        setSelectedChoice(choice);
        setAccepted(true);
      }} />
    </div>
  );
}
