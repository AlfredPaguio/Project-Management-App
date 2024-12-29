import { useState, PropsWithChildren, ReactNode } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { PageProps, User } from "@/types";
import FlashMessage from "@/Components/FlashMessage";
import { ThemeToggle } from "@/Components/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Button } from "@/Components/ui/button";
import { LogOutIcon, MenuIcon, UserIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";

interface Props {
  user: User;
  header?: ReactNode;
}

export default function Authenticated({
  user,
  header,
  children,
}: PropsWithChildren<Props>) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "dashboard", label: "Dashboard" },
    { href: "project.index", label: "Projects" },
    { href: "task.index", label: "All Tasks" },
    { href: "task.myTasks", label: "My Tasks" },
    { href: "user.index", label: "Users" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0">
                <ApplicationLogo className="block h-9 w-auto fill-current text-primary" />
              </Link>
              <div className="hidden md:flex md:items-center md:ml-10 md:space-x-8">
                {navItems.map((item) => (
                  <NavItem
                    key={item.href}
                    href={route(item.href)}
                    active={route().current(item.href)}
                  >
                    {item.label}
                  </NavItem>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-x-2">
              <ThemeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem className="flex flex-col items-start">
                    <div className="text-sm font-medium">{user.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {user.email}
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      href={route("profile.edit")}
                      className="w-full flex items-center"
                    >
                      <UserIcon className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href={route("logout")}
                      method="post"
                      as="button"
                      className="w-full flex items-center"
                    >
                      <LogOutIcon className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" className="md:hidden" size="icon">
                    <MenuIcon className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <nav className="flex flex-col space-y-4">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`text-sm font-medium transition-colors hover:text-primary ${
                          route().current(item.href)
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {header && (
        <header className="bg-background">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            {header}
          </div>
        </header>
      )}

      <FlashMessage />

      <main>{children}</main>
    </div>
  );
}

const NavItem = ({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className={`text-sm font-medium transition-colors hover:text-primary ${
      active ? "text-primary" : "text-muted-foreground"
    }`}
  >
    {children}
  </Link>
);
