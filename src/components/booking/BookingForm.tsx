"use client";

import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { CheckCircle2, Lock, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { rooms } from "@/data/rooms";
import { whatsappLink } from "@/data/site";
import { useBooking } from "./BookingContext";
import { cn, formatINR } from "@/lib/utils";
import { bookingResolver, type BookingFormValues as FormValues } from "@/lib/booking-validation";

const inputClass =
  "w-full min-h-11 rounded-lg border border-border bg-background/80 px-3.5 py-3 text-base text-foreground placeholder:text-muted-foreground transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 sm:text-sm";

export function BookingForm() {
  const { roomId, checkIn, checkOut, guests } = useBooking();
  const [submitted, setSubmitted] = useState(false);
  const uid = useId();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: bookingResolver,
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
          We&apos;ve opened WhatsApp with your booking details. The host will reply there to confirm availability.
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
          <label htmlFor={uid + "-name"} className="sr-only">Full name</label>
          <input
            id={uid + "-name"}
            aria-invalid={errors.name ? true : undefined}
            type="text"
            autoComplete="name"
            className={inputClass}
            placeholder="Full name"
            {...register("name")}
          />
          {errors.name && <p role="alert" className="mt-1 text-xs text-red-700 dark:text-red-400">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor={uid + "-email"} className="sr-only">Email address</label>
          <input
            id={uid + "-email"}
            aria-invalid={errors.email ? true : undefined}
            type="email"
            inputMode="email"
            autoComplete="email"
            className={inputClass}
            placeholder="Email address"
            {...register("email")}
          />
          {errors.email && <p role="alert" className="mt-1 text-xs text-red-700 dark:text-red-400">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={uid + "-phone"} className="sr-only">Phone number</label>
          <input
            id={uid + "-phone"}
            aria-invalid={errors.phone ? true : undefined}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className={inputClass}
            placeholder="Phone number"
            {...register("phone")}
          />
          {errors.phone && <p role="alert" className="mt-1 text-xs text-red-700 dark:text-red-400">{errors.phone.message}</p>}
        </div>
        <div>
        <label htmlFor={uid + "-room"} className="sr-only">Room</label>
        <select id={uid + "-room"} className={cn(inputClass, "appearance-none")} {...register("roomId")}>
          {rooms.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name} — {formatINR(r.price)}
            </option>
          ))}
        </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor={uid + "-checkin"} className="mb-1.5 block text-xs font-semibold text-muted-foreground">Check-in</label>
          <input id={uid + "-checkin"} type="date" aria-invalid={errors.checkIn ? true : undefined} className={inputClass} {...register("checkIn")} />
          {errors.checkIn && <p role="alert" className="mt-1 text-xs text-red-700 dark:text-red-400">{errors.checkIn.message}</p>}
        </div>
        <div>
          <label htmlFor={uid + "-checkout"} className="mb-1.5 block text-xs font-semibold text-muted-foreground">Check-out</label>
          <input id={uid + "-checkout"} type="date" aria-invalid={errors.checkOut ? true : undefined} className={inputClass} {...register("checkOut")} />
          {errors.checkOut && <p role="alert" className="mt-1 text-xs text-red-700 dark:text-red-400">{errors.checkOut.message}</p>}
        </div>
        <div>
          <label htmlFor={uid + "-guests"} className="mb-1.5 block text-xs font-semibold text-muted-foreground">Guests</label>
          <input
            id={uid + "-guests"}
            aria-invalid={errors.guests ? true : undefined}
            type="number"
            inputMode="numeric"
            min={1}
            max={10}
            className={inputClass}
            {...register("guests", { valueAsNumber: true })}
          />
          {errors.guests && <p role="alert" className="mt-1 text-xs text-red-700 dark:text-red-400">{errors.guests.message}</p>}
        </div>
      </div>

      <label htmlFor={uid + "-message"} className="sr-only">Message (optional)</label>
      <textarea
        id={uid + "-message"}
        rows={3}
        placeholder="Anything else we should know? (optional)"
        className={inputClass}
        {...register("message")}
      />

      <Button type="submit" variant="gold" size="lg" disabled={isSubmitting} className="h-auto min-h-14 w-full whitespace-normal px-5 py-3 text-center">
        <Send className="h-4 w-4" /> Send Booking Request via WhatsApp
      </Button>

      <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <Lock className="h-3 w-3" /> No payment is taken on this website — availability and rates are confirmed with the host.
      </p>
    </form>
  );
}
