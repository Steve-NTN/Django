from django.urls import path
from . import views
from .views import GetAllProductAPIView


urlpatterns = [
    path('', views.home, name='shopbill_home'),
    path('products/', GetAllProductAPIView.as_view(), name='shopbill_product'),
    path('about/', views.about, name='shopbill_about')
]
