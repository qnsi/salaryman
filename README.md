# How to run
Best way to play with app is to visit https://qnsi-salaryman.herokuapp.com/ and login as
guest:salarymanguest

To run locally

In one window:

`cd back-salaryman/`

`cp .env.example .env`

`npx prisma generate`

`npx prisma migrate dev`

`npx ts-node index.ts`

the server will start at port 3001

In second window:

`cd front-salaryman/`

`npm start`

Chat window should open with a very basic chat.

To run tests:

in /front-salaryman

`npx cypress open`

and run `all.cy.ts`

# Functionalities

- adding new tasks using form at the bottom
- moving focus between tasks ("j" and "k")
- reordering task (shift+j or shift+k)
- adding subtasks (hover over task and add using form) (keyboard shortcut: "s" when task is focused)
- deleting tasks (keyboard shortcut: hold "r" when task is focused)
- marking task as done (hold "d")
- primitive hiding tasks by clicking minus next to a task (keyboard shortcut "h")
