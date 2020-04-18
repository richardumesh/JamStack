// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  //qa environment setUp
  production: false,
  qa: true,
  dev: false,
  // Google Account configuration
  code_endpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  token_endpoint: 'https://oauth2.googleapis.com/token',
  client_id : '187549960570-7d19o7tbkq1anl795baeg72haf956qem.apps.googleusercontent.com' , 
  client_secret : 'mYfAGPscVGok4K405a8Sxdo_',
  redirect_endpoint: 'http://qa.unleash.agiliz.tech/callback',
  redirect_endpoint_roster: 'http://qa.unleash.agiliz.tech/roster-cb',
  scope: 'openid https://www.googleapis.com/auth/classroom.rosters https://www.googleapis.com/auth/classroom.profile.emails https://www.googleapis.com/auth/classroom.courses https://www.googleapis.com/auth/classroom.rosters https://www.googleapis.com/auth/classroom.profile.emails',
  access_type: 'offline',
  grant_type: 'authorization_code',
  refresh_token: 'refresh_token',
  profile_endpoint: 'https://classroom.googleapis.com/v1/userProfiles',
  classroom_endpoint: 'https://classroom.googleapis.com/v1/courses',
  classroom_courses_students: 'https://classroom.googleapis.com/v1/courses',
  MAX_STUDENTS: 5, //For testing purpose - we are keeping for 5
  //API Integration
  BASEURL: 'http://qa.unleash.agiliz.tech/unleash-api', //qa endpoint should add
  VERSION_URL: '/api/v1/',
  REGISTERAPI_URL: 'users/register',
  LOGINAPI_URL: 'users/login',
  RESETPWDFORPROFILE_URL: 'users/reset',
  POST_TOPIC: 'topic',
  POST_ROSTER: 'roster/',
  RESETPWD_URL: 'users/forgot-password',
  RECOVERPWD_URL: 'users/recover',
  GET_REVIEW_DETAILS: 'topic/review/',
  SEND_NOTIFICATION: 'topic/send/',
  SCHEDULE_NOTIFICZTION: 'topic/schedule/'
};
