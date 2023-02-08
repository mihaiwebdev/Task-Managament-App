# Kanban Task Management Full stack application


## Description:

    On this applciation you can register and start creating your board with it's tasks and subtasks and change the tasks status,
    moving them in the columns Todo, Doing and Done.

    The application functionalities are:
    - Register and Login authentication
    - Create, edit, delete Boards
    - Create, edit, delete Tasks or subtasks
    - Change Tasks status by checking it's subtasks
    - Dark, light theme

    I built out the Database and API in the back end using Django and the front end using React with Redux, bootstrap, css and framer-motion.
    When a user authenticate, a token is created in the back end using jwt and django rest framework and is stored in the redux state
    and used for authorization on the protected routes.
    Each user action is dispatching a function which make a request to the back end using axios, where the requested action modifies the database
    and sends back data to the front end where it's catched and stored in the redux state from where is used to modify the DOM element.
    
    The project desing is from frontendmentor.io
