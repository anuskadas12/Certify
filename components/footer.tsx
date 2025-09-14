import { Shield } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-8 w-8 text-secondary" />
              <span className="text-xl font-bold">BlockCertify</span>
            </div>
            <p className="text-background/80 text-pretty max-w-md">
              Revolutionizing certificate verification with blockchain technology. Secure, instant, and tamper-proof
              credential validation for the digital age.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-background/80">
              <li>
                <a href="#" className="hover:text-secondary transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-background/80">
              <li>
                <a href="#" className="hover:text-secondary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/60">
          <p>&copy; 2024 BlockCertify. All rights reserved. Built with blockchain technology for a secure future.</p>
        </div>
      </div>
    </footer>
  )
}
