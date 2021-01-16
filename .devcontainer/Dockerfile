# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.140.1/containers/typescript-node/.devcontainer/base.Dockerfile

ARG VARIANT="1.1.0"

FROM io.iad2.cloud/devtools/ubuntu-18.04-ts-node-docker:${VARIANT}

## INSTALL nats-top https://docs.nats.io/nats-tools/nats_top
#ENV NATS_TOP_VERSION="v0.3.2"
#RUN curl -LO "https://github.com/nats-io/nats-top/releases/download/${NATS_TOP_VERSION}/nats-top-linux_amd64.zip" && unzip -j nats-top-linux_amd64.zip nats-top-linux_amd64/nats-top && chmod a+x nats-top && mv ./nats-top /usr/local/bin/nats-top && rm nats-top-linux_amd64.zip

#RUN curl -L -o opa "https://openpolicyagent.org/downloads/latest/opa_linux_amd64" && chmod 755 ./opa && mv ./opa  /usr/local/bin/opa
WORKDIR /workspace
# [Optional] Uncomment this section to install additional OS packages.
#RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#    && apt-get -y install --no-install-recommends git-lfs
#RUN curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh
# [Optional] Uncomment if you want to install an additional version of node using nvm
# ARG EXTRA_NODE_VERSION=10
# RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${EXTRA_NODE_VERSION}"

# [Optional] Uncomment if you want to install more global node packages
# RUN sudo -u node npm install -g <your-package-list -here>
