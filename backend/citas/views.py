from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import CitaSerializer
from citas.repositories.citas_repository import CitasRepository


#  Crear cita
@api_view(['POST'])
def crear_cita(request):

    serializer = CitaSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(serializer.errors, status=400)

    data = serializer.validated_data

    cita = CitasRepository.crear_cita(
        servicio=data.get('servicio'),
        fecha_hora=data.get('fecha_hora'),
        salon=data.get('salon').id_salon,
        cliente=data.get('cliente').id_cliente
    )

    if not cita:
        return Response({'error': 'No se pudo crear la cita'}, status=500)

    return Response({
        'mensaje': 'Cita creada correctamente',
        'id': cita.id_cita
    }, status=201)


#  Obtener citas por estado (salón)
@api_view(['GET'])
def citas_salon(request, id_salon):

    estado = request.GET.get('estado')

    if not estado:
        return Response({'error': 'Debe enviar el estado'}, status=400)

    citas = CitasRepository.obtener_por_salon_y_estado(id_salon, estado)

    serializer = CitaSerializer(citas, many=True)
    return Response(serializer.data, status=200)


#  Obtener citas por estado (cliente)
@api_view(['GET'])
def citas_cliente(request, id_cliente):

    estado = request.GET.get('estado')

    if not estado:
        return Response({'error': 'Debe enviar el estado'}, status=400)

    citas = CitasRepository.obtener_por_cliente_y_estado(id_cliente, estado)

    serializer = CitaSerializer(citas, many=True)
    return Response(serializer.data, status=200)


#  Confirmar cita
@api_view(['PATCH'])
def confirmar_cita(request, id_cita):

    cita = CitasRepository.confirmar_cita(id_cita)

    if not cita:
        return Response({'error': 'Cita no encontrada'}, status=404)

    return Response({'mensaje': 'Cita confirmada'}, status=200)


#  Rechazar cita
@api_view(['PATCH'])
def rechazar_cita(request, id_cita):

    cita = CitasRepository.rechazar_cita(id_cita)

    if not cita:
        return Response({'error': 'Cita no encontrada'}, status=404)

    return Response({'mensaje': 'Cita rechazada'}, status=200)


#  Reagendar cita
@api_view(['PATCH'])
def reagendar_cita(request, id_cita):

    nueva_fecha = request.data.get('fecha_hora')

    if not nueva_fecha:
        return Response({'error': 'Debe enviar la nueva fecha'}, status=400)

    cita_actual = CitasRepository.obtener_por_id(id_cita)

    if not cita_actual:
        return Response({'error': 'Cita no encontrada'}, status=404)

    cita = CitasRepository.reagendar_cita(id_cita, nueva_fecha)

    return Response({'mensaje': 'Cita reagendada correctamente'}, status=200)

# Eliminar cita
@api_view(['DELETE'])
def eliminar_cita(request, id_cita):
    resultado = CitasRepository.eliminar_cita(id_cita)

    if resultado:
        return Response({'mensaje': 'Cita eliminada correctamente'}, status=200)
    else:
        return Response({'error': 'Cita no encontrada'}, status=404)