/**
 * Public client configuration only. Firebase web API keys identify the project;
 * authorization is enforced by Firebase rules and Google OAuth consent.
 * Replace the placeholders with values from Firebase Console → Project settings.
 */
window.ACADEMIC_OS_CONFIG = {
  firebase: {
    apiKey: "",
    authDomain: "",
    projectId: "",
    appId: ""
  },
  // HTTPS Firebase Function (or equivalent authenticated proxy) accepting
  // { task: "triage" | "draft", messages?, message?, preferences? }.
  aiEndpoint: ""
};
