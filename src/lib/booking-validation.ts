import type { FieldErrors, Resolver } from "react-hook-form";

export type BookingFormValues = {
  name: string;
  email: string;
  phone: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  message?: string;
};

/**
 * Validation for the booking enquiry form.
 *
 * This is a tiny hand-written resolver with the same rules as the schema it
 * replaced — it removes the ~100 KB (gzipped) validation library from the
 * homepage download without changing what a visitor experiences.
 */
export const bookingResolver: Resolver<BookingFormValues> = async (values) => {
  const errors: FieldErrors<BookingFormValues> = {};
  const fail = (field: keyof BookingFormValues, message: string) => {
    errors[field] = { type: "validation", message } as never;
  };

  if ((values.name ?? "").length < 2) fail("name", "Please enter your full name");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email ?? "")) fail("email", "Enter a valid email");
  if ((values.phone ?? "").length < 8) fail("phone", "Enter a valid phone number");
  if (!values.checkIn) fail("checkIn", "Select a check-in date");
  if (!values.checkOut) fail("checkOut", "Select a check-out date");
  if (!(values.guests >= 1 && values.guests <= 10)) fail("guests", "Guests must be between 1 and 10");

  return Object.keys(errors).length ? { values: {}, errors } : { values, errors: {} };
};
