FROM ubuntu:14.04

LABEL ENG W4THINK Team

WORKDIR /opt

# Install Ubuntu dependencies
RUN sudo apt-get update && \
	sudo apt-get install curl git build-essential -y

# Install PPA
RUN curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -

# Install nodejs
RUN sudo apt-get update && \
	sudo apt-get install nodejs -y

# Update npm
RUN sudo npm cache clean -f && \
	sudo npm install -g n && \
	sudo n stable

# Download latest version of the code and install npm dependencies
RUN git clone https://github.com/IgorDespot/NgsiConnectorWeb.git && \
	cd NgsiConnectorWeb && \
	npm install

# Change Workdir
WORKDIR /opt/NgsiConnectorWeb

CMD ["sudo", "npm", "start"]
