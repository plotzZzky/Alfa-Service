from django.urls import path

from . import views


urlpatterns = [
    path('login/', views.login),
    path('register/', views.register_user),
    path('register/customer/', views.register_customer),
    path('update/', views.update_user)
]