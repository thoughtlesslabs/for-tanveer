// User types
export interface User {
  id: string
  name: string
  email: string
  image?: string
  type: "volunteer" | "ngo"
  createdAt: Date
}

export interface VolunteerProfile extends User {
  type: "volunteer"
  skills: string[]
  interests: string[]
  location?: string
  bio?: string
  experience?: string
}

export interface NGOProfile extends User {
  type: "ngo"
  organizationName: string
  description: string
  mission?: string
  website?: string
  location: string
  phone?: string
  category: string
}

// Opportunity types
export interface Opportunity {
  id: string
  ngoId: string
  title: string
  description: string
  type: "Remote" | "In-person" | "Hybrid"
  location: string
  commitment: string
  duration: string
  skills: string[]
  status: "active" | "closed"
  createdAt: Date
}

// Application types
export interface Application {
  id: string
  opportunityId: string
  volunteerId: string
  status: "pending" | "approved" | "rejected"
  appliedDate: Date
  experience?: string
  motivation?: string
  startDate?: Date
  endDate?: Date
  feedback?: string
}
