from rest_framework import serializers
from .models import Producto

class ProductoSerializer(serializers.ModelSerializer):

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