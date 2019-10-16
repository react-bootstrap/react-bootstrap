FROM gitpod/workspace-full

USER gitpod

RUN sudo apt-add-repository -yu universe && \
    sudo apt-get install chromium-browser && \
    sudo rm -rf /var/lib/apt/lists/*
