from django.urls import path
from .views import product_delete, product_details, product_list, product_update

urlpatterns = [
    path('',product_list, name='product_list'),
    path('<int:product_id>/', product_details, name='product_details'),
    path('create/', product_create, name='product_create'),
    path('<int:product_id>/update/', product_update, name='product_update'),
    path('<int:product_id>/delete/', product_delete, name='product_delete')
]

