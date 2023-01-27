from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from kanban.models import Subtask, Task, Column, Board, User
from kanban.serializers import TaskSerializer, SubtaskSerializer

# Create your views here.


# Get task
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getTask(request, pk):

    # Get user
    logged_user = request.user

    # Get task, col, board and check the user
    task = Task.objects.get(id=pk)
    col = task.column
    board = col.board

    if board.user == logged_user:

        subtasks = task.subtask_set.all()

        subtasks_serializer = SubtaskSerializer(subtasks, many=True)

        task_serializer = TaskSerializer(task, many=False)

        return Response({'task': task_serializer.data, 'subtasks': subtasks_serializer.data})

    else:
        message = {'detail': 'You do not have permission'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


# Update task and subtask status
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateTaskStatus(request):

    # Get the data
    data = request.data

    # Change subtasks status
    if len(data['subtasks']) > 0:
        for i in data['subtasks']:
            subtask = Subtask.objects.get(id=i['id'])
            subtask.isCompleted = i['isCompleted']
            subtask.save()

    # Get the task and change it's status and column
    task = Task.objects.get(id=data['taskID'])

    columns = task.column.board.column_set.all()

    if data['status']:
        task.status = data['status']
        for i in columns:
            if i.name == data['status']:
                task.column = i

        task.save()

    return Response('Task successfully updated')


# Edit task
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def editTask(request, pk):

    # Get the task to be edited
    task = Task.objects.get(id=pk)

    # Get the current subtasks
    subtasks = task.subtask_set.all()

    # Get the columns
    columns = task.column.board.column_set.all()

    # Get the data
    taskTitle = request.data['title']
    taskDescription = request.data['description']
    taskSubtasks = request.data['subtasks']
    deletedSubtask = request.data['deletedSubtask']
    taskStatus = request.data['status']

    # Set the task title and description
    if len(taskTitle) > 0:
        task.title = taskTitle

    if len(taskDescription) >= 0:
        task.description = taskDescription

    if len(taskStatus) > 0:
        task.status = taskStatus
        for i in columns:
            if i.name == taskStatus:
                task.column = i

    # Delete subtasks if any
    if len(deletedSubtask) > 0:
        for i in subtasks:
            for x in deletedSubtask:
                if i.id == int(x['deleteSubtask']):
                    i.delete()

    # Edit or add subtasks if any
    if len(taskSubtasks) > 0:
        for i in taskSubtasks:
            if i['new'] == 'old':
                for x in subtasks:
                    if x.id == i['id']:
                        x.title = i['title']
                        x.save()

            else:
                newSubtask = Subtask.objects.create(
                    task=task,
                    title=i['title']
                )
                newSubtask.save()

    task.save()

    return Response('Task successfully updated')


# Create new task
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createTask(request):
    # Get user
    logged_user = request.user
    user = User.objects.get(username=logged_user)

    # Get data
    data = request.data

    try:
        # Get the task's board
        board = Board.objects.get(id=data['boardID'], user=user)

        # Get the board's column
        column = Column.objects.get(board=board, name=data['status'])

        # Create task
        task = Task.objects.create(
            column=column,
            title=data['title'],
            description=data['description'],
            status=data['status']
        )

        task.save()

        # Create task subtasks
        for i in data['subtasks']:
            if len(i['title']) > 0:
                subtask = Subtask.objects.create(
                    task=task,
                    title=i['title']
                )
                subtask.save()

        subtasks = task.subtask_set.all()

        task_serializer = TaskSerializer(task, many=False)
        subtask_serializer = SubtaskSerializer(subtasks, many=True)

        return Response({'task': task_serializer.data, 'subtasks': subtask_serializer.data})

    except:
        message = {'detail': 'Bad Request, you do not have permission'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


# Delete task
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteTask(request, pk):

    # Get task to be deleted
    task = Task.objects.get(id=pk)

    task.delete()

    return Response('Subtask successfully deleted')
