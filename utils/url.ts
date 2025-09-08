export function absoluteUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "https://08-zustand-eosin-nine.vercel.app/";
  return new URL(path, base).toString();
}