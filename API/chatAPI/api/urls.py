from .views import *
from django.urls import path

urlpatterns = [
    path('chat', ConsultaGPT.as_view()),
    path('inicio',inicio),
]