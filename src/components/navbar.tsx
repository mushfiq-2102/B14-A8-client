"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HandHeart, LogOut, Menu, X } from "lucide-react";
import { cn } from "cn";

import { authClient } from "@/lib/auth-client";
import { notifySuccess } from "@/lib/notify";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [{ href: "/upcoming-events", label: "Upcoming Events" }];

const profileLinks = [
  { href: "/create-event", label: "Create Event" },
  { href: "/manage-events", label: "Manage Events" },
  { href: "/joined-events", label: "Joined Events" },
  { href: "/profile", label: "My Profile" },
];

export function Navbar() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleSignout = async () => {
    await authClient.signOut();
    setMenuOpen(false);
    setPopoverOpen(false);
    notifySuccess("Logged out", "See you at the next event!");
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-10">
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-bold tracking-tight text-primary"
          >
            <HandHeart className="size-7" />
            HandInHand
          </Link>

          <ul className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname.startsWith(link.href)
                      ? "text-primary"
                      : "text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          {user ? (
            <>
              <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <div className="group/avatar relative">
                  <PopoverTrigger
                    render={
                      <button
                        type="button"
                        aria-label="Open profile menu"
                        className="rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                      />
                    }
                  >
                    <Avatar>
                      <AvatarImage
                        referrerPolicy="no-referrer"
                        src={user.image as string}
                      />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </PopoverTrigger>
                  <span className="pointer-events-none absolute top-full right-0 mt-2 hidden rounded-md bg-foreground px-2.5 py-1 text-xs whitespace-nowrap text-background group-hover/avatar:block">
                    {user.name}
                  </span>
                </div>
                <PopoverContent align="end" className="w-52">
                  {profileLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setPopoverOpen(false)}
                      className="rounded-md px-2.5 py-2 text-sm hover:bg-muted"
                    >
                      {link.label}
                    </Link>
                  ))}
                </PopoverContent>
              </Popover>
              <Button onClick={handleSignout} variant="outline">
                <LogOut />
                Logout
              </Button>
            </>
          ) : (
            <Button render={<Link href="/login" />} nativeButton={false}>
              Login
            </Button>
          )}
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-border bg-background px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-1">
            {[...navLinks, ...(user ? profileLinks : [])].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-md px-2 py-2.5 text-sm font-medium hover:bg-muted"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
            {user ? (
              <>
                <Avatar>
                  <AvatarImage
                    referrerPolicy="no-referrer"
                    src={user.image as string}
                  />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="flex-1 truncate text-sm font-medium">
                  {user.name}
                </span>
                <Button onClick={handleSignout} variant="outline">
                  <LogOut />
                  Logout
                </Button>
              </>
            ) : (
              <Button
                render={<Link href="/login" />}
                nativeButton={false}
                onClick={() => setMenuOpen(false)}
                className="w-full"
              >
                Login
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
