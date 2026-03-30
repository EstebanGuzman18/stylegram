from clientes.repositories.cliente_repository import ClienteRepository
from django.contrib.auth.hashers import make_password, check_password
from rest_framework.decorators import api_view
from rest_framework.response import Response

# REGISTRAR CLIENTE
@api_view(['POST'])
def registrar_cliente(request):
    
    nombre = request.data.get('nombre')
    ciudad = request.data.get('ciudad')
    whatsapp = request.data.get('whatsapp')
    correo = request.data.get('correo_electronico')
    password = request.data.get('password')
    confirm_password = request.data.get('confirm_password')
    
    if not all([nombre, ciudad, whatsapp, correo, password, confirm_password]):
        return Response({'error': 'Campos importantes no han sido llenados'}, status=400)
    
    if password != confirm_password:
        return Response({'error': 'Las contraseñas no coinciden'}, status=400)
    
    if ClienteRepository.obtener_por_correo(correo):
        return Response({'error': 'El correo electronico ya está en uso'}, status=409)
    
    if ClienteRepository.obtener_por_whatsapp(whatsapp):
        return Response({'error': 'El número de whatsapp ya está en uso'}, status=409)
        
    cliente = ClienteRepository.crear_cliente(
        nombre=nombre,
        correo=correo, 
        password=make_password(password), 
        whatsapp=whatsapp, 
        ciudad=ciudad, 
        foto_url=None
    )
    
    if cliente:
        return Response({
            'mensaje': f'Hola {cliente.nombre}, has sido registrado con éxito',
            'id': cliente.id_cliente
        }, status=201)
    
    return Response({'error': 'No se pudo registrar el cliente'}, status=500)


# LOGIN
@api_view(['POST'])
def login(request):
    correo = request.data.get('correo_electronico')
    password = request.data.get('password')
    
    if not correo or not password:
        return Response({'error': 'El correo y la contraseña son obligatorios'}, status=400)
    
    cliente = ClienteRepository.obtener_por_correo(correo)
    
    if not cliente or not check_password(password, cliente.password):
        return Response({'error': 'Correo o contraseña incorrectos'}, status=401)
    
    return Response({
        'mensaje': f'Hola {cliente.nombre}, has iniciado sesión con éxito',
        'id': cliente.id_cliente,
        'nombre': cliente.nombre,
        'correo': cliente.correo_electronico
    }, status=200)


# OBTENER CLIENTE
@api_view(['GET'])
def obtener_cliente(request, cliente_id):
    
    cliente = ClienteRepository.obtener_por_id(cliente_id)
    
    if not cliente:
        return Response({'error': 'Cliente no encontrado'}, status=404)
    
    return Response({
        'id': cliente.id_cliente,
        'nombre': cliente.nombre,
        'ciudad': cliente.ciudad,
        'whatsapp': cliente.whatsapp,
        'correo': cliente.correo_electronico
    })


# EDITAR CLIENTE
@api_view(['PUT'])
def editar_cliente(request, cliente_id):
    
    cliente = ClienteRepository.obtener_por_id(cliente_id)
    
    if not cliente:
        return Response({'error': 'Cliente no encontrado'}, status=404)
    
    nombre = request.data.get('nombre')
    ciudad = request.data.get('ciudad')
    whatsapp = request.data.get('whatsapp')
    
    if not all([nombre, ciudad, whatsapp]):
        return Response({'error': 'Datos incompletos'}, status=400)
    
    # validar duplicado de whatsapp
    otro = ClienteRepository.obtener_por_whatsapp(whatsapp)
    if otro and otro.id_cliente != cliente.id_cliente:
        return Response({'error': 'El número ya está en uso'}, status=409)
    
    cliente_actualizado = ClienteRepository.actualizar_cliente(
        cliente.id_cliente,
        nombre=nombre,
        ciudad=ciudad,
        whatsapp=whatsapp
    )
    if not cliente_actualizado:
        return Response({'error': 'Error al actualizar el cliente'}, status=500)
    
    return Response({
        'mensaje': 'Cliente actualizado correctamente',
        'id': cliente_actualizado.id_cliente
    }, status=200)