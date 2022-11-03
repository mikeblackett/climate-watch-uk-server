import cluster from 'node:cluster'
import { cpus } from 'node:os'
import process from 'node:process'
import startServer from './index.js'

const numCPUs = cpus().length

function startWorker() {
  const worker = cluster.fork()
  console.log(`CLUSTER: Worker ${worker.id} started`)
}

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`)

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    startWorker()
  }

  // log any workers that disconnect; if a worker disconnects, it
  // should then exit, so we'll wait for the exit event to spawn
  // a new worker to replace it
  cluster.on('disconnect', (worker) =>
    console.log(`CLUSTER: Worker ${worker.id} disconnected from the cluster.`)
  )

  // when a worker dies (exits), create a worker to replace it
  cluster.on('exit', (worker, code, signal) => {
    console.log(
      `worker ${worker.process.pid} died with exit code ${code} (${signal})`
    )
    startWorker()
  })
} else {
  const port = process.env.PORT || 8080
  // start our app on worker; see 01-server.js
  startServer(port)
}
