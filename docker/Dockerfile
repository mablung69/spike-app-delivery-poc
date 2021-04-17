FROM node:12-buster-slim

RUN \
  apt-get update && \
  apt-get -y install \
    procps && \
  apt-get autoclean && \
  apt-get clean all && \
  rm -rf /var/lib/apt/lists/* && \
  mkdir /.config /.npm /src

WORKDIR /

RUN mkdir -p {/devops/,/app}

COPY package*.json /app/

COPY docker/bin/start.sh /devops/start.sh

RUN chmod 755 /devops/start.sh

CMD /devops/start.sh
