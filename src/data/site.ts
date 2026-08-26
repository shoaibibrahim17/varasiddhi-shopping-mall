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

  announcement: "Cash on Delivery available · Order on WhatsApp",

  /** Payment notes shown in the cart and on product pages. */
  payments: {
    cod: "Cash on Delivery — pay when your order arrives.",
    prepaidNote: "Prepaid (UPI / card) is being integrated and launches after client approval.",
  },
} as const;
