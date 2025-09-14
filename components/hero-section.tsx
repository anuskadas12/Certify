import { Button } from "@/components/ui/button"
import { Shield, Clock, Users, BookOpen } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
            Decentralized Degree & Certificate <span className="text-primary">Verification</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground text-pretty mb-8 leading-relaxed">
            A tamper-proof, blockchain-backed system to issue, store, and verify academic and professional certificates
            instantly without contacting institutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" variant="outline" className="flex items-center gap-2 bg-transparent">
              <BookOpen className="h-4 w-4" />
              Learn More
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="flex flex-col items-center text-center">
              <Clock className="h-12 w-12 text-secondary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Instant Verification</h3>
              <p className="text-muted-foreground">Reduce verification time from days to under 1 minute</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <Shield className="h-12 w-12 text-secondary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Blockchain Security</h3>
              <p className="text-muted-foreground">Immutable proof with zero successful tampering incidents</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <Users className="h-12 w-12 text-secondary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Privacy Preserving</h3>
              <p className="text-muted-foreground">No sensitive student data revealed on-chain</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
