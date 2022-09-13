# Functionalities
Best way to play with app is to visit https://qnsi-salaryman.herokuapp.com/ and login as
guest:salarymanguest

## Tasks
Main app is Task management app.

The following works:

- adding new tasks using form at the bottom
- moving focus between tasks ("j" and "k")
- reordering task (shift+j or shift+k)
- adding subtasks (hover over task and add using form) (keyboard shortcut: "s" when task is focused)
- deleting tasks (keyboard shortcut: hold "r" when task is focused)
- marking task as done (hold "d")
- hiding tasks by clicking minus next to a task (keyboard shortcut "h")
- viewing done tasks log using link in the sidebar
- going into "focus mode" on a specific task ("f" to enter, "F" to go back)

## Planner
This is a copy of https://crushentropy.com/, a cool way to plan your working day. 
You first plan stuff, writing in a format "0800,0900,working on Planner", and it means I will work on Planner from 8:00 to 9:00. Then below that, you write what you really did at this time.

I find it helps me with productivity and having a log of what I did. Saving now works, moving between days is comming next together with option to mention specific tasks for better logging purposes.

# Tree algorithm
Every task can have a subtasks, which creates a tree like structure. A lot of operation need to find a subtree of a given tree. For example when we move a task, we move all of its subtasks with it, and "paste" it after the next task's subtree.

I didn't create a proper tree structure with leftmostChild, and nextSibling. I only use parent child relation. But I also persist order of children in the db, and the tasks are returned and stored in state in the correct order.

One of the most interesting algorithm was finding a subtree using this improper tree. For example given tree:

- A (id 1)
  - A subtask 1 (id 2)
  - A subtask 2 (id 3)
     - A2 subtask A (id 4)
       - A2A subtask 1 (id 5)
     - A2 subtask B (id 6)
  - A subtask 3 (id 7)
- B (id 8)

At first I utilized 3 stopping conditions. For example if searching for subtree `A subtask 2` you take all the tasks until you find next task with the same `parentId` as root of a subtree. If finding subtask for `A2 subtask B`, you need to find `AncestorUncle` meaning some task that is has lower number of parents till the root task. For task `B` you never find task with same `parentID` or `AncestorUncle` so you just continue untill the end of tasks. 

As you can see it's hard to explain and hard to implement, espacially with `AncestorUncle`. But learning about other data structures I understood that we can use a simple stack to hold information about subtree.

1. We iterate over all tasks in order from top to bottom.
2. When current task has id of a rootTask of our subtree (for example `A subtask 2`), we populate `parentIdsStack` with task.id. Stack is [3]
3. For next tasks we check if `parentId` is in stack (at first in the last position) and persist ids of tasks as our subtree match. For `A2 subtask A` it is correct. Stack is [3,4]. For `A2A subtask 1` condition is also correct. Stack is [3,4,5]. But for `A2 subtask B` `parentId` is 3. So we pop from the stack until we find this id or get empty stack. We pop untill stack is [3], at this moment condition is true and our stack is now [3,6]. For `A subtask 3` we pop 2 times and never find `parentId` in stack. So we found the element outside of our tree. 

This algorithm is way cleaner and easier to reason about. You can see implementation in `front-salaryman/src/views/tasks/helpers/getSubTreeIds.ts`

# Test coverage
I have over 90% of test coverage using cypress e2e tests. Cypress gives me big confidence that my functionalities work end to end, altough it takes some time to finish all the tests. In the future I want to test more utilizing unit testing, as it doesn't scale too well.

# How to run
To run locally

## In one window: (backend)

###  using nix
 `cd back-salaryman`
 `cp .env.example .env`
 (you need to update postgresURL)
 `nix-shell`

### traditional

You need postgres running.

`cd back-salaryman/`

`cp .env.example .env`
 (you need to update postgresURL)

`npx prisma generate`

`npx prisma migrate dev`

`npx ts-node index.ts`

the server will start at port 3001

## In second window: (frontend)

### nix

  `cd front-salaryman`

  `nix-shell`

### traditional

`cd front-salaryman/`

`npm start`

Chat window should open with a very basic chat.

# To run tests:

Best to run test server and frontend using `nix-shell test.nix` in both backend/ and frontend/. 
Otherwise make sure ports in `front-salaryman/cypress/support/commands` match ports you want to hit

in /front-salaryman

`npx cypress open`

and run `all.cy.ts`
