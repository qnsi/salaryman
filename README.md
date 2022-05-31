# Why such limited code example
I decided to look for jobs recently, dropping my goal of entrepreneurship for now. 

I am realistically programming my whole life, starting in the primary school, where I was a laurate at country wide programming competition in Logo. But I was switching languages quite a bit, lately focusing on javascript with typescript.

I am happy to take programming assignment to show my capabilities.

# Why I decided on javascript
You can utilize javascript both on frontend and backend. It's ideal for someone working on one person projects, like my business ideas. Node has one of the biggest ecosystems, even though it comes with big security risks and lately I stopped using that many third parties libraries, scared of supply-chain attacks.

# Why mostly e2e tests
This is how you would check if your program works without any tests. You would run a backend / frontend and perform some action in the browser. It is also what ultimately users want. The whole system to work correctly. I am not against unit tests, but I find the confidence e2e tests give, that your web app is working, unparalled.

# How to run
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

in project root

Right now you need to stop development backend server and run it again with different db

`DATABASE_URL="file:./test.db" npx prisma migrate dev`

`DATABASE_URL="file:./test.db" npx ts-node index.ts`

`npm install -D @playwright/test`

`npx playwright test`

Run test with playwright inspector
add `await page.pause()`
run `PWDEBUG=1 npx playwright test tests/unreadMessages `

# Functionalities

- adding new tasks using form at the bottom
- moving focus between tasks ("j" and "k")
- reordering task (shift+j or shift+k)
- adding subtasks (hover over task and add using form) (keyboard shortcut: "s" when task is focused)
- deleting tasks (keyboard shortcut: hold "r" when task is focused)
- marking task as done (hold "d")
- primitive hiding tasks by clicking minus next to a task (doesnt work right now with nested collapsed) (keyboard shortcut "h")
