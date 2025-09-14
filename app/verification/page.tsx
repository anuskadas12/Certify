"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Shield, Search, CheckCircle, XCircle, Upload, FileText } from "lucide-react"

export default function VerificationPage() {
  const [certificateId, setCertificateId] = useState("")
  const [verificationResult, setVerificationResult] = useState<any>(null)
  const [isVerifying, setIsVerifying] = useState(false)

  const handleVerification = async () => {
    if (!certificateId.trim()) return

    setIsVerifying(true)

    // Simulate verification process
    setTimeout(() => {
      // Mock verification result
      const mockResult = {
        isValid: Math.random() > 0.3, // 70% chance of valid certificate
        certificateDetails: {
          studentName: "John Doe",
          degree: "Bachelor of Computer Science",
          institution: "Tech University",
          graduationDate: "May 2023",
          certificateId: certificateId,
          issueDate: "June 15, 2023",
          blockchainHash: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef12",
        },
      }
      setVerificationResult(mockResult)
      setIsVerifying(false)
    }, 2000)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Certificate Verification</h1>
            <p className="text-xl text-muted-foreground">
              Verify the authenticity of academic and professional certificates instantly
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Verification Input Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Verify Certificate
                </CardTitle>
                <CardDescription>
                  Enter the certificate ID or upload a certificate file to verify its authenticity
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Certificate ID</label>
                  <Input
                    placeholder="Enter certificate ID (e.g., CERT-2023-001234)"
                    value={certificateId}
                    onChange={(e) => setCertificateId(e.target.value)}
                    className="mb-4"
                  />
                </div>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">OR</p>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Certificate File
                  </Button>
                </div>

                <Button onClick={handleVerification} disabled={!certificateId.trim() || isVerifying} className="w-full">
                  {isVerifying ? "Verifying..." : "Verify Certificate"}
                </Button>
              </CardContent>
            </Card>

            {/* Verification Result Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Verification Result
                </CardTitle>
                <CardDescription>The verification result will appear here</CardDescription>
              </CardHeader>
              <CardContent>
                {!verificationResult && !isVerifying && (
                  <div className="text-center py-8 text-muted-foreground">
                    Enter a certificate ID and click verify to see results
                  </div>
                )}

                {isVerifying && (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Verifying certificate on blockchain...</p>
                  </div>
                )}

                {verificationResult && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      {verificationResult.isValid ? (
                        <>
                          <CheckCircle className="h-6 w-6 text-green-500" />
                          <Badge variant="default" className="bg-green-500">
                            Valid Certificate
                          </Badge>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-6 w-6 text-red-500" />
                          <Badge variant="destructive">Invalid Certificate</Badge>
                        </>
                      )}
                    </div>

                    {verificationResult.isValid && (
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Student Name</label>
                          <p className="font-medium">{verificationResult.certificateDetails.studentName}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Degree</label>
                          <p className="font-medium">{verificationResult.certificateDetails.degree}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Institution</label>
                          <p className="font-medium">{verificationResult.certificateDetails.institution}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Graduation Date</label>
                          <p className="font-medium">{verificationResult.certificateDetails.graduationDate}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Blockchain Hash</label>
                          <p className="font-mono text-sm break-all">
                            {verificationResult.certificateDetails.blockchainHash}
                          </p>
                        </div>
                      </div>
                    )}

                    {!verificationResult.isValid && (
                      <div className="text-red-600">
                        <p>This certificate could not be verified. It may be:</p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li>Invalid or tampered with</li>
                          <li>Not issued through our blockchain system</li>
                          <li>Expired or revoked</li>
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* How Verification Works */}
          {/* <Card className="mt-8">
            <CardHeader>
              <CardTitle>How Blockchain Verification Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Submit Certificate ID</h3>
                  <p className="text-sm text-muted-foreground">
                    Enter the unique certificate identifier or upload the certificate file
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Blockchain Lookup</h3>
                  <p className="text-sm text-muted-foreground">
                    Our system queries the blockchain for the certificate's immutable record
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Instant Results</h3>
                  <p className="text-sm text-muted-foreground">
                    Get verification results in seconds with complete certificate details
                  </p>
                </div>
              </div>
            </CardContent>
          </Card> */}
        </div>
      </div>

      <Footer />
    </main>
  )
}
