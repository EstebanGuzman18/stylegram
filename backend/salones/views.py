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
        return Response({'mensaje': f'Hola {salon.nombre_estilista}, has sido registrado con éxito',
                        'id': salon.id_salon}, status=201)
    
    return Response({'error': 'No se pudo registrar el salon'}, status=500)

@api_view(['POST'])
def login(request):
    # obtener datos desde React
    correo = request.data.get('correo_electronico')
    password = request.data.get('password')
    
    # validar campos
    if not correo or not password:
        return Response({'error': 'El correo y la contraseña son obligatorios'}, status=400)
    
    # buscar salon
    salon = SalonRepository.obtener_por_correo(correo)
    
    # validar existencia y contraseña
    if not salon or not check_password(password, salon.password):
        return Response({'error': 'Correo o contraseña incorrectos'}, status=401)
    
    # login exitoso
    return Response({'mensaje': f'Hola {salon.nombre_estilista}, has iniciado sesión con éxito',
                     'id': salon.id_salon,
                     'nombre': salon.nombre_salon,
                     'correo': salon.correo_electronico}, status=200)
    
# OBTENER SALON
@api_view(['GET'])
def obtener_salon(request, salon_id):
    
    salon = SalonRepository.obtener_por_id(salon_id)
    
    if not salon:
        return Response({'error': 'Salón no encontrado'}, status=404)
    
    return Response({
        'id': salon.id_salon,
        'nombre_estilista': salon.nombre_estilista,
        'nombre_salon': salon.nombre_salon,
        'correo': salon.correo_electronico,
        'whatsapp': salon.whatsapp,
        'ciudad': salon.ciudad,
        'direccion': salon.direccion,
        'publico': salon.publico_objetivo,
        'opcion_compra': salon.opcion_compra,
        'horario': salon.horario_atencion,
        'descripcion': salon.descripcion,
        'servicios': salon.servicios,
        'foto_url': salon.foto_url
    })
    
# EDITAR SALÓN
@api_view(['PUT'])
def editar_salon(request, salon_id):
    
    salon = SalonRepository.obtener_por_id(salon_id)
    
    if not salon:
        return Response({'error': 'Salón no encontrado'}, status=404)
    
    # datos editables
    nombre_estilista = request.data.get('nombre_estilista')
    nombre_salon = request.data.get('nombre_salon')
    whatsapp = request.data.get('whatsapp')
    ciudad = request.data.get('ciudad')
    direccion = request.data.get('direccion')
    publico = request.data.get('publico')
    opcion_compra = request.data.get('opcion_compra')
    horario = request.data.get('horario')
    descripcion = request.data.get('descripcion')
    servicios = request.data.get('servicios')
    foto_url = request.data.get('foto_url')

    if not all([nombre_estilista, nombre_salon, ciudad, whatsapp, direccion, publico, opcion_compra]):
        return Response({'error': 'Datos incompletos'}, status=400)

    # validar duplicado de whatsapp
    otro = SalonRepository.obtener_por_whatsapp(whatsapp)
    if otro and otro.id_salon != salon.id_salon:
        return Response({'error': 'El número ya está en uso'}, status=409)

    # actualizar
    salon_actualizado = SalonRepository.actualizar_salon(
        salon_id,
        nombre_estilista=nombre_estilista,
        nombre_salon=nombre_salon,
        whatsapp=whatsapp,
        ciudad=ciudad,
        direccion=direccion,
        publico=publico,
        opcion_compra=opcion_compra,
        horario=horario,
        descripcion=descripcion,
        servicios=servicios,
        foto_url=foto_url
    )
    
    if not salon_actualizado:
        return Response({'error': 'Error al actualizar el salón'}, status=500)

    return Response({
        'mensaje': 'Salón actualizado correctamente',
        'id': salon_actualizado.id_salon
    }, status=200)
    
    
# BUSCAR SALONES
@api_view(['GET'])
def buscar_salones(request):
    
    palabra = request.query_params.get('q')
    
    if not palabra:
        return Response({'error': 'Debe enviar una palabra de búsqueda'}, status=400)
    
    palabra = palabra.strip()

    # búsquedas
    salones_nombre = SalonRepository.buscar_por_nombre_salon(palabra)
    salones_estilista = SalonRepository.buscar_por_nombre_estilista(palabra)
    salones_servicios = SalonRepository.buscar_por_servicios(palabra)

    # evitar duplicados
    resultados = {}
    
    for salon in salones_nombre:
        resultados[salon.id_salon] = salon
        
    for salon in salones_estilista:
        resultados[salon.id_salon] = salon
        
    for salon in salones_servicios:
        resultados[salon.id_salon] = salon

    # convertir a lista
    lista_final = list(resultados.values())

    # respuesta limpia (tipo lista)
    data = []
    for salon in lista_final:
        data.append({
            'id': salon.id_salon,
            'nombre_salon': salon.nombre_salon,
            'nombre_estilista': salon.nombre_estilista,
            'ciudad': salon.ciudad,
            'foto_url': salon.foto_url
        })

    return Response(data, status=200)