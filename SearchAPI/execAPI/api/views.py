from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from .serializers import *
from .models import *
from .f_aux import *
from datetime import datetime
from rest_framework.response import Response

# Create your views here.
def inicio(request):
    return HttpResponse("OK")

class ExecCode(APIView):
    serializer_class = CodigosSerializer
    def post(self, request, format=None):
        if request.method == "POST":
            print(request.POST);
            id_chat = request.POST.get('id_chat',None)
            mensaje = request.POST.get('mensaje', None)
            mes = mensaje.split('```')
            mes = mes[1][7:]
            print(mes)
            resultado = executeF(mes).strip()
            print(resultado)
            c = Codigos()
            c.id_chat = id_chat
            c.mensaje = mensaje
            c.resultado = resultado
            c.save()
        serializer = CodigosSerializer(c)
        return Response(serializer.data)
