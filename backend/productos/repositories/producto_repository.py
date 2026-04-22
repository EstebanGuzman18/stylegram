from productos.models import Producto
from django.db import IntegrityError

class ProductoRepository:

    @staticmethod
    def crear_producto(nombre, precio, descripcion, cantidad, vendedor):
        producto = Producto(
            nombre=nombre,
            precio=precio,
            descripcion=descripcion,
            cantidad=cantidad,
            vendedor_id=vendedor
        )
        try:
            producto.save()
            return producto
        except IntegrityError:
            return None

    @staticmethod
    def obtener_por_id(id_producto):
        try:
            return Producto.objects.get(id_producto=id_producto)
        except Producto.DoesNotExist:
            return None

    @staticmethod
    def obtener_por_salon(id_salon):
        return Producto.objects.filter(vendedor_id=id_salon)

    @staticmethod
    def buscar_por_nombre(texto):
        return Producto.objects.filter(nombre__icontains=texto)

    @staticmethod
    def actualizar_producto(id_producto, nombre=None, precio=None, descripcion=None, cantidad=None):
        producto = ProductoRepository.obtener_por_id(id_producto)

        if not producto:
            return None

        if nombre is not None:
            producto.nombre = nombre
        if precio is not None:
            producto.precio = precio
        if descripcion is not None:
            producto.descripcion = descripcion
        if cantidad is not None:
            producto.cantidad = cantidad

        producto.save()
        return producto
    
    @staticmethod
    def eliminar_producto(id_producto):
        producto = ProductoRepository.obtener_por_id(id_producto)

        if not producto:
            return False

        producto.delete()
        return True