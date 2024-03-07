# todo-tasks
# Running JSON Server Guide

A quick guide to setting up and running a mock API using JSON Server.

## Step 1: Install JSON Server

Open a terminal and run the following command to install JSON Server globally via npm:

```
npm install -g json-server
```

## Step 2: Start JSON Server

Open a terminal in the directory containing db.json and execute:

```
json-server --watch db.json
```
This command starts JSON Server and watches for changes in db.json. The server will be accessible at http://localhost:3000 (unless another port is specified with --port).

#### Now, you can interact with your API, e.g., http://localhost:3000/posts will return the list of posts.

## Step 3: Final Steps: Installing Dependencies and Running the Angular App

After setting up JSON Server as described, follow these steps to install all dependencies required for your Angular project and run it.

### Install Dependencies

Navigate to the root directory of your Angular project in the terminal. Run the following command to install all dependencies listed in your `package.json` file:

```
npm ci
```
This ensures that all libraries and frameworks your Angular project depends on are downloaded and ready for use.

### Running the Angular Application
Once all dependencies are installed, you can start your Angular application with the Angular CLI's serve command:
```
ng serve
```
