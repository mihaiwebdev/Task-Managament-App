from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Board(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    name = models.CharField(max_length=200, null=False, blank=False)
    id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)


class Column(models.Model):
    board = models.ForeignKey(Board, on_delete=models.CASCADE, null=False)
    name = models.CharField(max_length=200, null=False, blank=False)
    id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)


class Task(models.Model):
    column = models.ForeignKey(Column, on_delete=models.CASCADE, null=False)
    title = models.CharField(max_length=200, null=False, blank=False)
    description = models.TextField(null=True, blank=True)
    status = models.CharField(max_length=200, null=False, blank=False)
    id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.title)


class Subtask(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=200, null=True, blank=True)
    isCompleted = models.BooleanField(default=False)

    def __str__(self):
        return str(self.title)
