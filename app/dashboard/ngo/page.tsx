"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  PlusCircle,
  MoreHorizontal,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Users,
  BarChart3,
  Calendar,
} from "lucide-react"

// Mock data for NGO dashboard
const mockOpportunities = [
  {
    id: 101,
    title: "Forest Conservation Volunteer",
    type: "In-person",
    location: "Adirondack Mountains, NY",
    applications: 12,
    status: "active",
    created: "2023-10-15",
  },
  {
    id: 102,
    title: "Environmental Education Assistant",
    type: "In-person",
    location: "New York City, NY",
    applications: 8,
    status: "active",
    created: "2023-11-02",
  },
  {
    id: 103,
    title: "Social Media Coordinator",
    type: "Remote",
    location: "Remote",
    applications: 24,
    status: "active",
    created: "2023-12-01",
  },
  {
    id: 104,
    title: "Grant Research Assistant",
    type: "Remote",
    location: "Remote",
    applications: 15,
    status: "closed",
    created: "2023-09-10",
  },
]

const mockApplications = [
  {
    id: 1001,
    opportunityId: 101,
    opportunityTitle: "Forest Conservation Volunteer",
    applicantName: "John Smith",
    applicantEmail: "john.smith@example.com",
    status: "pending",
    appliedDate: "2023-12-10",
  },
  {
    id: 1002,
    opportunityId: 101,
    opportunityTitle: "Forest Conservation Volunteer",
    applicantName: "Emily Johnson",
    applicantEmail: "emily.j@example.com",
    status: "approved",
    appliedDate: "2023-12-08",
  },
  {
    id: 1003,
    opportunityId: 102,
    opportunityTitle: "Environmental Education Assistant",
    applicantName: "Michael Brown",
    applicantEmail: "michael.b@example.com",
    status: "pending",
    appliedDate: "2023-12-12",
  },
  {
    id: 1004,
    opportunityId: 103,
    opportunityTitle: "Social Media Coordinator",
    applicantName: "Sarah Wilson",
    applicantEmail: "sarah.w@example.com",
    status: "rejected",
    appliedDate: "2023-12-05",
  },
  {
    id: 1005,
    opportunityId: 103,
    opportunityTitle: "Social Media Coordinator",
    applicantName: "David Lee",
    applicantEmail: "david.lee@example.com",
    status: "pending",
    appliedDate: "2023-12-11",
  },
]

export default function NGODashboardPage() {
  const [opportunities, setOpportunities] = useState(mockOpportunities)
  const [applications, setApplications] = useState(mockApplications)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedOpportunity, setSelectedOpportunity] = useState<any>(null)

  const pendingApplications = applications.filter((app) => app.status === "pending")
  const approvedApplications = applications.filter((app) => app.status === "approved")
  const rejectedApplications = applications.filter((app) => app.status === "rejected")

  const handleCreateOpportunity = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would submit to your backend
    setIsCreateDialogOpen(false)
  }

  const handleDeleteOpportunity = () => {
    if (selectedOpportunity) {
      setOpportunities(opportunities.filter((opp) => opp.id !== selectedOpportunity.id))
      setIsDeleteDialogOpen(false)
    }
  }

  const handleApplicationStatus = (applicationId: number, newStatus: string) => {
    setApplications(applications.map((app) => (app.id === applicationId ? { ...app, status: newStatus } : app)))
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">NGO Dashboard</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-green-600 hover:bg-green-700">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Opportunity
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Opportunities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{opportunities.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {opportunities.filter((o) => o.status === "active").length} active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applications.length}</div>
            <p className="text-xs text-muted-foreground mt-1">{pendingApplications.length} pending review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Approved Volunteers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedApplications.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Ready to start</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground mt-1">New applications</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="opportunities">
        <TabsList className="mb-4">
          <TabsTrigger value="opportunities" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Opportunities
          </TabsTrigger>
          <TabsTrigger value="applications" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Applications
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="opportunities">
          <Card>
            <CardHeader>
              <CardTitle>Manage Opportunities</CardTitle>
              <CardDescription>Create, edit, and manage your volunteer opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="py-3 px-4 text-left font-medium">Title</th>
                      <th className="py-3 px-4 text-left font-medium">Type</th>
                      <th className="py-3 px-4 text-left font-medium">Location</th>
                      <th className="py-3 px-4 text-left font-medium">Applications</th>
                      <th className="py-3 px-4 text-left font-medium">Status</th>
                      <th className="py-3 px-4 text-left font-medium">Created</th>
                      <th className="py-3 px-4 text-center font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {opportunities.map((opportunity) => (
                      <tr key={opportunity.id} className="border-b">
                        <td className="py-3 px-4">{opportunity.title}</td>
                        <td className="py-3 px-4">
                          <Badge variant={opportunity.type === "Remote" ? "outline" : "default"}>
                            {opportunity.type}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">{opportunity.location}</td>
                        <td className="py-3 px-4">{opportunity.applications}</td>
                        <td className="py-3 px-4">
                          <Badge variant={opportunity.status === "active" ? "success" : "secondary"}>
                            {opportunity.status === "active" ? "Active" : "Closed"}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">{opportunity.created}</td>
                        <td className="py-3 px-4 text-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-500"
                                onClick={() => {
                                  setSelectedOpportunity(opportunity)
                                  setIsDeleteDialogOpen(true)
                                }}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applications">
          <Card>
            <CardHeader>
              <CardTitle>Volunteer Applications</CardTitle>
              <CardDescription>Review and manage volunteer applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="py-3 px-4 text-left font-medium">Applicant</th>
                      <th className="py-3 px-4 text-left font-medium">Opportunity</th>
                      <th className="py-3 px-4 text-left font-medium">Applied Date</th>
                      <th className="py-3 px-4 text-left font-medium">Status</th>
                      <th className="py-3 px-4 text-center font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((application) => (
                      <tr key={application.id} className="border-b">
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium">{application.applicantName}</div>
                            <div className="text-xs text-muted-foreground">{application.applicantEmail}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">{application.opportunityTitle}</td>
                        <td className="py-3 px-4">{application.appliedDate}</td>
                        <td className="py-3 px-4">
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
                        </td>
                        <td className="py-3 px-4 text-center">
                          {application.status === "pending" ? (
                            <div className="flex justify-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 w-8 p-0 text-green-600"
                                onClick={() => handleApplicationStatus(application.id, "approved")}
                              >
                                <CheckCircle className="h-4 w-4" />
                                <span className="sr-only">Approve</span>
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 w-8 p-0 text-red-500"
                                onClick={() => handleApplicationStatus(application.id, "rejected")}
                              >
                                <XCircle className="h-4 w-4" />
                                <span className="sr-only">Reject</span>
                              </Button>
                            </div>
                          ) : (
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics & Insights</CardTitle>
              <CardDescription>Track volunteer engagement and application metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Application Status</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <div className="text-5xl font-bold text-yellow-500 mb-2">{pendingApplications.length}</div>
                          <p className="text-sm text-muted-foreground">Pending</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <div className="text-5xl font-bold text-green-500 mb-2">{approvedApplications.length}</div>
                          <p className="text-sm text-muted-foreground">Approved</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <div className="text-5xl font-bold text-red-500 mb-2">{rejectedApplications.length}</div>
                          <p className="text-sm text-muted-foreground">Rejected</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Popular Opportunities</h3>
                  <div className="space-y-4">
                    {opportunities
                      .sort((a, b) => b.applications - a.applications)
                      .slice(0, 3)
                      .map((opportunity) => (
                        <div key={opportunity.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">{opportunity.title}</h4>
                            <p className="text-sm text-muted-foreground">{opportunity.location}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-green-600" />
                            <span className="font-medium">{opportunity.applications} applications</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Opportunity Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Opportunity</DialogTitle>
            <DialogDescription>Fill in the details below to create a new volunteer opportunity.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateOpportunity}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="e.g., Forest Conservation Volunteer" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select defaultValue="in-person">
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in-person">In-person</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="e.g., New York City, NY" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="commitment">Time Commitment</Label>
                  <Input id="commitment" placeholder="e.g., 5-10 hours weekly" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input id="duration" placeholder="e.g., 3 months" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the opportunity, responsibilities, and impact"
                  rows={5}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="skills">Required Skills</Label>
                <Textarea
                  id="skills"
                  placeholder="List skills and qualifications needed for this role"
                  rows={3}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                Create Opportunity
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this opportunity? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteOpportunity}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
