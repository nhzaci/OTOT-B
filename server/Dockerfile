# requires Node 16+
FROM node:16

# create app dir
RUN mkdir -p /usr/app/src

# set working dir
WORKDIR /usr/app

# Copy all files over for build
COPY . ./

# Install app deps without amending lock file
RUN yarn install --frozen-lockfile

# set production
ENV NODE_ENV production
# set port
ENV PORT 5000

# expose port 5000, default for aws ebs for api calls
EXPOSE 5000

# build yarn proj into dist output files
RUN yarn build

# run yarn start on `docker run`
CMD ["yarn", "start"]