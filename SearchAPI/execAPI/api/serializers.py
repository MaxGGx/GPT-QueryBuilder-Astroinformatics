from rest_framework import serializers
from api.models import *

class CodigosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Codigos
        fields = ['resultado']