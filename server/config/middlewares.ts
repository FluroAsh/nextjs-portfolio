module.exports = [
  "strapi::errors",
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "dl.airtable.com",
            "at-strapi-blog.s3.ap-southeast-2.amazonaws.com",
            "at-strapi-blog-development.s3.ap-southeast-2.amazonaws.com",
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "dl.airtable.com",
            "at-strapi-blog.s3.ap-southeast-2.amazonaws.com",
            "at-strapi-blog-development.s3.ap-southeast-2.amazonaws.com",
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
];
