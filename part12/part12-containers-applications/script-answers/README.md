# Docker Container

# Docker

A container
### What problems it solves?
Problem: When you build a website, you need many packages or dependencies to run the app but when you switch to another machine, you have to download all of these things again. 

So docker will solve this problem.

### How it does?
Pack everything in a container. It doesn’t need to know what is inside the box but you just need to run it to use the application. By running a virtual machine

### What kind of things we will have when we deal with docker

Docker-file: Describes what you need in your projects 

Docker-images: Docker hub

Kubernetes → organize all of the docker containers (have too many containers)

## SYNTAX

$ docker -v
Docker version 25.0.3, build 4debf41

*container run IMAGE-NAME*

$ docker container run hello-world

script // to record

*docker container run -it ubuntu bash*

*docker container run --rm ubuntu ls*

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/57194585-3e3d-4a96-ac89-016303ba1e51/21c0f8f7-8e8c-45fe-af57-4748fbc26c3e/Untitled.png)

- [ ]  `docker container ls -a`  (shorter form **docker ps -a**)

*start CONTAINER-ID-OR-CONTAINER-NAME*.  
`$ docker start hopeful_clarke`

docker container ls (to see just those containers that are running)

docker kill .. ( sends a [signal SIGKILL](https://man7.org/linux/man-pages/man7/signal.7.html) to the process forcing it to exit, and that causes the container to stop. We can check it's status with *container ls -a*:)

```bash
Usage:  docker container run [OPTIONS] IMAGE [COMMAND] [ARG...]
Run a command in a new container

Options:
  ...
  -i, --interactive                    Keep STDIN open even if not attached
  -t, --tty                            Allocate a pseudo-TTY
  ...
```

docker exec -it my_container bash // running a docker
