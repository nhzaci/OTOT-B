# requires Node 16+
FROM node:16

# create app dir
RUN mkdir -p /usr/src/app

# set working dir
WORKDIR /usr/src/app

# Copy all files over for build
COPY package.json yarn.lock ./

# Install app deps
RUN yarn install

# Copy over app source
COPY . /usr/src/app

# expose port 3000 for api calls
EXPOSE 3000

# build yarn proj into dist output files
RUN yarn build

# run yarn start on `docker run`
CMD ["yarn", "start"]