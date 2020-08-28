const { events, Job } = require("brigadier");

events.on("push", function(e, project) {
  console.log("received push for commit " + e.revision.commit)

  // Create a new job

 var hello = new Job("hello", "alpine:3.4")
  hello.tasks = [
    "echo Hello",
    "echo World"
  ]

 var goodbye = new Job("goodbye", "alpine:3.4")
  goodbye.tasks = [
    "echo Goodbye",
    "echo World"
  ]
   var docker = new Job("job2" , "docker:dind");
   
    docker.privileged = true;
    docker.env = {
    DOCKER_DRIVER: "overlay"
    };
  docker.env.DOCKER_USER = project.secrets.dockerLogin
  docker.env.DOCKER_PASS = project.secrets.dockerPass

  docker.tasks = [
    "dockerd-entrypoint.sh &",
    "sleep 10",
    "cd src",
    "pwd",
    "cat README.md",
    "ls -lart",
    "docker build -t kartikeya390/dockerdeploy:11 .",
    "docker login docker.io -u $DOCKER_USER -p $DOCKER_PASS",
    "docker push kartikeya390/dockerdeploy:11",
    "docker images"
]

  docker.streamLogs = true;

  // We're done configuring, so we run the job
 // hello.run()
 // goodbye.run()
//  docker.run()
})

//events.on("push", (e, project) => {
// console.log(e)
//console.log(e.revision.ref) {
    if (e.revision.ref == "develop") 	  

{
      docker.run()
}

    else if (e.revision.ref == "master")
     
   {
        hello.run()

       }

     else (e.revision.ref == "test")

 {   
        goodbye.run()

}


