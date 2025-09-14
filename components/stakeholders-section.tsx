import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Building2, UserCheck, Settings, Scale } from "lucide-react"

export function StakeholdersSection() {
  const stakeholders = [
    {
      icon: Building2,
      title: "Issuers",
      subtitle: "Universities & Training Centers",
      description: "Create and issue tamper-proof certificates on the blockchain with institutional authority.",
    },
    {
      icon: GraduationCap,
      title: "Holders",
      subtitle: "Graduates & Certificate Recipients",
      description: "Manage and share verified credentials with complete control over your academic achievements.",
    },
    {
      icon: UserCheck,
      title: "Verifiers",
      subtitle: "Employers & Institutions",
      description: "Instantly verify certificate authenticity without lengthy manual verification processes.",
    },
    {
      icon: Settings,
      title: "System Admins",
      subtitle: "Platform Management",
      description: "Oversee onboarding, access control, and system monitoring for optimal performance.",
    },
    {
      icon: Scale,
      title: "Regulatory Bodies",
      subtitle: "Oversight & Compliance",
      description: "Ensure compliance with educational standards and regulatory requirements.",
    },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Built for All Stakeholders</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            BlockCertify serves the entire educational ecosystem with tailored solutions for each stakeholder.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stakeholders.map((stakeholder, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <stakeholder.icon className="h-10 w-10 text-secondary mb-3" />
                <CardTitle className="text-lg">{stakeholder.title}</CardTitle>
                <CardDescription className="font-medium text-primary">{stakeholder.subtitle}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-pretty">{stakeholder.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
