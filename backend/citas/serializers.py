from rest_framework import serializers
from .models import Citas
from salones.models import Salon

class SalonesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Salon
        fields = ['id_salon', 'nombre_salon', 'foto_url', 'direccion', 'ciudad']

class CitaSerializer(serializers.ModelSerializer):

    salon = SalonesSerializer(read_only=True)

    class Meta:
        model = Citas
        fields = ['id_cita', 'servicio', 'fecha_hora', 'estado', 'salon', 'cliente']
        read_only_fields = ['estado']  #  clave

    def validate_fecha_hora(self, value):
        if value is None:
            raise serializers.ValidationError("La fecha y hora son obligatorias")
        return value