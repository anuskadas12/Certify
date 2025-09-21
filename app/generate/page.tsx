"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FileText, Hash, ExternalLink, Download, Copy, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Navbar } from "@/components/navbar" // Import the Navbar component

interface CertificateData {
  studentName: string
  degree: string
  institution: string
  graduationDate: string
  gpa: string
  additionalInfo: string
}

interface BlockchainToken {
  hash: string
  certificateLink: string
  tokenId: string
  blockchainAddress: string
  timestamp: string
}

export default function GenerateCertificate() {
  const [certificateData, setCertificateData] = useState<CertificateData>({
    studentName: "",
    degree: "",
    institution: "",
    graduationDate: "",
    gpa: "",
    additionalInfo: "",
  })

  const [generatedHash, setGeneratedHash] = useState<string>("")
  const [blockchainToken, setBlockchainToken] = useState<BlockchainToken | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState<string>("")
  const { toast } = useToast()

  // Simple hash function for demonstration (in production, use crypto libraries)
  const generateHash = (data: string): string => {
    let hash = 0
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16).padStart(8, "0")
  }

  const handleInputChange = (field: keyof CertificateData, value: string) => {
    setCertificateData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const generateCertificateHash = async () => {
    if (!certificateData.studentName || !certificateData.degree || !certificateData.graduationDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Create certificate data string
    const dataString = `${certificateData.studentName}|${certificateData.degree}|${certificateData.institution}|${certificateData.graduationDate}|${certificateData.gpa}|${certificateData.additionalInfo}`

    // Generate hash
    const hash = generateHash(dataString)
    setGeneratedHash(hash)

    // Generate mock blockchain token
    const certificateLink = `https://blockcertify.com/certificate/${hash}`
    const token: BlockchainToken = {
      hash: hash,
      certificateLink: certificateLink,
      tokenId: `BC-${hash.substring(0, 6).toUpperCase()}`,
      blockchainAddress: `0x${generateHash(hash + Date.now()).substring(0, 40)}`,
      timestamp: new Date().toISOString(),
    }

    setBlockchainToken(token)
    setIsGenerating(false)

    toast({
      title: "Certificate Generated!",
      description: "Your certificate has been hashed and stored on the blockchain.",
    })
  }

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(type)
      setTimeout(() => setCopied(""), 2000)
      toast({
        title: "Copied!",
        description: `${type} copied to clipboard.`,
      })
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy to clipboard.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Generate Certificate</h1>
            <p className="text-xl text-muted-foreground">
              Create a blockchain-verified digital certificate with secure hash generation
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Certificate Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Certificate Information
                </CardTitle>
                <CardDescription>Enter the student and degree information for the certificate</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="studentName">Student Name *</Label>
                  <Input
                    id="studentName"
                    placeholder="Enter full name"
                    value={certificateData.studentName}
                    onChange={(e) => handleInputChange("studentName", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="degree">Degree *</Label>
                  <Select onValueChange={(value) => handleInputChange("degree", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select degree type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bachelor-cs">Bachelor of Computer Science</SelectItem>
                      <SelectItem value="bachelor-eng">Bachelor of Engineering</SelectItem>
                      <SelectItem value="bachelor-bus">Bachelor of Business</SelectItem>
                      <SelectItem value="master-cs">Master of Computer Science</SelectItem>
                      <SelectItem value="master-eng">Master of Engineering</SelectItem>
                      <SelectItem value="master-mba">Master of Business Administration</SelectItem>
                      <SelectItem value="phd-cs">PhD in Computer Science</SelectItem>
                      <SelectItem value="phd-eng">PhD in Engineering</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="institution">Institution</Label>
                  <Input
                    id="institution"
                    placeholder="University or institution name"
                    value={certificateData.institution}
                    onChange={(e) => handleInputChange("institution", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="graduationDate">Graduation Date *</Label>
                  <Input
                    id="graduationDate"
                    type="date"
                    value={certificateData.graduationDate}
                    onChange={(e) => handleInputChange("graduationDate", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gpa">GPA</Label>
                  <Input
                    id="gpa"
                    placeholder="e.g., 3.85"
                    value={certificateData.gpa}
                    onChange={(e) => handleInputChange("gpa", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalInfo">Additional Information</Label>
                  <Textarea
                    id="additionalInfo"
                    placeholder="Honors, specializations, etc."
                    value={certificateData.additionalInfo}
                    onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                  />
                </div>

                <Button onClick={generateCertificateHash} disabled={isGenerating} className="w-full">
                  {isGenerating ? "Generating..." : "Generate Certificate & Hash"}
                </Button>
              </CardContent>
            </Card>

            {/* Blockchain Results */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {/* <Hash className="h-5 w-5" /> */}
                  Certificate
                </CardTitle>
                {/* <CardDescription>Generated hash and blockchain storage information</CardDescription> */}
              </CardHeader>
              <CardContent>
                {!blockchainToken ? (
                  <div className="text-center py-8 text-muted-foreground">
                    {/* <Hash className="h-12 w-12 mx-auto mb-4 opacity-50" /> */}
                    {/* <p>Fill out the certificate form and click generate to create the blockchain token</p> */}
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <Label className="text-sm font-medium">Certificate Hash</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <code className="flex-1 p-2 bg-muted rounded text-sm font-mono">{blockchainToken.hash}</code>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(blockchainToken.hash, "Hash")}
                        >
                          {copied === "Hash" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Certificate Link</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <code className="flex-1 p-2 bg-muted rounded text-sm font-mono break-all">
                          {blockchainToken.certificateLink}
                        </code>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(blockchainToken.certificateLink, "Link")}
                        >
                          {copied === "Link" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Token ID:</span>
                        <Badge variant="secondary">{blockchainToken.tokenId}</Badge>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Blockchain Address:</span>
                        <code className="text-xs font-mono bg-muted px-2 py-1 rounded">
                          {blockchainToken.blockchainAddress.substring(0, 10)}...
                        </code>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Timestamp:</span>
                        <span className="text-xs">{new Date(blockchainToken.timestamp).toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1 bg-transparent">
                        <Download className="h-4 w-4 mr-2" />
                        Download Certificate
                      </Button>
                      <Button variant="outline" className="flex-1 bg-transparent">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View on Blockchain
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}