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

  announcement: "Catalogue preview now live | WhatsApp enquiry enabled | Online ordering integration planned",

  /** Payment notes shown in the enquiry bag and on product pages. */
  payments: {
    cod: "Payment and availability are confirmed by the store team on WhatsApp.",
    prepaidNote: "Online payment integration is planned for a later release after store approval.",
  },
} as const;

