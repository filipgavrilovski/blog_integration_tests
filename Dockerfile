FROM ubuntu
WORKDIR /blog_integration_tests
RUN apt update
RUN  apt-get --yes install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb curl
RUN curl -s https://deb.nodesource.com/setup_16.x | bash
RUN apt install --yes nodejs -y
COPY package.json .
RUN npm install
COPY . .