import { Button } from "@/components/ui/button"
import { Shield } from "lucide-react"
import Link from "next/link"

export function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">BlockCertify</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/generate" className="text-foreground hover:text-primary transition-colors">
              Create Certificate
            </Link>
            <Link href="/verification" className="text-foreground hover:text-primary transition-colors">
              Verification
            </Link>
            <a href="#features" className="text-foreground hover:text-primary transition-colors">
              Features
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </div>

          <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
            Connect Wallet
          </Button>
        </div>
      </div>
    </nav>
  )
}