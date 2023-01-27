from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status

from kanban.models import User, Board, Column, Task, Subtask
from kanban.serializers import UserSerializerWithToken

from django.contrib.auth.hashers import make_password

from kanban.data import boards


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def registerUser(request):

    data = request.data

    try:
        user = User.objects.create(
            username=data['username'],
            email=data['email'],
            password=make_password(data['password'])
        )

        board = Board.objects.create(
            user=user,
            name=boards[0]['name']
        )

        for column in boards[0]['columns']:
            col_model = Column.objects.create(
                board=board,
                name=column['name']
            )

            for task in column['tasks']:
                if task['status'] == col_model.name:
                    task_model = Task.objects.create(
                        column=col_model,
                        title=task['title'],
                        description=task['description'],
                        status=task['status']
                    )

                    for subtask in task['subtasks']:
                        Subtask.objects.create(
                            task=task_model,
                            title=subtask['title'],
                            isCompleted=subtask['isCompleted']
                        )

        serializer = UserSerializerWithToken(user, many=False)

        return Response(serializer.data)

    except:
        message = {'detail': 'User with this email already exists'}

        return Response(message, status=status.HTTP_400_BAD_REQUEST)
