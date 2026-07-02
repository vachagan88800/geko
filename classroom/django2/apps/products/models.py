from django.db import models
class Product(models.Model):

    ORDER_STATUS = [
        ('pending','Mshakvum e'),
        ('delivery','Janapahrin e'),
        ('ready','Avartvac e'),
        ('cancelled', 'Atmena e arvac'),
    ]

    title = models.CharField(max_length=50)