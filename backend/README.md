# 🚀 Environment Variables
To get started copy over `.env.example` into a new file named ".env" and ensure you have `NODE_ENV` set to **development**:

```sh
# env.example
NODE_ENV=development
DATABASE_URL=postgresql://username:password@localhost:5432/database_name

# Strapi (ignore these for now)
# ADMIN_JWT_SECRET=generated_jwt_key
# API_TOKEN_SALT=token_salt
# APP_KEYS=app_key

# AWS
AWS_ACCESS_KEY_ID=access_key
AWS_ACCESS_SECRET=secret_key
AWS_BUCKET=bucket_name
AWS_REGION=aws_region
```

Don't worry about the Strapi keys yet, we'll deal with these later.

## Postgres Database Setup

You'll need to set up a [PostgreSQL database](https://www.postgresql.org/download/) on your local machine and then ensure you have a valid [PG Connection String](https://www.npmjs.com/package/pg-connection-string) that can be parsed. 

> ⚠️ FYI: You might need to prefix the `DATABASE_URL` with "postgres" instead of "postgresql" depending on your machine &/or version of PostgreSQL set up on your machine.

You can use the following, and replace the placeholders with your credentials & database name
```
> postgresql://username:password@localhost:5432/database_name
```

Once you've done that replace the `DATABASE_URL` value with the string that matches your Postgres database name/credentials.


## Strapi Variables
For each of these variables we need to generate unique base-64 encoded strings. I would recommend one of following two options, depending on your system (MacOS/Linux or Windows):

**OpenSSL**
```sh
openssl rand -base64 16
```

**Node Crypto Library**
```js
const crypto = require('crypto'); const randomBytes = crypto.randomBytes(16).toString('base64'); console.log(randomBytes);
```

You should get a random base64-encoded string as output.

```sh
# Example base64-encoded string
> 5rSdrGwWJxZ3KlXzn/FJdg==
```

### API_TOKEN_SALT

Generate the base64-encoded string and paste it as the value for `API_TOKEN_SALT` in your `.env` file.

### JWT_SECRET

Run the Strapi server using `npm run develop`, if you have specified valid env variables (AWS & Database URL) the server will refuse to start and Strapi will generate the `JWT_SECRET` variable.

Alternatively, just generate one using one of the above methods before you start the server.

### APP_KEYS

For `APP_KEYS` the only difference is that we **must** provide 2-3 comma separated base-64 encoded keys as opposed to 1. 

Generate the 2-3 keys and add these to the `APP_KEYS` variable, you should have something like this:

```sh
# Two base-64 encoded strings
> APP_KEYS=AE5tjiNoCQ9KT1mE26ojjg==,oG6VP6PblGoPcYk9o0Elkw==
```

## AWS Variables

To access the Bucket through Strapi we just need to provide the credentials for an IAM User with either Administrator access or the ability to read/write to the S3 bucket you've created to stored Strapi uploads.

```sh
# AWS
AWS_ACCESS_KEY_ID=access_key
AWS_ACCESS_SECRET=secret_key
AWS_BUCKET=bucket_name
AWS_REGION=aws_region
```

Paste the **Access Key** and **Secret Key** for your IAM user into the values for each, and ensure that you've specified the **Bucket name** as-well as the **Region**; in my case I'm using `ap-southeast-2`, but if you're using a different region like `us-east-1`, use that one.

Make sure that ACL's are enabled for your Bucket so Strapi can work its magic, and has the correct permissions to read/write.


# Configuring Permissions in your Admin Panel
In order for the GraphQL plugin to work as expected we need to ensure that **Public** access is enabled for each of the Models that we have defined (including the Upload model).

Start the server and navigate to the Admin panel, go to "Settings" and select "Roles". From here select **"Public"** and scroll down until you see "Category", "Post" and "Upload". 

For each of these we need to enable the following:
1. `find`
2. `findOne`

This will allow us to query our GraphQL API on the frontend through Apollo for posts, categories and uploads that are stored in our S3 bucket when working locally, and accessing the API frontend at `http://localhost:1337/graphql`.
