from django.urls import path

from . import views


urlpatterns = [
    path("", views.get_all_customers, name="get_customers_table"),
    path("all/", views.get_all_cpf, name="get_all_customers"),
    path("new/", views.create_customer, name="new_customer"),
    path("edit/", views.edit_customer, name="edit_customer"),
    path("del/", views.delete_customer, name="delete_customer"),
]
