from django.db import models
from model_utils.models import TimeStampedModel, SoftDeletableModel

class Chat(TimeStampedModel, SoftDeletableModel):
    fecha_chat = models.CharField(max_length=50, null=False, verbose_name='fecha inicio chat')

    def __str__(self):
        return self.fecha_chat

class Mensajes(TimeStampedModel, SoftDeletableModel):
    id_chat = models.ForeignKey(Chat, on_delete=models.CASCADE, blank=False, null=False)
    mensaje = models.TextField(verbose_name="Mensaje", blank=False, null=False)
    usuario = models.CharField(max_length=100, verbose_name="User", blank=False, null=False)

    def __str__(self):
        return self.mensaje


# Create your models here.
