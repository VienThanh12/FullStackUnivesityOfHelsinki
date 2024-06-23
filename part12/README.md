# Docker Container

# Docker and Containerization

**Docker** is a tool designed to package and run applications in lightweight containers. This approach solves the problem of having to install and configure all the dependencies of an application every time you want to run it on a different machine.

## How Docker Works

Docker creates a **container** that packages all the dependencies needed for a given application. The container can be run on any machine that has Docker installed, without the need to install the dependencies separately.

## Docker Components

- **Dockerfile**: This is a text file that describes the dependencies and configuration required for your application.
- **Docker Images**: These are read-only templates that you build from a set of instructions written in your Dockerfile. Docker images define both what you want your packaged application and its dependencies to look like and what processes to run when it's launched.
- **Docker Hub**: This is a cloud-based registry service where you can link to code repositories, build your images, store them, and deploy them.
- **Kubernetes**: This is a system for orchestrating and managing containers, which becomes necessary when you start dealing with multiple containers.

## Basic Docker Commands

- Check Docker version: `$ docker -v`
- Run a Docker container: `$ docker container run IMAGE-NAME`
- List all Docker containers: `$ docker container ls -a` (short form: `docker ps -a`)
- Start a Docker container: `$ docker start CONTAINER-ID-OR-CONTAINER-NAME`
- Kill a Docker container: `$ docker kill CONTAINER-ID-OR-CONTAINER-NAME`
- Run command in a Docker container: `$ docker exec -it CONTAINER-ID-OR-CONTAINER-NAME COMMAND`
- Create a new image from a container: `$ docker commit CONTAINER-ID-OR-CONTAINER-NAME NEW-IMAGE-NAME`
- List your Docker images: `$ docker image ls`
- Run the new image as follows: `docker run -it hello-node-world bash`
- Remove Container: `docker container rm hopeful_clarke`
- Copy a file from your own machine to the container: `$ docker container cp ./yourfile.js container-name:/destination-path/yourfile.js`

By using Docker, developers can ensure that the application will run on any other Linux machine regardless of any customized settings that machine might have that could differ from the machine used for writing and testing the code.
