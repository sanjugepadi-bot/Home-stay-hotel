"use client";

import { useState } from "react";
import { Coins } from "lucide-react";
import { lowestRoomPrice } from "@/data/rooms";

// Static illustrative rates (INR base). Swap for a live rates API in production.
const RATES: Record<string, number> = {
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0095,
  AED: 0.044,
  SGD: 0.016,
};

export function CurrencyConverter() {
  const [amount, setAmount] = useState(lowestRoomPrice);
  const [currency, setCurrency] = useState("USD");

  const converted = (amount * RATES[currency]).toFixed(2);

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.06)]">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
        <Coins className="h-4 w-4 text-gold-deep" /> Currency Converter
      </div>
      <div className="mt-3.5 flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">₹</span>
        <input
          type="number"
          aria-label="Amount in rupees"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="min-h-11 w-24 rounded-lg border border-border bg-background/80 px-2 py-1.5 text-base text-foreground focus:border-gold focus:outline-none sm:text-sm"
        />
        <span className="text-sm font-medium text-muted-foreground">=</span>
        <select
          aria-label="Convert to currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="min-h-11 rounded-lg border border-border bg-background/80 px-2 py-1.5 text-base text-foreground focus:border-gold focus:outline-none sm:text-sm"
        >
          {Object.keys(RATES).map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <p className="mt-3 text-xl text-forest dark:text-gold-light">
        {converted} {currency}
      </p>
      <p className="mt-1.5 text-[11px] text-muted-foreground">Illustrative rate — confirm exact rate at time of payment.</p>
    </div>
  );
}
