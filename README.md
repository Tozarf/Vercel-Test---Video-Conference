# Config

Clone the repo to a desired location in your computer.

$ git clone https://github.com/Quielo/R6VC

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

$ git remote add origin https://github.com/Quielo/R6VC

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
commits, and in the remote repo, changes should appear under the
"develop" branch.

NAME LIST TO UPDATE:

1- Quielo

2-

3-

4-

\*\*Also everything should be update, but in case it doesn't, write down:

$ git pull origin develop

That should do.

To check if the project is setup correctly in you VSC terminal write:

$ npm start

localhost:3000 should open normally and down the React logo should appeard
"Hello world" in blue.

After finishing all this setup is time to move to your personal branch,
try practicing repeating the last steps for pulling and switching to develop,
but insted try to switch to your personal branch. 
{
  moni = $ git pull origin moni / $ git checkout moni
  
  charly = $ git pull origin charly / $ git checkout charly
  
  fausto = $ git pull origin fausto / $ git checkout fausto
  
  quielo = $ git pull origin quielo / $ git checkout quielo
}

Happy Hacking!
