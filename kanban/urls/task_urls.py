from django.urls import path
from kanban.views import task_views as views


urlpatterns = [
    path('status/', views.updateTaskStatus,
         name='update-subtask-status'),
    path('create/', views.createTask, name='create-task'),
    path('<int:pk>/edit/', views.editTask, name='edit-task'),
    path('<int:pk>/delete/', views.deleteTask, name='delete-task'),
    path('<int:pk>/', views.getTask, name='get-task'),
]
