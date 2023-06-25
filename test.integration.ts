


test('User login and app dashboard rendering', () => {
  const testAppUser = {};
  return visitHomePage(testAppUser)
    .then(attemptLoginWithBadPassword)
    .then(attemptLoginWithCorrectCredentials)
    .then(loadUserAppData)
    .then(verifyAppDashboard)
    .catch((error) => {
      // Handle any errors or failed assertions
      throw error;
    });
});