import "./globals.css";
import { cookies } from "next/headers"
import type { ReactNode } from "react"
import Link from "next/link"
import { ThemeProvider } from "@/components/ThemeProvider"
import { ThemeToggle } from "@/components/ThemeToggle"

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const cookieStore = await cookies()
  const themeFromCookie = cookieStore.get("theme")?.value
  const theme: "light" | "dark" = (themeFromCookie === "light" || themeFromCookie === "dark")
    ? themeFromCookie
    : "light"

  return (
    <html lang="id" className={theme === "dark" ? "dark" : ""} suppressHydrationWarning>
      <body>
        <ThemeProvider initialTheme={theme}>
          <header className="border-b bg-card">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
              <Link href="/" className="font-semibold text-text">
                ECGO Ops
              </Link>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted">Battery Swap Monitoring</span>
                <ThemeToggle />
              </div>
            </div>
          </header>
          <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}