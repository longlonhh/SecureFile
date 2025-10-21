// Script để test API endpoints
const fetch = require('node-fetch');

const API_BASE_URL = 'http://localhost:5000/api';

async function testAPI() {
  console.log('🧪 Testing API endpoints...\n');

  try {
    // Test 1: Register user
    console.log('1. Testing user registration...');
    const registerData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'Test123456',
      fullName: 'Test User'
    };

    const registerResponse = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData)
    });

    const registerResult = await registerResponse.json();
    console.log('Register result:', registerResult);

    if (registerResult.success) {
      console.log('✅ Registration successful!\n');

      // Test 2: Login user
      console.log('2. Testing user login...');
      const loginData = {
        username: 'testuser',
        password: 'Test123456'
      };

      const loginResponse = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData)
      });

      const loginResult = await loginResponse.json();
      console.log('Login result:', loginResult);

      if (loginResult.success) {
        console.log('✅ Login successful!\n');

        // Test 3: Get current user
        console.log('3. Testing get current user...');
        const token = loginResult.data.token;
        
        const userResponse = await fetch(`${API_BASE_URL}/auth/me`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });

        const userResult = await userResponse.json();
        console.log('Current user result:', userResult);

        if (userResult.success) {
          console.log('✅ Get current user successful!\n');
          console.log('🎉 All API tests passed! User persistence is working correctly.');
        } else {
          console.log('❌ Get current user failed:', userResult.message);
        }
      } else {
        console.log('❌ Login failed:', loginResult.message);
      }
    } else {
      console.log('❌ Registration failed:', registerResult.message);
    }

  } catch (error) {
    console.error('❌ API test failed:', error.message);
    console.log('\n💡 Make sure:');
    console.log('1. MongoDB is running');
    console.log('2. Server is running on port 5000');
    console.log('3. All dependencies are installed');
  }
}

// Run the test
testAPI();
