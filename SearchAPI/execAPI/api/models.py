from django.db import models

# Create your models here.
class Codigos(models.Model):
    id_chat = models.IntegerField(verbose_name='ID del chat extraido', blank=False, null=False)
    mensaje = models.TextField(verbose_name="Mensaje recibido de API de Chat", blank=False, null=False)
    resultado = models.TextField(verbose_name="Resultado del código", blank=False, null=False)
    def __str__(self):
        return self.id
