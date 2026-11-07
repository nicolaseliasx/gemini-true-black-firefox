FROM debian:trixie-slim
RUN apt-get update && apt-get install -y --no-install-recommends firefox-esr imagemagick ca-certificates procps python3 python3-venv python3-pip \
 && rm -rf /var/lib/apt/lists/* && ln -sf /usr/bin/firefox-esr /usr/local/bin/firefox \
 && python3 -m venv /opt/venv && /opt/venv/bin/pip install --no-cache-dir marionette_driver
ENV PATH="/opt/venv/bin:$PATH"
