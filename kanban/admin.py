from django.contrib import admin

from .models import *
# Register your models here.

admin.site.register(Board)
admin.site.register(Column)
admin.site.register(Task)
admin.site.register(Subtask)
