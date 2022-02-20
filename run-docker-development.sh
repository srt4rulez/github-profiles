#!/bin/bash

docker_image="node:16"
repo_name="github-profiles"
user="node"

# Create netlify's config directory on the host.
# This will be mounted from host to container to save netlify config when working in docker.
mkdir -p ~/.config/netlify/

# https://docs.docker.com/engine/reference/commandline/run/
args=(
    # Keep STDIN open even if not attached
    --interactive

    # Allocate a pseudo-TTY
    --tty

    # Assign a name to the container
    --name "$repo_name"

    # Automatically remove the container when it exits
    --rm

    # Publish a container's port(s) to the host
    --publish 3000:3000 # create react app's default server port.

    --publish 8888:8888 # netlify's dev server port.

    # Bind mount a volume from the <host>:<container>
    --volume "$(pwd):/$repo_name" # mount the project directory to a directory of the repo name.

    # Bind mount host's netlify config to docker container to prevent having to
    # setup netlify everytime we run docker.
    --volume "$HOME/.config/netlify:/home/$user/.config/netlify"

    # Working directory inside the container (the starting directory when the container runs)
    --workdir /"$repo_name"

    # Username or UID (format: <name|uid>[:<group|gid>])
    --user "$user"
)

sudo docker run "${args[@]}" "$docker_image" /bin/bash
