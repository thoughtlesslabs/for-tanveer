"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, User, LogOut } from "lucide-react"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false) // This would be replaced with actual auth state
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="lg:hidden">
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  href="/"
                  className={`text-lg font-medium ${isActive("/") ? "text-green-600" : "text-foreground"}`}
                >
                  Home
                </Link>
                <Link
                  href="/ngos"
                  className={`text-lg font-medium ${isActive("/ngos") ? "text-green-600" : "text-foreground"}`}
                >
                  NGOs
                </Link>
                <Link
                  href="/about"
                  className={`text-lg font-medium ${isActive("/about") ? "text-green-600" : "text-foreground"}`}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className={`text-lg font-medium ${isActive("/contact") ? "text-green-600" : "text-foreground"}`}
                >
                  Contact
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-xl">NGO Connect</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 ml-6">
            <Link
              href="/"
              className={`text-sm font-medium ${isActive("/") ? "text-green-600" : "text-foreground"} transition-colors hover:text-green-600`}
            >
              Home
            </Link>
            <Link
              href="/ngos"
              className={`text-sm font-medium ${isActive("/ngos") ? "text-green-600" : "text-foreground"} transition-colors hover:text-green-600`}
            >
              NGOs
            </Link>
            <Link
              href="/about"
              className={`text-sm font-medium ${isActive("/about") ? "text-green-600" : "text-foreground"} transition-colors hover:text-green-600`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`text-sm font-medium ${isActive("/contact") ? "text-green-600" : "text-foreground"} transition-colors hover:text-green-600`}
            >
              Contact
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-500 cursor-pointer" onClick={() => setIsLoggedIn(false)}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-green-600 hover:bg-green-700">Register</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
