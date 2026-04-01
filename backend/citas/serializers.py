from rest_framework import serializers
from .models import Citas

class CitaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Citas
        fields = ['id_cita', 'servicio', 'fecha_hora', 'estado', 'salon', 'cliente']
        read_only_fields = ['estado']  #  clave

    def validate_fecha_hora(self, value):
        if value is None:
            raise serializers.ValidationError("La fecha y hora son obligatorias")
        return value