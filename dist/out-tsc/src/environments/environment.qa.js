export const environment = {
    //qa environment setUp
    production: false,
    qa: true,
    dev: false,
    // Google Account configuration
    code_endpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    token_endpoint: 'https://oauth2.googleapis.com/token',
    client_id: '930144487785-qpsld9hk5448gg7pncmm0jm6ndnrchnm.apps.googleusercontent.com',
    client_secret: '_I-BNR0Uy7nZhEYbFyzN4v7_',
    redirect_endpoint: 'http://localhost:4200/callback',
    scope: 'openid https://www.googleapis.com/auth/classroom.rosters https://www.googleapis.com/auth/classroom.profile.emails https://www.googleapis.com/auth/classroom.courses https://www.googleapis.com/auth/classroom.rosters https://www.googleapis.com/auth/classroom.profile.emails',
    access_type: 'offline',
    grant_type: 'authorization_code',
    refresh_token: 'refresh_token',
    profile_endpoint: 'https://classroom.googleapis.com/v1/userProfiles',
    classroom_endpoint: 'https://classroom.googleapis.com/v1/courses',
    classroom_courses_students: 'https://classroom.googleapis.com/v1/courses',
    //API Integration
    BASEURL: 'http://localhost:3000',
    VERSION_URL: '/api/v1',
    REGISTERAPI_URL: '/users/register',
    LOGINAPI_URL: '/users/login',
    RESETPWD_URL: '/users/reset',
};
//# sourceMappingURL=environment.qa.js.map