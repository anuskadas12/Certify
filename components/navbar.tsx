'use client'
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { ConnectWallet } from "@/components/connect-wallet/page "

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Empty space for balance */}
            <div className="w-10"></div>

            {/* Desktop Navigation with Logo and Blur/Shadow */}
            <div className="hidden md:flex items-center gap-6 bg-background/80 backdrop-blur-md rounded-full px-8 py-3 shadow-lg border border-border/50">
              {/* Logo inside navigation */}
              <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
                <div className="relative">
                  <svg 
                    width="32" 
                    height="32" 
                    viewBox="0 0 40 40" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-primary"
                  >
                    {/* Outer hexagon */}
                    <path 
                      d="M20 2L32 9V23L20 30L8 23V9L20 2Z" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      fill="currentColor" 
                      fillOpacity="0.1"
                    />
                    {/* Inner certificate shape */}
                    <rect 
                      x="12" 
                      y="12" 
                      width="16" 
                      height="12" 
                      rx="2" 
                      fill="currentColor" 
                      fillOpacity="0.8"
                    />
                    {/* Certificate lines */}
                    <line x1="15" y1="16" x2="25" y2="16" stroke="white" strokeWidth="1"/>
                    <line x1="15" y1="18" x2="23" y2="18" stroke="white" strokeWidth="1"/>
                    <line x1="15" y1="20" x2="25" y2="20" stroke="white" strokeWidth="1"/>
                    {/* Verification checkmark */}
                    <circle cx="24" cy="26" r="4" fill="currentColor"/>
                    <path d="M22 26L23 27L26 24" stroke="white" strokeWidth="1.5" fill="none"/>
                  </svg>
                </div>
              </Link>
              
              {/* Separator */}
              <div className="w-px h-6 bg-border/50"></div>
              
              {/* Navigation Links */}
              <Link href="/generate" className="text-foreground hover:text-primary transition-colors whitespace-nowrap">
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

            {/* Desktop Connect Wallet */}
            <div className="hidden md:block">
              <ConnectWallet />
            </div>

            {/* Mobile Menu Button with Logo */}
            <div className="md:hidden flex items-center gap-4">
              {/* Logo for mobile */}
              <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
                <div className="relative">
                  <svg 
                    width="32" 
                    height="32" 
                    viewBox="0 0 40 40" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-primary"
                  >
                    {/* Outer hexagon */}
                    <path 
                      d="M20 2L32 9V23L20 30L8 23V9L20 2Z" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      fill="currentColor" 
                      fillOpacity="0.1"
                    />
                    {/* Inner certificate shape */}
                    <rect 
                      x="12" 
                      y="12" 
                      width="16" 
                      height="12" 
                      rx="2" 
                      fill="currentColor" 
                      fillOpacity="0.8"
                    />
                    {/* Certificate lines */}
                    <line x1="15" y1="16" x2="25" y2="16" stroke="white" strokeWidth="1"/>
                    <line x1="15" y1="18" x2="23" y2="18" stroke="white" strokeWidth="1"/>
                    <line x1="15" y1="20" x2="25" y2="20" stroke="white" strokeWidth="1"/>
                    {/* Verification checkmark */}
                    <circle cx="24" cy="26" r="4" fill="currentColor"/>
                    <path d="M22 26L23 27L26 24" stroke="white" strokeWidth="1.5" fill="none"/>
                  </svg>
                </div>
              </Link>
              
              <button
                onClick={toggleMobileMenu}
                className="p-2 text-foreground hover:text-primary transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" 
          onClick={toggleMobileMenu} 
        />
      )}

      {/* Mobile Menu */}
      <div className={`md:hidden fixed top-0 right-0 z-50 w-80 h-full bg-background/95 backdrop-blur-lg border-l border-border transform transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center">
              {/* Custom Logo - smaller for mobile header */}
              <div className="relative">
                <svg 
                  width="32" 
                  height="32" 
                  viewBox="0 0 40 40" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-primary"
                >
                  {/* Outer hexagon */}
                  <path 
                    d="M20 2L32 9V23L20 30L8 23V9L20 2Z" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    fill="currentColor" 
                    fillOpacity="0.1"
                  />
                  {/* Inner certificate shape */}
                  <rect 
                    x="12" 
                    y="12" 
                    width="16" 
                    height="12" 
                    rx="2" 
                    fill="currentColor" 
                    fillOpacity="0.8"
                  />
                  {/* Certificate lines */}
                  <line x1="15" y1="16" x2="25" y2="16" stroke="white" strokeWidth="1"/>
                  <line x1="15" y1="18" x2="23" y2="18" stroke="white" strokeWidth="1"/>
                  <line x1="15" y1="20" x2="25" y2="20" stroke="white" strokeWidth="1"/>
                  {/* Verification checkmark */}
                  <circle cx="24" cy="26" r="4" fill="currentColor"/>
                  <path d="M22 26L23 27L26 24" stroke="white" strokeWidth="1.5" fill="none"/>
                </svg>
              </div>
            </div>
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <div className="flex-1 px-6 py-8">
            <div className="space-y-4">
              <Link 
                href="/generate" 
                onClick={toggleMobileMenu}
                className="block px-4 py-3 text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200 font-medium"
              >
                Create Certificate
              </Link>
              <Link 
                href="/verification" 
                onClick={toggleMobileMenu}
                className="block px-4 py-3 text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200 font-medium"
              >
                Verification
              </Link>
              <a 
                href="#features" 
                onClick={toggleMobileMenu}
                className="block px-4 py-3 text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200 font-medium"
              >
                Features
              </a>
              <a 
                href="#contact" 
                onClick={toggleMobileMenu}
                className="block px-4 py-3 text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200 font-medium"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Mobile Connect Wallet */}
          <div className="p-6 border-t border-border">
            <ConnectWallet />
          </div>
        </div>
      </div>
    </>
  )
}