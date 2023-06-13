from .views import *
from django.urls import path

urlpatterns = [
    path('code', ExecCode.as_view()),
    path('inicio',inicio),
]