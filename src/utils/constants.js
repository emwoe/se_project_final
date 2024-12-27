export const baseUrl =
    process.env.NODE_ENV === 'production'
        ? 'https://api.studyhelper.crabdance.com'
        : 'http://localhost:3001'
