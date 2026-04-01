from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ProductoSerializer
from productos.repositories.producto_repository import ProductoRepository

# Create your views here.

#  Crear producto
@api_view(['POST'])
def crear_producto(request):

    serializer = ProductoSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(serializer.errors, status=400)

    data = serializer.validated_data

    producto = ProductoRepository.crear_producto(
        nombre=data.get('nombre'),
        precio=data.get('precio'),
        descripcion=data.get('descripcion'),
        cantidad=data.get('cantidad'),
        vendedor=data.get('vendedor').id_salon
    )

    if not producto:
        return Response({'error': 'No se pudo crear el producto'}, status=500)

    return Response({
        'mensaje': 'Producto creado correctamente',
        'id': producto.id_producto
    }, status=201)


#  Obtener productos de un salón
@api_view(['GET'])
def productos_por_salon(request, id_salon):

    productos = ProductoRepository.obtener_por_salon(id_salon)

    serializer = ProductoSerializer(productos, many=True)
    return Response(serializer.data, status=200)


#  Buscar productos por nombre
@api_view(['GET'])
def buscar_productos(request):

    texto = request.GET.get('q')

    if not texto:
        return Response({'error': 'Debe enviar un texto de búsqueda'}, status=400)

    productos = ProductoRepository.buscar_por_nombre(texto)

    serializer = ProductoSerializer(productos, many=True)
    return Response(serializer.data, status=200)


#  Editar producto
@api_view(['PATCH'])
def actualizar_producto(request, id_producto):

    producto = ProductoRepository.obtener_por_id(id_producto)

    if not producto:
        return Response({'error': 'Producto no encontrado'}, status=404)

    data = request.data

    producto_actualizado = ProductoRepository.actualizar_producto(
        id_producto=id_producto,
        nombre=data.get('nombre'),
        precio=data.get('precio'),
        descripcion=data.get('descripcion'),
        cantidad=data.get('cantidad')
    )

    return Response({'mensaje': 'Producto actualizado correctamente'}, status=200)