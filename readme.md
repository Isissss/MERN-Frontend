
# MERN Kanban Board - Front-end

This project was part of a (full-stack) course at the University of Applied Sciences Rotterdam. This is the front-end part for an API that we created. I chose to build a kanban board. 
## Tech Stack

**Client:** Bootstrap (bootstrap-react), React 

**Server:** Node, Express, MongoDB


## Lessons Learned
This was my first app using React. I have learned to:
- Implement the basic CRUD functionalities (using [my own api](https://github.com/Isissss/MERN-backend)) using react components
- Use the React hooks useState, useEffect, useContext, useRef, Fragments, Custom hooks
- Work with JWT tokens and React protected routes (by using context and custom hooks) ([back-end implementation](https://github.com/Isissss/MERN-backend) tutorials followed from [Dave Gray](https://www.youtube.com/@DaveGrayTeachesCode) as this was my first time working with JWT and protected routes in React. I expanded this system by checking ownership of boards instead of the universal system he created.
- Work with the libraries [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd) and [react-router](https://reactrouter.com/en/main)
- Work with Socket.IO for a real-time application when creating/deleting/moving/editing cards etc. using rooms and events.   

## Future additions
Due to the lack of time there are plenty of things that I was not able to implement. In the future I would like to add the following:
- [x] Live updates through Socket.IO 
- [X] Ability to add boards
- [ ] Add indexes to list order and ~~fix bug when dragging a card in the same list~~
- [X] Add an authentication and Authorization system
- [ ] Deploy front-end
- [ ] Add ability to add members 
 
## Screenshots

![App Screenshot](https://i.imgur.com/C9E68Xp.png)
![App Screenshot](https://i.imgur.com/GvzDjWr.png)
![App Screenshot](https://i.imgur.com/PV9dxv6.png)
![App Screenshot](https://i.imgur.com/t0pmgmQ.png)
## Run Locally

Clone the project

```bash
  git clone https://github.com/Isissss/MERN-Frontend
```

Go to the project directory

```bash
  cd my-project/client
  cd my-project/server
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  /cd my-project/server
  npm run server

  /cd my-project/client
  npm run start
```

