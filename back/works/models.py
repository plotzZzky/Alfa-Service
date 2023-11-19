from django.db import models

from customers.models import Customer


class Work(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    title = models.CharField(max_length=255, blank=False, null=False)
    order = models.CharField(max_length=255, blank=False, null=False)
    status = models.CharField(max_length=255, blank=False, null=False)
