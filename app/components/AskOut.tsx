"use client";

import { useState, useRef } from "react";

interface AskOutProps {
  onAccept: (choice: string) => void;
}

const dateIdeas = [
  "Hype Arena",
  "Plimbare prin herastrau 🌳",
  "Un cute dinner undeva romantic 🍷 (La grande beleza, or else)",
];

const hardcodedMessage = "hei puiu. Am fost a bit of a bitch lately, si chiar am neglijat putin mai mult relatia nostra, si am luat-o ca si granted. imi doresc ca noi sa functionam mai bine, si vreau sa fac a step toward what you need to feel loved properly. de asta, cu ajutorul tau, am selectat din lista de date ideas cateva pe care sa le facem sapt viitoare. poti sa selectezi unul si sa give me another chance to show you how much I actually love you?))";

export default function AskOut({ onAccept }: AskOutProps) {
  const [selectedChoice, setSelectedChoice] = useState("");
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const handleNoHover = () => {
    const randomX = Math.random() * 200 - 100;
    const randomY = Math.random() * 200 - 100;
    setNoPos({ x: randomX, y: randomY });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (noButtonRef.current && e.touches.length > 0) {
      const touch = e.touches[0];
      const rect = noButtonRef.current.getBoundingClientRect();
      const distance = Math.sqrt(
        Math.pow(touch.clientX - rect.left - rect.width / 2, 2) +
        Math.pow(touch.clientY - rect.top - rect.height / 2, 2)
      );

      // Move button if touch is within 80px
      if (distance < 80) {
        handleNoHover();
      }
    }
  };

  const handleYesClick = () => {
    if (selectedChoice) {
      onAccept(selectedChoice);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="relative">
        {/* Claymorphism card with soft shadows */}
        <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-rose-200 to-pink-200 blur-2xl opacity-30"></div>

        <div className="relative bg-gradient-to-br from-white to-pink-50 rounded-[32px] p-8 shadow-[0_8px_32px_rgba(219,39,119,0.15),inset_0_1px_0_rgba(255,255,255,0.6)]">
          {/* Heart decorations */}
          <div className="absolute -top-6 -right-6 text-4xl opacity-60 animate-bounce" style={{ animationDuration: "2s" }}>
            💕
          </div>
          <div className="absolute -bottom-4 -left-4 text-3xl opacity-50" style={{ animationName: "float", animationDuration: "3s", animationIterationCount: "infinite" }}>
            ✨
          </div>

          <style>{`
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
            }
          `}</style>

          {/* Main Content */}
          <div className="space-y-6">
            {/* Heading */}
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent" style={{ fontFamily: "var(--font-fredoka)" }}>
                Vrei să...
              </h1>
              <p className="text-xl text-rose-400" style={{ fontFamily: "var(--font-fredoka)" }}>
                ieșim la o întâlnire? 🥺
              </p>
            </div>

            {/* Hardcoded Message */}
            <div className="bg-pink-100/50 rounded-2xl p-4 border-2 border-pink-200">
              <p className="text-rose-900 text-center leading-relaxed" style={{ fontFamily: "var(--font-nunito)" }}>
                {hardcodedMessage}
              </p>
            </div>

            {/* Date Ideas Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-rose-900" style={{ fontFamily: "var(--font-fredoka)" }}>
                Ce ai dori să facem?
              </label>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                {dateIdeas.map((idea) => (
                  <button
                    key={idea}
                    onClick={() => setSelectedChoice(idea)}
                    className={`px-3 py-2 rounded-xl font-semibold text-sm transition-all duration-200 border-2 ${
                      selectedChoice === idea
                        ? "bg-rose-400 text-white border-rose-500 shadow-[0_4px_12px_rgba(244,114,182,0.4)]"
                        : "bg-pink-100 text-rose-900 border-pink-300 hover:bg-pink-200"
                    }`}
                    style={{ fontFamily: "var(--font-fredoka)" }}
                  >
                    {idea}
                  </button>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 relative h-16">
              {/* Yes Button */}
              <button
                onClick={handleYesClick}
                disabled={!selectedChoice}
                className={`flex-1 relative font-bold text-lg rounded-2xl px-6 py-3 cursor-pointer transition-all duration-200 border-2 ${
                  selectedChoice
                    ? "bg-gradient-to-br from-rose-400 to-pink-500 text-white shadow-[0_4px_16px_rgba(244,114,182,0.4),inset_0_-2px_0_rgba(0,0,0,0.1)] hover:shadow-[0_8px_24px_rgba(244,114,182,0.6),inset_0_-2px_0_rgba(0,0,0,0.1)] hover:translate-y-[-2px] active:translate-y-[0] border-pink-300/50"
                    : "bg-gray-200 text-gray-400 shadow-none border-gray-300/50 cursor-not-allowed"
                }`}
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                Yes! 💕
              </button>

              {/* No Button - Runs away on hover */}
              <button
                ref={noButtonRef}
                onMouseEnter={handleNoHover}
                onTouchStart={handleNoHover}
                onTouchMove={handleTouchMove}
                className="flex-1 relative bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 font-bold text-lg rounded-2xl px-6 py-3 cursor-pointer transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.08),inset_0_-2px_0_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1),inset_0_-2px_0_rgba(0,0,0,0.05)] active:translate-y-[0] border-2 border-gray-300/50"
                style={{
                  fontFamily: "var(--font-fredoka)",
                  transform: `translate(${noPos.x}px, ${noPos.y}px)`,
                  touchAction: "none",
                }}
              >
                No
              </button>
            </div>

            {/* Cute footer text */}
            <p className="text-center text-sm text-pink-600 italic" style={{ fontFamily: "var(--font-nunito)" }}>
              {selectedChoice ? "E gata! Apasă Da! 💕" : 'Alege o idee, apoi apasă "Da"'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
