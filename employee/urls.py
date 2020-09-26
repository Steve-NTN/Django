from django.urls import path
from . import views


urlpatterns = [
    path('', views.home, name='employee_home'),
    path('viewlist/', views.viewlist, name='employee_list'),
    path('about/', views.about, name='employee_about')
]
