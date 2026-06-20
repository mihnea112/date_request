"use client";

import { useState } from "react";

interface SuccessProps {
  selectedChoice: string;
}

export default function Success({ selectedChoice }: SuccessProps) {
  const [eventTitle, setEventTitle] = useState(`Date - ${selectedChoice || "Întâlnirea noastră ✨"}`);
  const eventDate = "2026-06-23";
  const [eventTime, setEventTime] = useState("19:00");
  const [location, setLocation] = useState(selectedChoice || "");
  const [notes, setNotes] = useState("");

  const handleAddToCalendar = () => {
    // Create calendar event URL for Apple Calendar
    const now = new Date();
    const eventDateTime = eventDate && eventTime ? new Date(`${eventDate}T${eventTime}`) : new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    // Format for Apple Calendar
    const startDate = eventDateTime.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const endDate = new Date(eventDateTime.getTime() + 2 * 60 * 60 * 1000).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

    // Build event details
    const eventDetails = `${eventTitle}${location ? ` at ${location}` : ""}${notes ? `\n\n${notes}` : ""}`;

    // Create webcal URL for Apple Calendar
    const webcalURL = `webcal://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startDate}/${endDate}&location=${encodeURIComponent(location)}&details=${encodeURIComponent(eventDetails)}`;

    // Alternative: Create an ICS file
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Date Request//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
DTSTART:${startDate}
DTEND:${endDate}
SUMMARY:${eventTitle}
LOCATION:${location}
DESCRIPTION:${notes}
END:VEVENT
END:VCALENDAR`;

    // Download ICS file
    const element = document.createElement("a");
    element.setAttribute("href", "data:text/calendar;charset=utf-8," + encodeURIComponent(icsContent));
    element.setAttribute("download", `${eventTitle}.ics`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md">
        <div className="relative">
          {/* Claymorphism card */}
          <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-rose-200 to-pink-200 blur-2xl opacity-30"></div>

          <div className="relative bg-gradient-to-br from-white to-pink-50 rounded-[32px] p-8 shadow-[0_8px_32px_rgba(219,39,119,0.15),inset_0_1px_0_rgba(255,255,255,0.6)]">
            {/* Celebration decorations */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-5xl">
              🎉
            </div>
            <div className="absolute -bottom-4 -right-4 text-4xl opacity-60">
              💕
            </div>

            {/* Success Message */}
            <div className="space-y-2 text-center mb-8 mt-4">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent" style={{ fontFamily: "var(--font-fredoka)" }}>
                A spus Da!
              </h2>
              <p className="text-rose-400 text-lg" style={{ fontFamily: "var(--font-fredoka)" }}>
                Acum hai să planificăm! 📅
              </p>
            </div>

            {/* Event Details Form */}
            <div className="space-y-4">
              {/* Event Title */}
              <div>
                <label className="block text-sm font-semibold text-rose-900 mb-2" style={{ fontFamily: "var(--font-fredoka)" }}>
                  Titlul evenimentului
                </label>
                <input
                  type="text"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border-2 border-pink-200 bg-white/80 text-rose-900 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition-all duration-200"
                  style={{ fontFamily: "var(--font-nunito)" }}
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-semibold text-rose-900 mb-2" style={{ fontFamily: "var(--font-fredoka)" }}>
                  Data
                </label>
                <div className="w-full px-4 py-2 rounded-xl border-2 border-pink-200 bg-pink-50/50 text-rose-900" style={{ fontFamily: "var(--font-nunito)" }}>
                  23 iunie 2026 (marți)
                </div>
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm font-semibold text-rose-900 mb-2" style={{ fontFamily: "var(--font-fredoka)" }}>
                  Ora
                </label>
                <input
                  type="time"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border-2 border-pink-200 bg-white/80 text-rose-900 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition-all duration-200"
                  style={{ fontFamily: "var(--font-nunito)" }}
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-rose-900 mb-2" style={{ fontFamily: "var(--font-fredoka)" }}>
                  Locație
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Locația poate fi modificată"
                  className="w-full px-4 py-2 rounded-xl border-2 border-pink-200 bg-white/80 text-rose-900 placeholder-pink-300 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition-all duration-200"
                  style={{ fontFamily: "var(--font-nunito)" }}
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-semibold text-rose-900 mb-2" style={{ fontFamily: "var(--font-fredoka)" }}>
                  Notițe
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Orice notă specială..."
                  className="w-full px-4 py-2 rounded-xl border-2 border-pink-200 bg-white/80 text-rose-900 placeholder-pink-300 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition-all duration-200 resize-none"
                  style={{ fontFamily: "var(--font-nunito)" }}
                  rows={3}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={handleAddToCalendar}
                className="flex-1 bg-gradient-to-br from-rose-400 to-pink-500 text-white font-bold text-base rounded-2xl px-6 py-3 cursor-pointer transition-all duration-200 shadow-[0_4px_16px_rgba(244,114,182,0.4),inset_0_-2px_0_rgba(0,0,0,0.1)] hover:shadow-[0_8px_24px_rgba(244,114,182,0.6),inset_0_-2px_0_rgba(0,0,0,0.1)] hover:translate-y-[-2px] active:translate-y-[0] border-2 border-pink-300/50"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                Adaugă în Calendar 📅
              </button>
            </div>

            {/* Info text */}
            <p className="text-center text-sm text-rose-600 mt-4" style={{ fontFamily: "var(--font-nunito)" }}>
              Un fișier .ics va fi descărcat pe care îl poți importa în Apple Calendar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
