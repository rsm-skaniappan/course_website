from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from datetime import datetime
import uuid

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data models
class Assignment(BaseModel):
    id: str
    title: str
    description: str
    due_date: str
    status: str  # completed, pending, overdue
    grade: Optional[str] = None

class Announcement(BaseModel):
    id: str
    title: str
    content: str
    date: str
    urgent: bool = False

class Module(BaseModel):
    id: str
    title: str
    description: str
    week: int
    content_type: str  # video, reading, interactive
    completed: bool = False

class Course(BaseModel):
    id: str
    name: str
    description: str
    instructor: str

class DashboardStats(BaseModel):
    assignment_status: dict
    grades: dict
    announcements: List[Announcement]
    office_hours: dict

# Mock data
mock_courses = [
    Course(id="cs101", name="Introduction to Computer Science", description="Basic CS concepts", instructor="Dr. Smith"),
    Course(id="cs201", name="Data Structures and Algorithms", description="Advanced data structures", instructor="Dr. Johnson"),
    Course(id="web101", name="Web Development Fundamentals", description="HTML, CSS, JavaScript", instructor="Prof. Davis"),
    Course(id="db101", name="Database Systems", description="SQL and NoSQL databases", instructor="Dr. Wilson"),
    Course(id="se101", name="Software Engineering", description="Software development lifecycle", instructor="Prof. Brown")
]

mock_assignments = [
    Assignment(id="a1", title="Final Project Proposal", description="Submit your final project proposal with detailed specifications", due_date="2025-03-20", status="pending"),
    Assignment(id="a2", title="Weekly Quiz", description="Quiz covering Week 10 modules", due_date="2025-03-18", status="completed", grade="A-"),
    Assignment(id="a3", title="Lab Assignment 9", description="Practical programming exercise", due_date="2025-03-15", status="completed", grade="B+"),
    Assignment(id="a4", title="Midterm Exam", description="Comprehensive midterm examination", due_date="2025-03-10", status="overdue", grade="B")
]

mock_announcements = [
    Announcement(id="ann1", title="Midterm Exam Schedule", content="Midterm exam scheduled for next week", date="2025-03-15", urgent=True),
    Announcement(id="ann2", title="Project Guidelines Updated", content="New guidelines for final project", date="2025-03-12", urgent=False),
    Announcement(id="ann3", title="Office Hours Change", content="Office hours moved to Thursday", date="2025-03-10", urgent=False)
]

mock_modules = [
    Module(id="m1", title="Module 10.1: Advanced Topics", description="Introduction to advanced concepts and methodologies", week=10, content_type="video", completed=False),
    Module(id="m2", title="Module 10.2: Case Studies", description="Real-world applications and examples", week=10, content_type="interactive", completed=True),
    Module(id="m3", title="Module 9.1: Review Session", description="Review of previous concepts", week=9, content_type="reading", completed=True)
]

# API endpoints
@app.get("/")
async def root():
    return {"message": "Course Website API"}

@app.get("/api/courses")
async def get_courses():
    return {"courses": mock_courses}

@app.get("/api/courses/{course_id}")
async def get_course(course_id: str):
    course = next((c for c in mock_courses if c.id == course_id), None)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course

@app.get("/api/dashboard")
async def get_dashboard_stats():
    assignment_status = {
        "completed": len([a for a in mock_assignments if a.status == "completed"]),
        "pending": len([a for a in mock_assignments if a.status == "pending"]),
        "overdue": len([a for a in mock_assignments if a.status == "overdue"])
    }
    
    completed_assignments = [a for a in mock_assignments if a.status == "completed" and a.grade]
    grade_values = []
    for assignment in completed_assignments:
        grade = assignment.grade
        if grade:
            # Convert letter grades to numeric values for average calculation
            grade_map = {"A+": 97, "A": 93, "A-": 90, "B+": 87, "B": 83, "B-": 80, "C+": 77, "C": 73, "C-": 70}
            if grade in grade_map:
                grade_values.append(grade_map[grade])
    
    average_grade = sum(grade_values) / len(grade_values) if grade_values else 0
    
    grades = {
        "average": round(average_grade, 1),
        "last_assignment": completed_assignments[-1].grade if completed_assignments else "N/A",
        "trend": "+2.3%"
    }
    
    office_hours = {
        "next": "Thursday 2:00 PM - 4:00 PM",
        "location": "Room 204",
        "professor": "Dr. Smith"
    }
    
    return DashboardStats(
        assignment_status=assignment_status,
        grades=grades,
        announcements=mock_announcements,
        office_hours=office_hours
    )

@app.get("/api/assignments")
async def get_assignments():
    return {"assignments": mock_assignments}

@app.get("/api/assignments/{assignment_id}")
async def get_assignment(assignment_id: str):
    assignment = next((a for a in mock_assignments if a.id == assignment_id), None)
    if not assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")
    return assignment

@app.get("/api/modules")
async def get_modules():
    return {"modules": mock_modules}

@app.get("/api/modules/week/{week_number}")
async def get_modules_by_week(week_number: int):
    week_modules = [m for m in mock_modules if m.week == week_number]
    return {"modules": week_modules}

@app.get("/api/announcements")
async def get_announcements():
    return {"announcements": mock_announcements}

@app.post("/api/assignments/{assignment_id}/submit")
async def submit_assignment(assignment_id: str):
    assignment = next((a for a in mock_assignments if a.id == assignment_id), None)
    if not assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")
    
    # Update assignment status
    assignment.status = "completed"
    return {"message": "Assignment submitted successfully", "assignment": assignment}

@app.put("/api/modules/{module_id}/complete")
async def complete_module(module_id: str):
    module = next((m for m in mock_modules if m.id == module_id), None)
    if not module:
        raise HTTPException(status_code=404, detail="Module not found")
    
    module.completed = True
    return {"message": "Module completed successfully", "module": module}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)