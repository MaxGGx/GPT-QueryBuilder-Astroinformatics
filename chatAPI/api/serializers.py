from rest_framework import serializers
from api.models import *

class MensajesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mensajes
        exclude = ['is_removed', 'created', 'modified']

