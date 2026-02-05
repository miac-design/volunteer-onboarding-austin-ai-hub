'use client'
import { useState } from 'react'
import OnboardingProgress from '@/components/OnboardingProgress'
import VolunteerPassport from '@/components/VolunteerPassport'
import ResourceHub from '@/components/ResourceHub'
import QuickActions from '@/components/QuickActions'
import { ArrowLeft, Users, ClipboardList, Calendar, FolderOpen, BarChart3, Settings, User } from 'lucide-react'

// Sample volunteer data - this would come from Brevo/Supabase in production
const sampleVolunteer = {
  id: 'vol-001',
  name: 'New Volunteer',
  email: 'volunteer@example.com',
  role: 'volunteer' as const,
  area: 'Technology',
  joinDate: new Date().toISOString(),
  linkedIn: 'https://linkedin.com/in/example',
  instagram: '@austinaivolunteer',
  onboardingProgress: {
    step1_welcome: true,
    step2_discord: false,
    step3_profile: false,
    step4_orientation: false,
    step5_first_task: false
  }
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: ClipboardList },
  { id: 'people', label: 'People', icon: Users },
  { id: 'applications', label: 'Applications', icon: User, active: false },
  { id: 'operations', label: 'Operations', icon: ClipboardList },
  { id: 'meetings', label: 'Meetings', icon: Calendar },
  { id: 'resources', label: 'Resources', icon: FolderOpen, active: true },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'admin', label: 'Admin', icon: Settings },
]

export default function OnboardingDashboard() {
  const [volunteer] = useState(sampleVolunteer)
  const [activeTab, setActiveTab] = useState<'progress' | 'passport' | 'resources'>('progress')

  const completedSteps = Object.values(volunteer.onboardingProgress).filter(Boolean).length
  const totalSteps = Object.keys(volunteer.onboardingProgress).length

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Navigation Bar - Matching Operations Hub */}
      <nav className="bg-white border-b border-[#E2E8F0] px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-900">Austin AI</p>
                <p className="text-xs text-gray-500">Hub</p>
              </div>
            </div>

            {/* Nav Items */}
            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.id}
                    href={`https://austin-ai-hub-operations.vercel.app/${item.id === 'dashboard' ? '' : item.id}`}
                    className={`nav-link ${item.active ? 'active' : ''}`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </a>
                )
              })}
            </div>
          </div>

          {/* User */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-sm">
                {volunteer.name.charAt(0)}
              </span>
            </div>
            <span className="text-sm font-medium text-gray-700">{volunteer.name}</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="p-6 max-w-7xl mx-auto">
        {/* Back Link */}
        <a 
          href="https://austin-ai-hub-operations.vercel.app/resources" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Resources
        </a>

        {/* Page Header */}
        <div className="page-header">
          <div className="icon">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h1>Volunteer Onboarding</h1>
            <p>Complete your onboarding journey to become a full volunteer</p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="stat-card">
            <p className="label">Total Steps</p>
            <p className="value gray">{totalSteps}</p>
          </div>
          <div className="stat-card">
            <p className="label">Completed</p>
            <p className="value green">{completedSteps}</p>
          </div>
          <div className="stat-card">
            <p className="label">Progress</p>
            <p className="value blue">{Math.round((completedSteps / totalSteps) * 100)}%</p>
          </div>
          <div className="stat-card">
            <p className="label">Status</p>
            <p className="value text-lg font-semibold text-amber-500">In Progress</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-[#E2E8F0] mb-6">
          <div className="flex gap-6">
            {[
              { id: 'progress', label: 'My Progress' },
              { id: 'passport', label: 'My Passport' },
              { id: 'resources', label: 'Resources' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`pb-3 px-1 text-sm font-medium transition-all border-b-2 ${
                  activeTab === tab.id 
                    ? 'text-blue-600 border-blue-600' 
                    : 'text-gray-500 border-transparent hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {activeTab === 'progress' && (
              <OnboardingProgress 
                progress={volunteer.onboardingProgress} 
                volunteerName={volunteer.name} 
              />
            )}
            {activeTab === 'passport' && (
              <VolunteerPassport volunteer={volunteer} />
            )}
            {activeTab === 'resources' && (
              <ResourceHub role={volunteer.role} />
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <QuickActions role={volunteer.role} />
            
            {/* Help Card */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-gray-500 text-sm mb-4">
                Questions about onboarding? Reach out to our team.
              </p>
              <a 
                href="mailto:hello@austinaihub.com" 
                className="btn-primary w-full justify-center"
              >
                Contact Support
              </a>
            </div>
          </aside>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#E2E8F0] mt-12 py-4 px-6">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Austin AI Hub · 2026 · Internal Portal</span>
          <span>Built with ❤️ for the Austin AI community</span>
        </div>
      </footer>
    </div>
  )
          }
