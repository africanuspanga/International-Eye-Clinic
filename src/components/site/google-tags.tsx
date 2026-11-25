import Script from "next/script";
import { getSettings } from "@/lib/cms/content";
import { GOOGLE_TAG_DEFAULTS } from "@/lib/cms/collections";

// IDs are validated so only a genuine Google ID can reach the inline script.
const VALID = {
  ga4: /^G-[A-Z0-9]{4,20}$/,
  gtm: /^GTM-[A-Z0-9]{4,12}$/,
  ads: /^AW-[0-9]{6,15}$/,
};

type TagKey = keyof typeof GOOGLE_TAG_DEFAULTS;

export async function getGoogleTagIds() {
  const settings = await getSettings();
  // A value saved in Admin → Settings wins (an empty value switches the tag
  // off). If the setting was never saved or settings can't be loaded, fall
  // back to the env var, then to the clinic's built-in default.
  const pick = (key: TagKey, env: string | undefined, re: RegExp) => {
    const raw = key in settings ? settings[key] : env || GOOGLE_TAG_DEFAULTS[key];
    const v = (raw ?? "").trim().toUpperCase();
    return re.test(v) ? v : "";
  };
  return {
    gtm: pick("gtm_container_id", process.env.NEXT_PUBLIC_GTM_ID, VALID.gtm),
    ga4: pick("ga4_measurement_id", process.env.NEXT_PUBLIC_GA_ID, VALID.ga4),
    ads: pick("google_ads_id", process.env.NEXT_PUBLIC_GOOGLE_ADS_ID, VALID.ads),
  };
}

/** Google Tag Manager container + optional GA4 / Google Ads (gtag.js). */
export async function GoogleTags() {
  const { gtm, ga4, ads } = await getGoogleTagIds();
  const gtagIds = [ga4, ads].filter(Boolean);
  if (!gtm && gtagIds.length === 0) return null;

  // Same setup as Google's container snippet: dataLayer + gtag('js'), then the
  // GTM loader (with the standard gtm.start event) and any gtag configs.
  const init = [
    "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());",
    gtm ? "dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});" : "",
    ...gtagIds.map((id) => `gtag('config','${id}');`),
  ].join("");

  return (
    <>
      <Script id="google-tags-init" strategy="afterInteractive">
        {init}
      </Script>
      {gtm && <Script id="gtm-loader" src={`https://www.googletagmanager.com/gtm.js?id=${gtm}`} strategy="afterInteractive" />}
      {gtagIds.length > 0 && (
        <Script id="gtag-loader" src={`https://www.googletagmanager.com/gtag/js?id=${gtagIds[0]}`} strategy="afterInteractive" />
      )}
    </>
  );
}

/** Tag Manager <noscript> fallback — render as the first child of <body>. */
export async function GoogleTagManagerNoScript() {
  const { gtm } = await getGoogleTagIds();
  if (!gtm) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtm}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
