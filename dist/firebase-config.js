/**
 * Public client configuration only. Firebase web API keys identify the project;
 * authorization is enforced by Firebase rules and Google OAuth consent.
 * Replace the placeholders with values from Firebase Console → Project settings.
 */
window.ACADEMIC_OS_CONFIG = {
  firebase: {
    apiKey: "AIzaSyDgwG8Ee6cLSx3f09UoC2QFpiPu2aMVwgk",
    authDomain: "studentathleteos.firebaseapp.com",
    projectId: "studentathleteos",
    appId: "1:617863249074:web:95a733b8c3b80d4dfa1dab"
  },
  // HTTPS Firebase Function (or equivalent authenticated proxy) accepting
  // { task: "triage" | "draft", messages?, message?, preferences? }.
  aiEndpoint: ""
};
