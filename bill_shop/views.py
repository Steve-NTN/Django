from django.shortcuts import render
from django.http import HttpResponse
from .models import Product
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import GetAllProductSerializer

# Create your views here.
def home(request):
    # eturn HttpResponse('<h1>Home ShopBill</h1>')  
    return render(request, 'bill_shop/main.html')

def about(request):
    return HttpResponse('<h1>About ShopBill</h1>')

class GetAllProductAPIView(APIView):

    def get(self, request):
        products = Product.objects.all()
        mydata = GetAllProductSerializer(products, many=True)
        return Response(data=mydata.data, status=status.HTTP_200_OK)