# [Linktree task] - ARCHIVED

This repository is no longer active and has been archived. 

For latest updates and active development, please head over to the new repository at [koii-network/linktree-app](https://github.com/koii-network/linktree-app).

## About this Archived Repository

This linktree task template is out of dated and latest update and feature can be found in [koii-network/linktree-app](https://github.com/koii-network/linktree-app)
with the new database build and namespaceWrapper.

## The New Repository 

New Linktree task template have:
- Frontend build template
- New database nedb setup
- Updates on namespaceWrapper and init.js

## Questions?

If you have any questions, feel free to create an issue at the new repository. We appreciate your contribution and cooperation.

# OLD README

# Linktree task

Tasks run following a periodic structure of 'rounds':

![Screenshot_20230307-091958](https://user-images.githubusercontent.com/66934242/223565192-3ecce9c6-0f9a-4a58-8b02-2db19c61141f.png)



Each round is set by a specific time period, and nodes participate by uploading data to IPFS, posting CIDs to the K2 settlement layer, and sending messages across REST APIs and WebSockets. 

For more information on how the Task Flow works, check out [the runtime environment docs](https://docs.koii.network/microservices-and-tasks/what-are-tasks/gradual-consensus).

If this is your first time writing a Koii Task, you might want to use the [task organizer](https://www.figma.com/community/file/1220194939977550205/Task-Outline).

## Requirements
 - [Node >=16.0.0](https://nodejs.org)
 - [Docker compose](https://docs.docker.com/compose/install/docker)

## What's in the template?
`index.js` is the hub of your app, and ties together the other pieces. This will be the entrypoint when your task runs on Task Nodes

`NamespaceWrappers.js` contains the interfaces to make API calls to the core of the task-node. It contains all the necessary functions required to submit and audit the work, as well as the distribution lists 

`coreLogic.js` is where you'll define your task, audit, and distribution logic, and controls the majority of task functionality. You can of course break out separate features into sub-files and import them into the core logic before web-packing.

## Runtime Options
There are two ways to run your task when doing development:

1. With Timer ON (see .env-local)- When the timer is ON, IPC calls are made by calculating the average time slots of all the task running your node. 

2. With Timer OFF - This allows you to do manual calls to K2 and disables the triggers for round managemnt on K2. Transactions are only accepted during the correct period. Guide for manual calls is in index.js
Linktree Koii task


## coreLogic.js


The most important file in any koii task is the coreLogic.js file. It is provided in the task template and is where most of the functionality will be coded. 


In the Linktree task’s coreLogic, the first function is the task(). This function calls the linktree_task function from the linktree_task.js file.

	

## Linktree_task => this function fetches proofs from the local database, creates a submission object for those proofs, and uploads it to IPFS. IPFS gives back a reference CID of the submission, which the function returns. 


The task function gets the CID from the linktree_task and stores it to the levelDB.


The fetchSubmission function can be used to get the CID of the submission back.


The generateDistributionList function generates a distribution list for rewards based on submissions made by the nodes. It takes all the votes that the nodes have made on the submission and if the false votes are higher than the true votes, this function slashes 70% of the stake of the task submitter as a penalty. If the true votes are higher than the submission is valid and it distributes the rewards.


The submitDistributionList function  submits the distribution list generated by the "generateDistributionList" function.


The validateNode function is called when a node is selected to validate the submission value. It calls the linktree_validate function from the linktree_validate file.


## Linktree_validate.js  => this file verifies the validity of a Linktree CID submission.


The validateDistribution function validates a distribution list submitted by a node for a specific round.


The submitTask function submits the address with a distribution list to K2.


The auditTask function checks a submission in a specific round and confirms that the task is valid.


The auditDistribution checks the distribution list is valid for a specific round.


## Db_model.js

This file contains all the functions required for storing and retrieving data related to the linktree and node proofs used in the Linktree CID Validation task as well as the authorized users list.

getLinktree: retrieves the linktree by it’s public key

setLinktree: sets the linktree associated with the given public key

getAllLinktrees: retrieves all link trees stored in the database

getProofs: retrieves the proofs associated with a given public key

setProofs: sets the proofs associated with a given public key

getAllProofs: retrieves all proofs stored in the database

getNodeProofCid: retrieves the CID associated with a given round of node proofs

setNodeProofCid: sets the CID associated with a given round of node proofs

getAllNodeProofCids: retrieves all CIDs associated with node proofs stored in the database

getAuthList: retrieves the list of the authorized users

setAuthList: sets the authorized list

getAllAuthLists: retrieves all authorized lists stored in the database


## The test folder

This folder contains all the test files for the linktree task.The test folder.

## Router.js

This file contains a set of API endpoints for the linktree.

How to run the task on the task node:


# Testing and Deploying
Before you begin this process, be sure to check your code and write unit tests wherever possible to verify individual core logic functions. `unitTest.js` file helps you to mock task state parameters that are required in core logic function and test it. Testing using the docker container should be mostly used for consensus flows, as it will take longer to rebuild and re-deploy the docker container.

## Build
Before deploying a task, you'll need to build it into a single file executable by running
`yarn webpack`

## Deploy your bundle

Complete the following to deploy your task on the k2 testnet and test it locally with docker compose.

### To get a web3.storage key
If you have already created an account on [web3.storage](https://web3.storage/docs/#quickstart) you'll just need to enter the API key after the prompts in the deploy process.

### Find or create a k2 wallet key
If you have already generated a Koii wallet on yoru filesystem you can obtain the path to it by running `koii config get` which should return something similar to the following:

![截图 2023-03-07 18-13-17](https://user-images.githubusercontent.com/66934242/223565661-ece1591f-2189-4369-8d2a-53393da15834.png)

The `Keypair Path` will be used to pay gas fees and fund your bounty wallet by inputting it into the task CLI.

If you need to create a Koii wallet you can follow the instructions [here](https://docs.koii.network/koii-software-toolkit-sdk/using-the-cli#create-a-koii-wallet). Make sure to either copy your keypair path from the output, or use the method above to supply the task CLI with the proper wallet path.

### Deploy to K2
To test the task with the [K2 Settlement Layer](https://docs.koii.network/settlement-layer/k2-tick-tock-fast-blocks) you'll need to deploy it. 

We have included our CLI for creating and publish tasks to the K2 network in this repo. Tips on this flow can be found [in the docs](https://docs.koii.network/koii-software-toolkit-sdk/create-task-cli). One important thing to note is when you're presented with the choice of ARWEAVE, IPFS, or DEVELOPMENT you can select DEVELOPMENT and enter `main` in the following prompt. This will tell the task node to look for a `main.js` file in the `dist` folder. You can create this locally by running `yarn webpack`.

## Run a node locally
If you want to get a closer look at the console and test environment variables, you'll want to use the included docker-compose stack to run a task node locally.

1. Link or copy your wallet into the `config` folder as `id.json`
2. Open `.env-local` and add your TaskID you obtained after deploying to K2 into the `TASKS` environment variable.\
3. Run `docker compose up` and watch the output of the `task_node`. You can exit this process when your task has finished, or any other time if you have a long running persistent task.

### Redeploying
You do not need to publish your task every time you make modifications. You do however need to restart the `task_node` in order for the latest code to be used. To prepare your code you can run `yarn webpack` to create the bundle. If you have a `task_node` ruinning already, you can exit it and then run `docker compose up` to restart (or start) the node.

### Environment variables
Open the `.env-local` file and make any modifications you need. You can include environment variables that your task expects to be present here, in case you're using [custom secrets](https://docs.koii.network/microservices-and-tasks/task-development-kit-tdk/using-the-task-namespace/keys-and-secrets).
