# github-profiles

Search app that uses GitHub's graphql API to retrieve user information.

## Getting Started

### Netlify Development

We're using netlify functions to avoid leaking our GitHub API token in the browser by creating a serverless function. 

First, generate a [GitHub Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) with the `user` scope.

Next, create a [.env](./.env) file in the current project with the token:

```dotenv
GITHUB_GRAPHQL_API_TOKEN=<token>
```

This will then be injected into netlify's dev server.

Next, run the docker container and follow the commands below to start the netlify development server that also starts 
create-react-app's development server for communicating between the FE (react-create-app) and the API (netlify functions).

```bash
# Starts a docker container for development (with node, npm, yarn etc)
./run-docker-development.sh

# Install our deps
yarn install

# authenticate with netlify
# note: this should only have to be done once,
# since we're mounting the config file to/from the host and container.
yarn netlify login

# Link up the current project to a netlify site
# This also only has to be done once.
yarn netlify link

# Start up the netlify dev server for the serverless functions + react-create-app (runs yarn start)
yarn netlify dev
```

Open [http://localhost:8888](http://localhost:8888) with your browser to see the result.

### Without Netlify

We can also just run the FE development server using create-react-app, but the server will not be able to communicate 
with the API. 

```bash
# Starts a docker container for development (with node, npm, yarn etc)
./run-docker-development.sh

# Install our deps
yarn install

# Start the create-react-app development server
yarn start
# or
yarn s
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
