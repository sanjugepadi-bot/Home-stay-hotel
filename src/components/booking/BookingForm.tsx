"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Lock, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { rooms } from "@/data/rooms";
import { whatsappLink } from "@/data/site";
import { useBooking } from "./BookingContext";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(8, "Enter a valid phone number"),
  roomId: z.string(),
  checkIn: z.string().min(1, "Select a check-in date"),
  checkOut: z.string().min(1, "Select a check-out date"),
  guests: z.number().min(1).max(10),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const inputClass =
  "w-full rounded-lg border border-border bg-background/80 px-3.5 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20";

export function BookingForm() {
  const { roomId, checkIn, checkOut, guests } = useBooking();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    values: { name: "", email: "", phone: "", roomId, checkIn, checkOut, guests, message: "" },
  });

  function onSubmit(data: FormValues) {
    const room = rooms.find((r) => r.id === data.roomId);
    const message = [
      `New booking request for ${room?.name ?? "a room"}`,
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Check-in: ${data.checkIn || "TBD"}`,
      `Check-out: ${data.checkOut || "TBD"}`,
      `Guests: ${data.guests}`,
      data.message ? `Message: ${data.message}` : undefined,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-gold-deep" />
        <h3 className="mt-4 font-display text-2xl text-foreground">Request sent!</h3>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          We&apos;ve opened WhatsApp with your booking details. Our team typically replies within 30 minutes.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setSubmitted(false)}>
          Send another request
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-4 rounded-2xl border border-border bg-card p-6 shadow-[0_4px_24px_-6px_rgba(0,0,0,0.1)] sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <input className={inputClass} placeholder="Full name" {...register("name")} />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <input className={inputClass} placeholder="Email address" {...register("email")} />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <input className={inputClass} placeholder="Phone number" {...register("phone")} />
          {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
        </div>
        <select className={cn(inputClass, "appearance-none")} {...register("roomId")}>
          {rooms.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">Check-in</label>
          <input type="date" className={inputClass} {...register("checkIn")} />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">Check-out</label>
          <input type="date" className={inputClass} {...register("checkOut")} />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">Guests</label>
          <input type="number" min={1} max={10} className={inputClass} {...register("guests", { valueAsNumber: true })} />
        </div>
      </div>

      <textarea
        rows={3}
        placeholder="Anything else we should know? (optional)"
        className={inputClass}
        {...register("message")}
      />

      <Button type="submit" variant="gold" size="lg" disabled={isSubmitting} className="w-full">
        <Send className="h-4 w-4" /> Send Booking Request via WhatsApp
      </Button>

      <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <Lock className="h-3 w-3" /> Secure payments powered by Razorpay/Stripe — coming soon. No payment required to request a booking.
      </p>
    </form>
  );
}
