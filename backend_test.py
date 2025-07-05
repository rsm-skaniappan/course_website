import requests
import unittest
import json
import sys

class CourseWebsiteAPITester:
    def __init__(self, base_url="https://ee175a14-cc4b-46fa-973a-b598a5ba5183.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failures = []

    def run_test(self, name, method, endpoint, expected_status=200, data=None):
        """Run a single API test"""
        url = f"{self.base_url}{endpoint}"
        headers = {'Content-Type': 'application/json'}
        
        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers)
            
            success = response.status_code == expected_status
            
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    return success, response.json()
                except:
                    return success, {}
            else:
                error_msg = f"❌ Failed - Expected {expected_status}, got {response.status_code}"
                print(error_msg)
                self.failures.append({
                    "test": name,
                    "error": error_msg,
                    "response": response.text[:200]  # Truncate long responses
                })
                return False, {}

        except Exception as e:
            error_msg = f"❌ Failed - Error: {str(e)}"
            print(error_msg)
            self.failures.append({
                "test": name,
                "error": error_msg
            })
            return False, {}

    def test_root(self):
        """Test the root endpoint"""
        return self.run_test("Root Endpoint", "GET", "/api")

    def test_get_courses(self):
        """Test getting all courses"""
        return self.run_test("Get All Courses", "GET", "/api/courses")

    def test_get_course(self):
        """Test getting a specific course"""
        return self.run_test("Get Specific Course", "GET", "/api/courses/cs101")

    def test_get_dashboard(self):
        """Test getting dashboard stats"""
        return self.run_test("Get Dashboard Stats", "GET", "/api/dashboard")

    def test_get_assignments(self):
        """Test getting all assignments"""
        return self.run_test("Get All Assignments", "GET", "/api/assignments")

    def test_get_assignment(self):
        """Test getting a specific assignment"""
        return self.run_test("Get Specific Assignment", "GET", "/api/assignments/a1")

    def test_get_modules(self):
        """Test getting all modules"""
        return self.run_test("Get All Modules", "GET", "/api/modules")

    def test_get_modules_by_week(self):
        """Test getting modules by week"""
        return self.run_test("Get Modules by Week", "GET", "/api/modules/week/10")

    def test_get_announcements(self):
        """Test getting all announcements"""
        return self.run_test("Get All Announcements", "GET", "/api/announcements")

    def test_submit_assignment(self):
        """Test submitting an assignment"""
        return self.run_test("Submit Assignment", "POST", "/api/assignments/a1/submit", 200)

    def test_complete_module(self):
        """Test completing a module"""
        return self.run_test("Complete Module", "PUT", "/api/modules/m1/complete", 200)

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting API Tests...")
        
        self.test_root()
        self.test_get_courses()
        self.test_get_course()
        self.test_get_dashboard()
        self.test_get_assignments()
        self.test_get_assignment()
        self.test_get_modules()
        self.test_get_modules_by_week()
        self.test_get_announcements()
        self.test_submit_assignment()
        self.test_complete_module()
        
        print(f"\n📊 Tests passed: {self.tests_passed}/{self.tests_run}")
        
        if self.failures:
            print("\n❌ Failed Tests:")
            for failure in self.failures:
                print(f"  - {failure['test']}: {failure['error']}")
                if 'response' in failure:
                    print(f"    Response: {failure['response']}")
        
        return self.tests_passed == self.tests_run

def main():
    tester = CourseWebsiteAPITester()
    success = tester.run_all_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())