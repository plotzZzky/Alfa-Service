from django.urls import path

from . import views

urlpatterns = [
    path('', views.get_all_works, name='get_table'),
    path('new/', views.create_work, name='create_work'),
    path('edit/', views.edit_work, name='edit_work'),
    path('del/', views.delete_work, name='delete_work'),
    # your
    path('your/', views.get_works_from_user, name='get_user_work'),
    path('your/new/', views.get_works_from_user, name='get_user_work'),
]
