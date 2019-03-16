const { Worker, isMainThread } = require("worker_threads");

function runService(workerData) {
  const worker = new Worker("./service.js", { workerData });
  worker.postMessage("once");
  worker.on("message", incoming => console.log({ incoming }));
  worker.on("error", code => new Error(`Worker error with exit code ${code}`));
  worker.on("exit", code =>
    console.log(`Worker stopped with exit code ${code}`)
  );
  worker.postMessage("twice");
  worker.postMessage("three times");
  worker.postMessage("exit");
  setTimeout(() => worker.postMessage("you won't see me"), 100);
}

async function run() {
  const result = runService("let's begin");
  console.log({ isMainThread });
}

run().catch(err => console.error(err));
