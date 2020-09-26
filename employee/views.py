from django.shortcuts import render
from .models import Employee
from django.http import HttpResponse

# Create your views here.
def home(request):
	return render(request, 'employee/home.html')

def viewlist(request):
	employees = Employee.objects.all()
	context = {"employees": employees}
	return render(request, 'employee/view_list_employee.html', context)

def about(request):
	return render(request, 'employee/about.html')
