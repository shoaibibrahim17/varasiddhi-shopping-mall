/**
 * Central store configuration.
 * All customer-facing claims must stay truthful — do not add unverified
 * shipping/return/service promises here.
 */
export const site = {
  name: "Shri Varasiddhi Shopping Mall",
  shortName: "Varasiddhi",

  /**
   * PLACEHOLDER — orders are handed to WhatsApp through wa.me links.
   * Replace with the store's real number (country code + number, digits only).
   * Example: "9194XXXXXXXX"
   */
  whatsappNumber: "8732223101",

  announcement: "Explore the collection · Enquire on WhatsApp",

  /** Enquiry notes shown in the enquiry bag and on product pages. */
  payments: {
    cod: "The store team will confirm availability, pricing, and delivery details on WhatsApp.",
    prepaidNote: "This is an enquiry, not a completed order. Final details are confirmed by the store team.",
  },
} as const;
