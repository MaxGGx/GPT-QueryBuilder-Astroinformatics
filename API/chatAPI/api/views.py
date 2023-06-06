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

class ConsultaGPT(APIView):
    serializer_class = MensajesSerializer
    def post(self, request, format=None):
        if request.method == "POST":
            mensaje = request.POST.get('mensaje',None)
            id_chat = request.POST.get('id_chat',None)
            if(id_chat != None):
                chat = Chat.objects.get(id = id_chat)
                nMessage = Mensajes()
                nMessage.id_chat = chat
                nMessage.usuario = 'USER'
                nMessage.mensaje = mensaje
                nMessage.save()
                respuesta = makeGPTquery(chat,mensaje)
            else:
                nChat = Chat()
                now = datetime.now()
                nChat.fecha_chat = now.strftime("%d/%m/%Y %H:%M:%S")
                nChat.save()
                nMessage = Mensajes()
                nMessage.id_chat = nChat
                nMessage.usuario = 'USER'
                nMessage.mensaje = mensaje
                nMessage.save()
                respuesta = makeGPTquery(nChat,mensaje)
                print("Nuevo chat: ", nChat.id)
        serializer = MensajesSerializer(respuesta)
        return Response(serializer.data)
    
class Query(APIView):
    serializer_class = MensajesSerializer
    def post(self, request, format=None):
        if request.method == "POST":
            #mensaje = request.POST.get('mensaje',None)
            id_chat = request.POST.get('id_chat',None)
            if(id_chat != None):
                chat = Chat.objects.get(id = id_chat)
                nMessage = Mensajes()
                nMessage.id_chat = chat
                nMessage.usuario = 'USER'
                nMessage.mensaje = 'QUERY'
                nMessage.save()
                respuesta = makeGPTquery(chat,"QUERY")
                ans = exec_query(respuesta.mensaje)
                print("RESPUESTA EJECUCION PyVO:",ans)
        serializer = MensajesSerializer(respuesta)
        return Response(serializer.data)

        