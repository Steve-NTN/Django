from django.db import models

# Create your models here.
class Employee(models.Model):
    employee_code = models.IntegerField()
    employee_name = models.CharField(max_length=150)
    employee_age = models.IntegerField()
    employee_sex = models.BooleanField()

