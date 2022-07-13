ARG VARIANT="16-bullseye"
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-${VARIANT}

# [Optional] Uncomment this section to install additional OS packages.
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
        openjdk-11-jre-headless

# [Optional] Uncomment if you want to install more global node modules
RUN su node -c "npm install -g firebase-tools"

# RUN mkdir -p /home/node/.cache/firebase && chown -R node:node /home/node/.cache/firebase
