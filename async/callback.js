/**
 * Asynchronous requests can be made in three ways
 * 1. Callbacks
 * 2. Promises
 * 3. Async/await
 */

/**
 *
 * @param {*} Callbacks
 */

// getUser(1, displayUser);

function displayCommits(commits) {
  console.log(commits);
}

function displayRepos(repos) {
  console.log(repos);
  getCommits(repos, displayCommits);
}

function displayUser(user) {
  console.log(user);
  getRepos(user.githubUser, displayRepos);
}

const getUser = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading a user from the database...");
      resolve({ id, githubUser: "Mojeed" });
    }, 2000);
  });
};

const getRepos = (user) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(["repo1", "repo2", "repo3"]);
    }, 2000);
  });
};

const getCommits = (repo) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(["commit1", "commit2", "commit3"]);
    }, 2000);
  });
};

getUser(1)
  .then((res) => getRepos(res.githubUser))
  .then((res) => getCommits(res[0]))
  .then((res) => console.log(res))
  .catch((err) => console.log(err.message));

/**
 * Async/await
 * This makes us write asynchronous code in a synchronous manner
 */

async function displayCommit() {
  try {
    const user = await getUser(1);
    const repos = await getRepos(user);
    const commits = await getCommits(repos);
    console.log("New", commits);
  } catch (err) {
    console.log(err.message);
  }
}

displayCommit();
