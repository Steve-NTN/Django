from django.db import models
import uuid

# Create your models here.
class Product(models.Model):
    product_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    product_code = models.IntegerField(unique=True)
    product_name = models.CharField(max_length=150)
    product_price = models.CharField(max_length=20)
    product_desciption = models.CharField(max_length=150, blank=True)

    