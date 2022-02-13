# github-profiles

Search app that uses gitHub's graphql API to retrieve user information

## Getting Started

First, generate a github personal access token with `user` scope. 
Create a [.env.local](./.env.local) file in the project with the token:

```dotenv
GITHUB_GRAPHQL_API_TOKEN=<token>
```

Then, run the development server:

```bash
# Starts a docker container for development (with node, npm, yarn etc)
./run-docker-development.sh

# Install our deps
yarn install

# Start the nextjs development server
yarn server
# or
yarn s
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/pages/index.tsx`. The page auto-updates as you edit the file.
