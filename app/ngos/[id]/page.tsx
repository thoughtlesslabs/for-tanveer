"use client"

import type React from "react"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { MapPin, Calendar, Clock, Globe, Phone, Mail, FileText, CheckCircle } from "lucide-react"

// Mock data for a single NGO
const ngoData = {
  id: 1,
  name: "Environmental Guardians",
  category: "Environment",
  location: "New York, USA",
  description:
    "Environmental Guardians is a non-profit organization dedicated to protecting natural habitats and promoting sustainable practices. Founded in 2005, we work on conservation projects, community education, and advocacy for environmental policies.",
  mission:
    "Our mission is to preserve and restore natural ecosystems through community engagement, education, and direct conservation efforts.",
  website: "www.environmentalguardians.org",
  phone: "+1 (555) 123-4567",
  email: "info@environmentalguardians.org",
  image: "/placeholder.svg?height=300&width=800&text=Environmental Guardians",
  opportunities: [
    {
      id: 101,
      title: "Forest Conservation Volunteer",
      type: "In-person",
      commitment: "Weekly, 4-8 hours",
      duration: "3 months",
      location: "Adirondack Mountains, NY",
      description:
        "Join our team in monitoring forest health, planting native trees, and maintaining hiking trails in protected forest areas.",
      skills: ["Physical fitness", "Basic ecology knowledge", "Outdoor experience"],
    },
    {
      id: 102,
      title: "Environmental Education Assistant",
      type: "In-person",
      commitment: "Weekends, 3-4 hours",
      duration: "Ongoing",
      location: "New York City, NY",
      description:
        "Help develop and deliver educational programs about environmental conservation for schools and community groups.",
      skills: ["Teaching experience", "Communication skills", "Environmental knowledge"],
    },
    {
      id: 103,
      title: "Social Media Coordinator",
      type: "Remote",
      commitment: "5-10 hours weekly",
      duration: "6 months",
      location: "Remote",
      description:
        "Manage our social media presence to raise awareness about environmental issues and promote our conservation initiatives.",
      skills: ["Social media expertise", "Content creation", "Environmental interest"],
    },
    {
      id: 104,
      title: "Grant Research Assistant",
      type: "Remote",
      commitment: "Flexible, 5-15 hours weekly",
      duration: "3-6 months",
      location: "Remote",
      description:
        "Research grant opportunities and assist in preparing grant applications to fund our conservation projects.",
      skills: ["Research skills", "Writing ability", "Attention to detail"],
    },
  ],
}

export default function NGODetailPage() {
  const params = useParams()
  const id = params.id

  const [selectedOpportunity, setSelectedOpportunity] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // In a real app, you would fetch the NGO data based on the ID
  // For this example, we'll use the mock data

  const handleApply = (opportunity: any) => {
    setSelectedOpportunity(opportunity)
    setIsDialogOpen(true)
  }

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would submit the application to your backend
    setIsSubmitted(true)
    setTimeout(() => {
      setIsDialogOpen(false)
      // Reset after dialog closes
      setTimeout(() => setIsSubmitted(false), 500)
    }, 2000)
  }

  return (
    <div className="container py-8 md:py-12">
      {/* NGO Header */}
      <div className="relative mb-8">
        <img
          src={ngoData.image || "/placeholder.svg"}
          alt={ngoData.name}
          className="w-full h-64 object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg"></div>
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <Badge className="mb-2 bg-green-600">{ngoData.category}</Badge>
          <h1 className="text-3xl font-bold mb-2">{ngoData.name}</h1>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{ngoData.location}</span>
          </div>
        </div>
      </div>

      {/* NGO Content */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Tabs defaultValue="about">
            <TabsList className="mb-4">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">About Us</h2>
                <p className="text-muted-foreground">{ngoData.description}</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-muted-foreground">{ngoData.mission}</p>
              </div>
            </TabsContent>

            <TabsContent value="opportunities" className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Volunteer Opportunities</h2>

              <div className="grid gap-4">
                {ngoData.opportunities.map((opportunity) => (
                  <Card key={opportunity.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{opportunity.title}</CardTitle>
                          <CardDescription className="flex items-center gap-1 mt-1">
                            <MapPin className="h-3.5 w-3.5" />
                            {opportunity.location}
                          </CardDescription>
                        </div>
                        <Badge variant={opportunity.type === "Remote" ? "outline" : "default"}>
                          {opportunity.type}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{opportunity.description}</p>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-green-600" />
                          <span>Duration: {opportunity.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-green-600" />
                          <span>Commitment: {opportunity.commitment}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2">Required Skills:</h4>
                        <div className="flex flex-wrap gap-2">
                          {opportunity.skills.map((skill: string, index: number) => (
                            <Badge key={index} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button
                        onClick={() => handleApply(opportunity)}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        Apply Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-green-600" />
                <a
                  href={`https://${ngoData.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:underline"
                >
                  {ngoData.website}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-green-600" />
                <span>{ngoData.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-green-600" />
                <a href={`mailto:${ngoData.email}`} className="text-green-600 hover:underline">
                  {ngoData.email}
                </a>
              </div>

              <div className="pt-4 border-t mt-4">
                <Button variant="outline" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Download Information
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Application Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Apply for {selectedOpportunity?.title}</DialogTitle>
            <DialogDescription>
              Complete the form below to submit your application to Environmental Guardians.
            </DialogDescription>
          </DialogHeader>

          {isSubmitted ? (
            <div className="py-6 flex flex-col items-center justify-center text-center">
              <CheckCircle className="h-16 w-16 text-green-600 mb-4" />
              <h3 className="text-xl font-bold">Application Submitted!</h3>
              <p className="text-muted-foreground mt-2">
                Thank you for your interest. The NGO will review your application and contact you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitApplication}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input id="first-name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input id="last-name" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input id="phone" type="tel" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Relevant experience</Label>
                  <Textarea
                    id="experience"
                    placeholder="Briefly describe any relevant experience or skills you have"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="motivation">Motivation</Label>
                  <Textarea id="motivation" placeholder="Why are you interested in this opportunity?" required />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  Submit Application
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
