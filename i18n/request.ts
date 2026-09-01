import { cookies, headers } from "next/headers";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const savedLocale = cookieStore.get("NEXT_LOCALE")?.value;

  const requestHeaders = await headers();
  const acceptLanguage = requestHeaders.get("accept-language");

  const preferredLanguage = acceptLanguage?.split(",")[0]?.trim().toLowerCase();

  const browserLocale = preferredLanguage?.startsWith("ja") ? "ja" : "en";

  const locale =
    savedLocale === "ja" || savedLocale === "en" ? savedLocale : browserLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
