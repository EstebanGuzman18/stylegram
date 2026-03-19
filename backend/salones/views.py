from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.hashers import check_password, make_password
from salones.repositories.salon_repository import SalonRepository


# Create your views here.
@api_view(['POST'])
def registrar_salon(request):
    
    nombre_estilista = request.data.get('nombre_estilista')
    nombre_salon = request.data.get('nombre_salon')
    correo = request.data.get('correo')
    password = request.data.get('password')
    confirm_password = request.data.get('confirm_password')
    whatsapp = request.data.get('whatsapp')
    ciudad = request.data.get('ciudad')
    direccion = request.data.get('direccion')
    publico = request.data.get('publico')
    opcion_compra = request.data.get('opcion_compra')
    # Campos opcionales
    horario = request.data.get('horario') or None
    descripcion = request.data.get('descripcion') or None
    servicios = request.data.get('servicios') or None
    
    # validar campos
    if not all([nombre_estilista, nombre_salon, ciudad, whatsapp, direccion, publico, opcion_compra ,correo, password, confirm_password]):
        return Response({'error': 'Campos importantes no han sido llenados'}, status=400)
    
    # verificar contraseñas
    if password != confirm_password:
        return Response({'error': 'Las contraseñas no coinciden'}, status=400)
    
    # verificar duplicados
    if SalonRepository.obtener_por_correo(correo):
        return Response({'error': 'El correo electronico ya está en uso'}, status=409)
    
    if SalonRepository.obtener_por_whatsapp(whatsapp):
        return Response({'error': 'El número de whatsapp ya está en uso'}, status=409)
        
    # crear salon
    salon = SalonRepository.crear_salon(
        nombre_estilista = nombre_estilista,
        nombre_salon = nombre_salon,
        correo = correo,
        password = make_password(password),
        whatsapp = whatsapp,
        horario = horario,
        descripcion = descripcion,
        servicios = servicios,
        ciudad = ciudad,
        direccion = direccion,
        publico = publico,
        opcion_compra = opcion_compra,
    )
    
    if salon:
        return Response({'mensaje': f'Hola {salon.nombre_estilista}, has sido registrado con éxito'}, status=201)
    
    return Response({'error': 'No se pudo registrar el cliente'}, status=500)

@api_view(['POST'])
def login(request):
    # obtener datos desde React
    correo = request.data.get('correo_electronico')
    password = request.data.get('password')
    
    # validar campos
    if not correo or not password:
        return Response({'error': 'El correo y la contraseña son obligatorios'}, status=400)
    
    # buscar cliente
    cliente = SalonRepository.obtener_por_correo(correo)
    
    # validar existencia y contraseña
    if not cliente or not check_password(password, cliente.password):
        return Response({'error': 'Correo o contraseña incorrectos'}, status=401)
    
    # login exitoso
    return Response({'mensaje': f'Hola {cliente.nombre_estilista}, has iniciado sesión con éxito'}, status=200)