from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from kanban.models import Board, Column
from django.contrib.auth.models import User
from kanban.serializers import BoardSerializer, ColumnSerializer, TaskSerializer, SubtaskSerializer

# Create your views here.


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getBoards(request):

    # Get user
    logged_user = request.user

    user = User.objects.get(username=logged_user)

    # Get all boards
    try:
        boards = user.board_set.all()

    except:
        message = {"detail": 'You do not have yet any boards'}

        return Response(message, status=status.HTTP_204_NO_CONTENT)

    # Serialize data
    serializer = BoardSerializer(boards, many=True)

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getBoard(request, pk):

    # Get user
    logged_user = request.user
    user = User.objects.get(username=logged_user)

    # Get the requested board
    try:
        board = Board.objects.get(id=pk, user=user)

        # Get all board columns
        columns = board.column_set.all()

        # Get all columns tasks
        tasks = []

        for i in columns:
            tasks += i.task_set.all()

        # Get all tasks subtasks
        subtasks = []

        for i in tasks:
            subtasks += i.subtask_set.all()

        # Serialize data
        board_serializer = BoardSerializer(board, many=False)
        col_serializer = ColumnSerializer(columns, many=True)
        task_serializer = TaskSerializer(tasks, many=True)
        subtask_serializer = SubtaskSerializer(subtasks, many=True)

        return Response([
            {"board": board_serializer.data},
            {"cols": col_serializer.data},
            {"tasks": task_serializer.data},
            {"subtasks": subtask_serializer.data}
        ])

    except:
        message = {"detail": 'Bad request, you do not have permission'}

        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createBoard(request):

    # Get user
    logged_user = request.user

    user = User.objects.get(username=logged_user)

    # Get data
    data = request.data

    # Create new board
    board = Board.objects.create(
        user=user,
        name=data['name']
    )

    board.save()

    # Create board columns
    for i in data['columns']:
        column = Column.objects.create(
            board=board,
            name=i
        )
        column.save()

    serializer = BoardSerializer(board, many=False)

    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def editBoard(request, pk):

    # Get user
    logged_user = request.user
    user = User.objects.get(username=logged_user)

    try:
        # Get the board
        board = Board.objects.get(id=pk, user=user)

        # Get data from front end
        data = request.data

        # Change board name and save it
        board.name = data['title']

        board.save()

        # Serialize edited board and send it back
        serializer = BoardSerializer(board, many=False)

        return Response(serializer.data)

    except:
        message = {"detail": 'Bad request, you do not have permission'}

        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteBoard(request, pk):

    # Get user
    logged_user = request.user
    user = User.objects.get(username=logged_user)

    try:
        # Get board
        board = Board.objects.get(id=pk, user=user)

        board.delete()

        return Response('Board successfully deleted!')

    except:
        message = {"detail": 'Bad request, you do not have permission'}

        return Response(message, status=status.HTTP_400_BAD_REQUEST)
