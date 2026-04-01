from citas.models import Citas
from django.db import IntegrityError

class EstadoCita:
    PENDIENTE = 'pendiente'
    CONFIRMADA = 'confirmada'
    RECHAZADA = 'rechazada'
    REAGENDAR = 'reagendar'


class CitasRepository:

    @staticmethod
    def crear_cita(servicio, fecha_hora, salon, cliente):
        cita = Citas(
            servicio=servicio,
            fecha_hora=fecha_hora,
            estado=EstadoCita.PENDIENTE,
            salon_id=salon,
            cliente_id=cliente
        )
        try:
            cita.save()
            return cita
        except IntegrityError:
            return None

    @staticmethod
    def obtener_por_id(id_cita):
        try:
            return Citas.objects.get(id_cita=id_cita)
        except Citas.DoesNotExist:
            return None

    #  FILTRO EN BD (clave)
    @staticmethod
    def obtener_por_salon_y_estado(id_salon, estado):
        return Citas.objects.filter(salon_id=id_salon, estado=estado)

    @staticmethod
    def obtener_por_cliente_y_estado(id_cliente, estado):
        return Citas.objects.filter(cliente_id=id_cliente, estado=estado)

    #  CAMBIOS DE ESTADO
    @staticmethod
    def confirmar_cita(id_cita):
        cita = CitasRepository.obtener_por_id(id_cita)
        if cita:
            cita.estado = EstadoCita.CONFIRMADA
            cita.save()
            return cita
        return None

    @staticmethod
    def rechazar_cita(id_cita):
        cita = CitasRepository.obtener_por_id(id_cita)
        if cita:
            cita.estado = EstadoCita.RECHAZADA
            cita.save()
            return cita
        return None

    @staticmethod
    def reagendar_cita(id_cita, nueva_fecha_hora):
        cita = CitasRepository.obtener_por_id(id_cita)
        if cita:
            cita.fecha_hora = nueva_fecha_hora
            cita.estado = EstadoCita.REAGENDAR
            cita.save()
            return cita
        return None