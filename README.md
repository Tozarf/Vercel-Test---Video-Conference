# Config

Clone the repo to a desired location in your computer.

$ git clone https://github.com/Quielo/r6vc-app.git

Then you will need to copy the "node_modules" folder into the cloned project.
after that tap:

$ git status

If git hasn't been init yet, then write:

$ git init

Proceed to update your git config:

$ git config --global user.name {your name}

$ git config --global user.email {your email}

Check if your remote is set up correctly, tap:

$ git remote

It should be called "origin".
if nothing appears then write down:

$ git remote add origin https://github.com/Quielo/r6vc-app.git

Then "origin" should appear as your remote.
Next we need to fetch the develop branch from the remote,
and pair it with you local, so write:

$ git fetch origin develop

$ git checkout develop

After you have done all this steps, try to add your name down below,
then add and commit, and finally push to see if everything is working
correctly.

So write the next:

(modify the README adding your name to the list)

$ git add .

$ git commit -m "Commit test"

$ git push

If everything goes north, there should be no problems when pushing the
commits, and in the remote repo, changes shoul appear under the
"develop" branch.

NAME LIST TO UPDATE:

1- Quielo

2-

3-

4-
