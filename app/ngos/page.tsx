"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Search, MapPin, Users, Calendar } from "lucide-react"

// Mock data for NGO listings
const ngoListings = [
  {
    id: 1,
    name: "Environmental Guardians",
    category: "Environment",
    location: "New York, USA",
    description: "Working to protect natural habitats and wildlife conservation efforts across the country.",
    opportunities: 5,
    image: "/placeholder.svg?height=200&width=400&text=Environmental Guardians",
  },
  {
    id: 2,
    name: "Education for All",
    category: "Education",
    location: "London, UK",
    description: "Providing educational resources and support to underprivileged communities worldwide.",
    opportunities: 3,
    image: "/placeholder.svg?height=200&width=400&text=Education for All",
  },
  {
    id: 3,
    name: "Health Volunteers International",
    category: "Healthcare",
    location: "Geneva, Switzerland",
    description: "Delivering essential healthcare services to regions with limited medical access.",
    opportunities: 8,
    image: "/placeholder.svg?height=200&width=400&text=Health Volunteers",
  },
  {
    id: 4,
    name: "Hunger Relief Network",
    category: "Food Security",
    location: "Chicago, USA",
    description: "Addressing food insecurity through community programs and sustainable solutions.",
    opportunities: 4,
    image: "/placeholder.svg?height=200&width=400&text=Hunger Relief",
  },
  {
    id: 5,
    name: "Digital Access Initiative",
    category: "Technology",
    location: "Berlin, Germany",
    description: "Bridging the digital divide by providing technology education and resources.",
    opportunities: 6,
    image: "/placeholder.svg?height=200&width=400&text=Digital Access",
  },
  {
    id: 6,
    name: "Clean Water Project",
    category: "Environment",
    location: "Nairobi, Kenya",
    description: "Implementing sustainable water solutions in communities facing water scarcity.",
    opportunities: 7,
    image: "/placeholder.svg?height=200&width=400&text=Clean Water",
  },
]

export default function NGOsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [remoteOnly, setRemoteOnly] = useState(false)

  // Filter NGOs based on search and filters
  const filteredNGOs = ngoListings.filter((ngo) => {
    const matchesSearch =
      ngo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ngo.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "" || ngo.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="container py-8 md:py-12">
      <div className="space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Find NGOs</h1>
        <p className="text-muted-foreground md:text-xl max-w-[700px] mx-auto">
          Discover organizations making a difference and find volunteer opportunities that match your skills
        </p>
      </div>

      {/* Search and Filters */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <div className="md:col-span-2 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by name or keywords"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Environment">Environment</SelectItem>
            <SelectItem value="Education">Education</SelectItem>
            <SelectItem value="Healthcare">Healthcare</SelectItem>
            <SelectItem value="Food Security">Food Security</SelectItem>
            <SelectItem value="Technology">Technology</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center space-x-2">
          <Checkbox id="remote" checked={remoteOnly} onCheckedChange={(checked) => setRemoteOnly(checked as boolean)} />
          <Label htmlFor="remote">Remote opportunities only</Label>
        </div>
      </div>

      {/* Results */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredNGOs.length > 0 ? (
          filteredNGOs.map((ngo) => (
            <Card key={ngo.id} className="overflow-hidden">
              <img src={ngo.image || "/placeholder.svg"} alt={ngo.name} className="w-full h-48 object-cover" />
              <CardHeader>
                <CardTitle>{ngo.name}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {ngo.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{ngo.description}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-green-600" />
                    {ngo.opportunities} opportunities
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-green-600" />
                    Various dates
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/ngos/${ngo.id}`} className="w-full">
                  <Button variant="default" className="w-full bg-green-600 hover:bg-green-700">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <h3 className="text-lg font-medium">No NGOs found</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
