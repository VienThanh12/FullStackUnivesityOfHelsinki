# A container

Software Development includes the whole lifecycle from envisioning the software to programming and to releasing it to the end-users, and even maintaining it.

Containers encapsulate your application into a single package.

- The application (This one will need dependencies to run)
- All of its dependencies

  -> Each container can run isolated fro, other containers
  It also pervents the application inside from accessing files and resources of the device.
  We can decide that whethere we give it the contained applications permission to access files and specify avalable resources.

# Problem:

When you build a website, you need many packages or dependencies to run the app but when you switch to another machine, you have to download all of these things again.
So docker will solve this problem.

# Solution:

Pack everything in a container. It doesn’t need to know what is inside the box but you just need to run it to use the application. By running a virtual machine

# Type of Docker:

Docker-file: Describes what you need in your projects

Docker-images: Docker hub (can be uploaded to a cloud whether you want it public or private)

Container

# Kubernetes

Kubernetes → organize all of the docker containers (have too many containers)
