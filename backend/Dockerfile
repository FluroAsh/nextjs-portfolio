# Creating multi-stage build for production
FROM node:14-alpine as build
RUN apk update && apk add --no-cache build-base py3-pip gcc autoconf automake zlib-dev libpng-dev git > /dev/null 2>&1
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/
COPY package.json package-lock.json ./
COPY node_modules ./node_modules

RUN npm install -g node-gyp
# RUN npm config set fetch-retry-maxtimeout 600000 -g && npm install --only=production
RUN npm config set fetch-retry-maxtimeout 600000 -g
RUN SHARP_IGNORE_GLOBAL_LIBVIPS=1 npm_config_arch=arm64v8 npm_config_platform=linuxmusl npm install --verbose sharp@0.31.0

# Install npm dependencies, including sharp with prebuilt binaries

# Rebuild sharp explicitly specifying architecture
# Install other dependencies
# RUN npm config set fetch-retry-maxtimeout 600000 -g
# RUN npm install --only=production

# RUN npm rebuild sharp --arch=x64 --platform=linuxmusl
RUN node -e "require('sharp')"

ENV PATH /opt/node_modules/.bin:$PATH
WORKDIR /opt/app
COPY . .
RUN npm run build

# Creating final production image
FROM node:14-alpine
COPY . .
RUN chown -R node:node /opt/app
USER node
RUN ["npm", "run", "build"]
EXPOSE 1337
CMD ["npm", "run", "develop"]

