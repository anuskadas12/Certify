import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

export function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "Institution Issues Certificate",
      description:
        "Universities and training centers mint signed certificate tokens on the blockchain with institutional authority and verification.",
    },
    {
      step: "02",
      title: "Graduate Receives Credentials",
      description:
        "Certificate holders store secure links and credentials in their digital wallet, maintaining full control over their achievements.",
    },
    {
      step: "03",
      title: "Instant Verification",
      description:
        "Employers and verifiers can validate certificate authenticity instantly without contacting institutions directly.",
    },
  ]

  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">How BlockCertify Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            A simple three-step process that revolutionizes certificate verification for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold text-lg">
                      {step.step}
                    </div>
                    {index < steps.length - 1 && (
                      <ArrowRight className="hidden lg:block h-6 w-6 text-muted-foreground absolute -right-4 top-8" />
                    )}
                  </div>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-pretty text-base">{step.description}</CardDescription>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
