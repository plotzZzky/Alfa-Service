from django.contrib.auth.models import User
from django.db import models


class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    cpf = models.CharField(max_length=255, blank=False, null=False)
    name = models.CharField(max_length=255, blank=False, null=False)
    lastname = models.CharField(max_length=255, blank=False, null=False)
    address = models.CharField(max_length=300, blank=False, null=False)
    city = models.CharField(max_length=255, blank=False, null=False)
    telephone = models.CharField(max_length=255, blank=False, null=False)
    email = models.CharField(max_length=255, blank=True, null=True)
