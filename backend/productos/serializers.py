from rest_framework import serializers
from .models import Producto
from salones.models import Salon

class SalonesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Salon
        fields = ['id_salon', 'nombre_salon', 'foto_url', 'direccion', 'ciudad']

class ProductoSerializer(serializers.ModelSerializer):
    
    vendedor = SalonesSerializer(read_only=True)

    class Meta:
        model = Producto
        fields = [
            'id_producto',
            'nombre',
            'precio',
            'descripcion',
            'cantidad',
            'foto_url',
            'vendedor'
        ]
        read_only_fields = ['foto_url']