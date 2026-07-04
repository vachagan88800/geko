from itertools import product

from rest_framework.decorators import api_view
from products.models import Product
from rest_framework.response import Response
from products.serializers import ProductSerializer

@api_view(['GET'])
def product_list(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response({'products': serializer.data})
@api_view(['GET'])
def product_details(request, product_id):
    product = Product.objects.get(id=product_id).first()
    if not product:
        return Response({'error': 'Product not found'}, status=404)
    serializer = ProductSerializer(product)
    return Response({'product': serializer.data})


@api_view(['POST'])
def product_create(request):
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'product': serializer.data}, status=201)
    return Response(serializer.errors, status=400)        
@api_view(['PUT'])
def product_update(request, product_id):           
    product = Product.objects.get(id=product_id).first()
    if not product:
        return Response({'error': 'Product not found'}, status=404)
    serializer = ProductSerializer(product, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'product': serializer.data})
    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
def product_delete(request, product_id):
    product = Product.objects.get(id=product_id).first()
    if not product:
        return Response({'error': 'Product not found'}, status=404)
    product.delete()
    return Response(status=204)