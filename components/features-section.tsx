import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Zap, Eye, RefreshCw } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: "Immutable Proof",
      description:
        "Blockchain-backed certificates that cannot be tampered with or forged, ensuring complete authenticity.",
    },
    {
      icon: Zap,
      title: "Instant Verification",
      description: "Verify certificates in under 1 minute instead of waiting days for manual verification processes.",
    },
    {
      icon: Eye,
      title: "Public Auditing",
      description: "Publicly auditable verification system while maintaining privacy of sensitive student information.",
    },
    {
      icon: RefreshCw,
      title: "Revocation Support",
      description: "Institutions can revoke or update records when legitimately required through secure processes.",
    },
  ]

  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Why Choose BlockCertify?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Our platform addresses the persistent issues of fake credentials with cutting-edge blockchain technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <feature.icon className="h-12 w-12 text-secondary mx-auto mb-4" />
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-pretty">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
