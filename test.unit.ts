// Function to simulate visiting the homepage as a logged-out user
async function visitHomePage(testAppUser) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('/homepage');
      expect(response.status).toBe(200); // Verify 2xx response
      // Update testAppUser with relevant data from the response
      testAppUser.homepageData = await response.json();
      resolve(testAppUser);
    } catch (error) {
      reject(error);
    }
  });
}

// Function to simulate attempting login with a bad password
async function attemptLoginWithBadPassword(testAppUser) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        body: JSON.stringify({ username: 'testUser', password: 'wrongPassword' }),
        headers: { 'Content-Type': 'application/json' },
      });
      // Verify 4xx response indicating a bad password
      expect(response.status).toBeGreaterThanOrEqual(400);
      expect(response.status).toBeLessThan(500);
      // No update to testAppUser in case of failure
      resolve(testAppUser);
    } catch (error) {
      reject(error);
    }
  });
}

// Function to simulate attempting login with correct credentials
async function attemptLoginWithCorrectCredentials(testAppUser) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        body: JSON.stringify({ username: 'testUser', password: 'correctPassword' }),
        headers: { 'Content-Type': 'application/json' },
      });
      expect(response.status).toBe(200); // Verify 2xx response indicating successful login
      // Update testAppUser with relevant data from the response
      testAppUser.accessToken = await response.json().accessToken;
      resolve(testAppUser);
    } catch (error) {
      reject(error);
    }
  });
}

// Function to load user's application data
async function loadUserAppData(testAppUser) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('/userdata', {
        headers: { Authorization: `Bearer ${testAppUser.accessToken}` },
      });
      expect(response.status).toBe(200); // Verify 2xx response
      // Update testAppUser with relevant data from the response
      testAppUser.appData = await response.json();
      resolve(testAppUser);
    } catch (error) {
      reject(error);
    }
  });
}

// Function to verify the app dashboard rendering
async function verifyAppDashboard(testAppUser) {
  return new Promise(async (resolve, reject) => {
    try {
      // Perform necessary assertions on the testAppUser's appData or other elements to verify the dashboard rendering
      expect(testAppUser.appData).toBeDefined();
      expect(testAppUser.appData.dashboard).toBeTruthy();
      resolve(testAppUser);
    } catch (error) {
      reject(error);
    }
  });
}
