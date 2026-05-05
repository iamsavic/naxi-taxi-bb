import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Ime mora imati najmanje 2 karaktera").max(100),
  phone: z
    .string()
    .min(6, "Unesite validan broj telefona")
    .max(20)
    .regex(/^[0-9+\s\-()]+$/, "Unesite validan broj telefona"),
  email: z.string().email("Unesite validnu email adresu").optional().or(z.literal("")),
  message: z.string().min(10, "Poruka mora imati najmanje 10 karaktera").max(2000),
});

export const rideRequestSchema = z.object({
  name: z.string().min(2).max(100),
  phone: z
    .string()
    .min(6)
    .max(20)
    .regex(/^[0-9+\s\-()]+$/),
  pickup: z.string().min(3, "Unesite adresu polaska").max(200),
  destination: z.string().min(3, "Unesite destinaciju").max(200),
  date: z.string().min(1, "Izaberite datum"),
  time: z.string().min(1, "Izaberite vreme"),
  note: z.string().max(500).optional(),
});

export const airportSchema = z.object({
  name: z.string().min(2).max(100),
  phone: z
    .string()
    .min(6)
    .max(20)
    .regex(/^[0-9+\s\-()]+$/),
  pickup: z.string().min(3).max(200),
  date: z.string().min(1),
  time: z.string().min(1),
  passengers: z.coerce.number().min(1).max(8),
  luggage: z.coerce.number().min(0).max(10),
  note: z.string().max(500).optional(),
});

export const businessSchema = z.object({
  company: z.string().min(2, "Unesite naziv firme").max(200),
  contactPerson: z.string().min(2).max(100),
  phone: z
    .string()
    .min(6)
    .max(20)
    .regex(/^[0-9+\s\-()]+$/),
  email: z.string().email("Unesite validnu email adresu"),
  message: z.string().min(10).max(2000),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type RideRequestInput = z.infer<typeof rideRequestSchema>;
export type AirportInput = z.infer<typeof airportSchema>;
export type BusinessInput = z.infer<typeof businessSchema>;
