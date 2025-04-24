"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, MapPin, Search, BookOpen, Award, History } from "lucide-react"

// Mock data for volunteer dashboard
const mockApplications = [
  {
    id: 1001,
    ngoName: "Environmental Guardians",
    opportunityTitle: "Forest Conservation Volunteer",
    location: "Adirondack Mountains, NY",
    type: "In-person",
    status: "approved",
    appliedDate: "2023-12-08",
    startDate: "2024-01-15",
    endDate: "2024-04-15",
  },
  {
    id: 1002,
    ngoName: "Education for All",
    opportunityTitle: "Online Tutor",
    location: "Remote",
    type: "Remote",
    status: "pending",
    appliedDate: "2023-12-12",
  },
  {
    id: 1003,
    ngoName: "Health Volunteers International",
    opportunityTitle: "Community Health Educator",
    location: "Chicago, IL",
    type: "In-person",
    status: "rejected",
    appliedDate: "2023-11-20",
    feedback: "Looking for candidates with more healthcare experience",
  },
]

const mockRecommendations = [
  {
    id: 201,
    ngoName: "Clean Water Project",
    opportunityTitle: "Water Quality Monitor",
    location: "Various locations, NY",
    type: "In-person",
    match: 95,
  },
  {
    id: 202,
    ngoName: "Digital Access Initiative",
    opportunityTitle: "Web Development Volunteer",
    location: "Remote",
    type: "Remote",
    match: 88,
  },
  {
    id: 203,
    ngoName: "Environmental Guardians",
    opportunityTitle: "Social Media Coordinator",
    location: "Remote",
    type: "Remote",
    match: 82,
  },
]

const mockHistory = [
  {
    id: 301,
    ngoName: "Wildlife Protection Society",
    opportunityTitle: "Animal Sanctuary Assistant",
    duration: "May 2023 - August 2023",
    hours: 120,
    impact: "Helped care for 30+ rescued animals and assisted with habitat maintenance",
  },
  {
    id: 302,
    ngoName: "Community Garden Initiative",
    opportunityTitle: "Garden Volunteer",
    duration: "March 2023 - June 2023",
    hours: 45,
    impact: "Contributed to growing 500+ pounds of produce for local food banks",
  },
]

export default function VolunteerDashboardPage() {
  const [applications, setApplications] = useState(mockApplications)
  const [recommendations, setRecommendations] = useState(mockRecommendations)
  const [history, setHistory] = useState(mockHistory)

  const activeApplications = applications.filter((app) => app.status === "approved")
  const pendingApplications = applications.filter((app) => app.status === "pending")
  const rejectedApplications = applications.filter((app) => app.status === "rejected")

  const totalHours = history.reduce((sum, item) => sum + item.hours, 0)

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Volunteer Dashboard</h1>
        <Link href="/ngos">
          <Button className="bg-green-600 hover:bg-green-700">
            <Search className="mr-2 h-4 w-4" />
            Find Opportunities
          </Button>
        </Link>
      </div>

      {/* Volunteer Profile Summary */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold">John Smith</h2>
              <p className="text-muted-foreground">Environmental Conservation Enthusiast</p>
              <div className="flex flex-wrap gap-2 mt-2 justify-center md:justify-start">
                <Badge variant="secondary">Conservation</Badge>
                <Badge variant="secondary">Education</Badge>
                <Badge variant="secondary">Community Outreach</Badge>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold">{activeApplications.length}</p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{history.length}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{totalHours}</p>
                <p className="text-sm text-muted-foreground">Hours</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="applications">
        <TabsList className="mb-4">
          <TabsTrigger value="applications" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            My Applications
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            Recommendations
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="applications">
          <div className="grid gap-6">
            {applications.length > 0 ? (
              applications.map((application) => (
                <Card key={application.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{application.opportunityTitle}</CardTitle>
                        <CardDescription>{application.ngoName}</CardDescription>
                      </div>
                      <Badge
                        variant={
                          application.status === "approved"
                            ? "success"
                            : application.status === "rejected"
                              ? "destructive"
                              : "outline"
                        }
                      >
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-green-600" />
                        <span>{application.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Badge variant={application.type === "Remote" ? "outline" : "default"}>
                          {application.type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-green-600" />
                        <span>Applied: {application.appliedDate}</span>
                      </div>
                    </div>

                    {application.status === "approved" && (
                      <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Upcoming Schedule</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-green-600" />
                            <span>Start: {application.startDate}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-green-600" />
                            <span>End: {application.endDate}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {application.status === "rejected" && application.feedback && (
                      <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Feedback</h4>
                        <p className="text-sm">{application.feedback}</p>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">No applications yet</h3>
                <p className="text-muted-foreground mt-2">Start browsing opportunities to apply</p>
                <Link href="/ngos" className="mt-4 inline-block">
                  <Button>Find Opportunities</Button>
                </Link>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="recommendations">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recommendations.map((recommendation) => (
              <Card key={recommendation.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{recommendation.opportunityTitle}</CardTitle>
                      <CardDescription>{recommendation.ngoName}</CardDescription>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {recommendation.match}% Match
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-green-600" />
                      <span>{recommendation.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Badge variant={recommendation.type === "Remote" ? "outline" : "default"}>
                        {recommendation.type}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Match Score</span>
                      <span>{recommendation.match}%</span>
                    </div>
                    <Progress value={recommendation.match} className="h-2" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={`/ngos/${recommendation.id}`} className="w-full">
                    <Button variant="default" className="w-full bg-green-600 hover:bg-green-700">
                      View Opportunity
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Volunteer Impact</CardTitle>
                <CardDescription>Your contribution to communities and causes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-green-600 mb-2">{history.length}</div>
                        <p className="text-sm text-muted-foreground">Projects Completed</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-green-600 mb-2">{totalHours}</div>
                        <p className="text-sm text-muted-foreground">Hours Contributed</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-green-600 mb-2">2</div>
                        <p className="text-sm text-muted-foreground">NGOs Supported</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="text-xl font-bold">Past Volunteer Work</h3>

              {history.map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    <CardTitle>{item.opportunityTitle}</CardTitle>
                    <CardDescription>{item.ngoName}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-green-600" />
                        <span>{item.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-green-600" />
                        <span>{item.hours} hours</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Impact:</h4>
                      <p className="text-sm text-muted-foreground">{item.impact}</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Certificate
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
