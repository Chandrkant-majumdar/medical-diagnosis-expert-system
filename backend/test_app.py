import unittest
from app import app

class FlaskTestCase(unittest.TestCase):
    
    def setUp(self):
        # Create a test client
        self.app = app.test_client()
        self.app.testing = True
    
    def test_home_status_code(self):
        # Send GET request to the home page
        result = self.app.get('/')
        
        # Assert that the status code is 200 (OK)
        self.assertEqual(result.status_code, 200)
    
    def test_home_data(self):
        # Send GET request to the home page
        result = self.app.get('/')
        
        # Assert that the response data contains expected message
        self.assertEqual(result.data.decode('utf-8'), "Hello, Heroku!")

if __name__ == '__main__':
    unittest.main()
