/**
 * Single source of truth for parish identity, contact details and canonical
 * URLs. Anything user-visible about "who/where the parish is" lives here so the
 * footer, contact band, structured data, RSS feed and sitemap never drift.
 */

export const SITE_URL = "https://sanktuariumkotlow.pl";

export const PARISH = {
  name: "Parafia Rzymsko-katolicka w Kotłowie",
  shortName: "Sanktuarium Kotłów",
  patron: "Parafia Narodzenia Najświętszej Maryi Panny",
  deanery: "dekanat mikstacki",
  diocese: "diecezja kaliska",

  phoneDisplay: "573 791 098",
  phoneHref: "tel:+48573791098",
  phoneE164: "+48573791098",

  email: "kotlow@diec.pl",
  emailHref: "mailto:kotlow@diec.pl",

  facebookUrl: "https://facebook.com/ParafiaKotlow",
  facebookLabel: "Parafia Kotłów",

  bankAccount: "52 9256 0004 0082 1416 2000 0040",

  address: {
    street: "Kotłów 1",
    postalCode: "63-510",
    locality: "Kotłów",
    region: "wielkopolskie",
    country: "PL",
    /** One-line human-readable form. */
    full: "Kotłów 1, 63-510 Kotłów",
  },

  /** Google Maps search deep-link to the church (used by footer + JSON-LD). */
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Ko%C5%9Bci%C3%B3%C5%82+Narodzenia+NMP+Kot%C5%82%C3%B3w",
} as const;
