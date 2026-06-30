from django.contrib import path
from django.urls import get_products

urlpatterns = [
    path('', get_products),
]
