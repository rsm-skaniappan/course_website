import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentCourse, setCurrentCourse] = useState('Introduction to Computer Science');
  const [showCourseDropdown, setShowCourseDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState('modules'); // For Week 10 toggle

  const courses = [
    'Introduction to Computer Science',
    'Data Structures and Algorithms',
    'Web Development Fundamentals',
    'Database Systems',
    'Software Engineering'
  ];

  const weeks = ['home', 'week1', 'week2', 'week3', 'week4', 'week5', 'week6', 'week7', 'week8', 'week9', 'week10'];

  const dashboardStats = {
    assignmentStatus: {
      completed: 8,
      pending: 3,
      overdue: 1
    },
    grades: {
      average: 87.5,
      lastAssignment: 'A-',
      trend: '+2.3%'
    },
    announcements: [
      { id: 1, title: 'Midterm Exam Schedule', date: '2025-03-15', urgent: true },
      { id: 2, title: 'Project Guidelines Updated', date: '2025-03-12', urgent: false },
      { id: 3, title: 'Office Hours Change', date: '2025-03-10', urgent: false }
    ],
    officeHours: {
      next: 'Thursday 2:00 PM - 4:00 PM',
      location: 'Room 204',
      professor: 'Dr. Smith'
    }
  };

  const renderDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {/* Assignment Status Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Assignment Status</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-green-600">Completed</span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              {dashboardStats.assignmentStatus.completed}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-yellow-600">Pending</span>
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
              {dashboardStats.assignmentStatus.pending}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-red-600">Overdue</span>
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
              {dashboardStats.assignmentStatus.overdue}
            </span>
          </div>
        </div>
      </div>

      {/* Grades Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Grades</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Average</span>
            <span className="text-2xl font-bold text-blue-600">{dashboardStats.grades.average}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Last Assignment</span>
            <span className="text-lg font-semibold text-green-600">{dashboardStats.grades.lastAssignment}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Trend</span>
            <span className="text-sm font-medium text-green-600">{dashboardStats.grades.trend}</span>
          </div>
        </div>
      </div>

      {/* Announcements Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Announcements</h3>
        <div className="space-y-3">
          {dashboardStats.announcements.map((announcement) => (
            <div key={announcement.id} className="border-l-4 border-blue-500 pl-4 py-2">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-800">{announcement.title}</h4>
                {announcement.urgent && (
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
                    Urgent
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600">{announcement.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Office Hours Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Office Hours</h3>
        <div className="space-y-3">
          <div>
            <span className="text-gray-600">Next Available:</span>
            <p className="font-medium text-gray-800">{dashboardStats.officeHours.next}</p>
          </div>
          <div>
            <span className="text-gray-600">Location:</span>
            <p className="font-medium text-gray-800">{dashboardStats.officeHours.location}</p>
          </div>
          <div>
            <span className="text-gray-600">Professor:</span>
            <p className="font-medium text-gray-800">{dashboardStats.officeHours.professor}</p>
          </div>
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );

  const renderWeek10 = () => (
    <div className="bg-white rounded-lg shadow-md">
      {/* Tab Navigation */}
      <div className="border-b">
        <nav className="flex space-x-8 px-6">
          <button
            onClick={() => setActiveTab('modules')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'modules'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Modules
          </button>
          <button
            onClick={() => setActiveTab('assignments')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'assignments'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Assignments
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'modules' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Week 10 - Modules</h3>
            <div className="space-y-3">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium text-gray-800">Module 10.1: Advanced Topics</h4>
                <p className="text-sm text-gray-600 mt-1">Introduction to advanced concepts and methodologies</p>
                <div className="mt-2 flex space-x-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Video</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Reading</span>
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-medium text-gray-800">Module 10.2: Case Studies</h4>
                <p className="text-sm text-gray-600 mt-1">Real-world applications and examples</p>
                <div className="mt-2 flex space-x-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Video</span>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">Interactive</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'assignments' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Week 10 - Assignments</h3>
            <div className="space-y-3">
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-800">Final Project Proposal</h4>
                    <p className="text-sm text-gray-600 mt-1">Submit your final project proposal with detailed specifications</p>
                    <p className="text-xs text-gray-500 mt-2">Due: March 20, 2025</p>
                  </div>
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">
                    Pending
                  </span>
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-800">Weekly Quiz</h4>
                    <p className="text-sm text-gray-600 mt-1">Quiz covering Week 10 modules</p>
                    <p className="text-xs text-gray-500 mt-2">Due: March 18, 2025</p>
                  </div>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                    Completed
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderWeekPage = (week) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {week === 'home' ? 'Course Dashboard' : `Week ${week.slice(4)}`}
      </h2>
      {week === 'home' ? (
        renderDashboard()
      ) : week === 'week10' ? (
        renderWeek10()
      ) : (
        <div className="space-y-4">
          <p className="text-gray-600">
            Content for {week === 'home' ? 'Home' : `Week ${week.slice(4)}`} will be displayed here.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-gray-800">Learning Objectives</h4>
              <ul className="text-sm text-gray-600 mt-2 space-y-1">
                <li>• Understand key concepts</li>
                <li>• Apply theoretical knowledge</li>
                <li>• Complete practical exercises</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-gray-800">Resources</h4>
              <ul className="text-sm text-gray-600 mt-2 space-y-1">
                <li>• Lecture slides</li>
                <li>• Reading materials</li>
                <li>• Practice problems</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Course Title Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowCourseDropdown(!showCourseDropdown)}
                className="flex items-center space-x-2 text-lg font-semibold text-gray-800 hover:text-blue-600 transition duration-200"
              >
                <span>{currentCourse}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showCourseDropdown && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-md shadow-lg border z-10">
                  <div className="py-2">
                    {courses.map((course) => (
                      <button
                        key={course}
                        onClick={() => {
                          setCurrentCourse(course);
                          setShowCourseDropdown(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                          currentCourse === course ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                        }`}
                      >
                        {course}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition duration-200"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">JS</span>
                </div>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showProfileDropdown && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-10">
                  <div className="py-2">
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile Settings
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Preferences
                    </button>
                    <hr className="my-2" />
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto py-4">
            {weeks.map((week) => (
              <button
                key={week}
                onClick={() => setCurrentPage(week)}
                className={`whitespace-nowrap px-3 py-2 rounded-md text-sm font-medium transition duration-200 ${
                  currentPage === week
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {week === 'home' ? 'Home' : `Week ${week.slice(4)}`}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderWeekPage(currentPage)}
      </main>
    </div>
  );
};

export default App;