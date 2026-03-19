from clientes.repositories.cliente_repository import ClienteRepository
from django.contrib.auth.hashers import make_password, check_password
from rest_framework.decorators import api_view
from rest_framework.response import Response
# Create your views here.

@api_view(['POST'])
def registrar_cliente(request):
    
    nombre = request.data.get('nombre')
    ciudad = request.data.get('ciudad')
    whatsapp = request.data.get('whatsapp')
    correo = request.data.get('correo_electronico')
    password = request.data.get('password')
    confirm_password = request.data.get('confirm_password')
    
    # validar campos
    if not all([nombre, ciudad, whatsapp, correo, password, confirm_password]):
        return Response({'error': 'Campos importantes no han sido llenados'}, status=400)
    
    # verificar contraseñas
    if password != confirm_password:
        return Response({'error': 'Las contraseñas no coinciden'}, status=400)
    
    # verificar duplicados
    if ClienteRepository.obtener_por_correo(correo):
        return Response({'error': 'El correo electronico ya está en uso'}, status=409)
    
    if ClienteRepository.obtener_por_whatsapp(whatsapp):
        return Response({'error': 'El número de whatsapp ya está en uso'}, status=409)
        
    # crear cliente
    cliente = ClienteRepository.crear_cliente(
        nombre=nombre,
        correo=correo, 
        password=make_password(password), 
        whatsapp=whatsapp, 
        ciudad=ciudad, 
        foto_url=None
    )
    
    if cliente:
        return Response({'mensaje': f'Hola {cliente.nombre}, has sido registrado con éxito'}, status=201)
    
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
    cliente = ClienteRepository.obtener_por_correo(correo)
    
    # validar existencia y contraseña
    if not cliente or not check_password(password, cliente.password):
        return Response({'error': 'Correo o contraseña incorrectos'}, status=401)
    
    # login exitoso
    return Response({'mensaje': f'Hola {cliente.nombre}, has iniciado sesión con éxito'}, status=200)