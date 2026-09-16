"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type BookingState = {
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  setRoomId: (v: string) => void;
  setCheckIn: (v: string) => void;
  setCheckOut: (v: string) => void;
  setGuests: (v: number) => void;
  selectRoomAndScroll: (roomId: string) => void;
};

const BookingCtx = createContext<BookingState | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [roomId, setRoomId] = useState("deluxe");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  function selectRoomAndScroll(id: string) {
    setRoomId(id);
    document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <BookingCtx.Provider
      value={{ roomId, checkIn, checkOut, guests, setRoomId, setCheckIn, setCheckOut, setGuests, selectRoomAndScroll }}
    >
      {children}
    </BookingCtx.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingCtx);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}
