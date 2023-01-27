# Kanban Task Management Full stack application

## Distinctiveness and Complexity

    This project is built with Django on the back end and React with Redux on the front end.
    It's an application where you can manage your tasks by 3 columns: Todo, Doing and Done.

## Files and folders created:

- backend folder contains the project back end files
- frontend folder contains all the front end logic, components, screens and styling
- kanban folder contains the back end views, urls, models and serializers that I've created for the application
- staticfiles folder contains all the collected css, js, img files and other static files.
- requirements.txt contains all the packages that need to be installed in order to run the application
- runtime.txt it's the python version used.

## How to run the application

    in the root folder run in cmd: python manage.py runserver

## Description:

    On this applciation you can register and start creating your board with it's tasks and subtasks and change the tasks status, moving them in the columns Todo, Doing and Done.

    The application functionalities are:
    - Register and Login authentication
    - Create, edit, delete Boards
    - Create, edit, delete Tasks or subtasks
    - Change Tasks status by checking it's subtasks
    - Dark, light theme

    I built out the Database and API in the back end using Django and the front end using React with Redux, bootstrap, css and framer-motion.
    When a user authenticate, a token is created in the back end using jwt and django rest framework and is stored in the redux state and used for authorization on the protected routes.
    Each user action is dispatching a function which make a request to the back end using axios, where the requested action modifies the database and sends back data to the front end where it's catched and stored in the redux state from where is used to modify the DOM element.
