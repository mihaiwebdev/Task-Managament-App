from django.urls import path
from kanban.views import board_views as views


urlpatterns = [
    path('', views.getBoards, name='get-boards'),
    path('create/', views.createBoard, name='create-board'),
    path('<int:pk>/', views.getBoard, name='get-board'),
    path('<int:pk>/delete/', views.deleteBoard, name='delete-board'),
    path('<int:pk>/edit/', views.editBoard, name='edit-board'),
]
