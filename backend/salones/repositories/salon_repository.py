from salones.models import Salon
from django.db import IntegrityError

class SalonRepository:
    
    @staticmethod
    def crear_salon(nombre_estilista, nombre_salon, correo, password, whatsapp, ciudad, direccion, publico, opcion_compra, horario=None, descripcion=None, servicios=None, foto_url=None):
        salon = Salon(
            nombre_estilista = nombre_estilista,
            nombre_salon = nombre_salon,
            correo_electronico = correo,
            password = password,
            whatsapp = whatsapp,
            horario_atencion = horario,
            descripcion = descripcion,
            servicios = servicios,
            ciudad = ciudad,
            direccion = direccion,
            publico_objetivo = publico,
            opcion_compra = opcion_compra,
            foto_url = foto_url
            )
        
        try:
            salon.save()
            return salon
        except IntegrityError:
            return None
        
    @staticmethod
    def obtener_todo():
        salon = Salon.objects.all()
        return salon
    
    @staticmethod
    def obtener_por_id(id_salon):
        try:
            return Salon.objects.get(id_salon=id_salon)
        except Salon.DoesNotExist:
            return None
        
    @staticmethod
    def actualizar_salon(id_salon, nombre_estilista=None, nombre_salon=None, correo=None, password=None, whatsapp=None, ciudad=None, direccion=None, publico=None, opcion_compra=None, horario=None, descripcion=None, servicios=None, foto_url=None):
        salon = SalonRepository.obtener_por_id(id_salon)
        if salon:
            try:
                if nombre_estilista is not None and nombre_estilista!=salon.nombre_estilista:
                    salon.nombre_estilista = nombre_estilista
                if nombre_salon is not None and nombre_salon!=salon.nombre_salon:
                    salon.nombre_salon = nombre_salon
                if correo is not None and nombre_estilista!=salon.nombre_estilista:
                    salon.nombre_estilista = nombre_estilista
                if correo is not None and correo!=salon.correo_electronico:
                    salon.correo_electronico = correo
                if password is not None and password!=salon.password:
                    salon.password = password
                if whatsapp is not None and whatsapp!=salon.whatsapp:
                    salon.whatsapp = whatsapp
                if ciudad is not None and ciudad!=salon.ciudad:
                    salon.ciudad = ciudad
                if direccion is not None and direccion!=salon.direccion:
                    salon.direccion = direccion
                if publico is not None and publico!=salon.publico_objetivo:
                    salon.publico_objetivo = publico
                if opcion_compra is not None and opcion_compra!=salon.opcion_compra:
                    salon.opcion_compra = opcion_compra
                if horario is not None and horario!=salon.horario_atencion:
                    salon.horario_atencion = horario
                if descripcion is not None and descripcion!=salon.descripcion:
                    salon.descripcion = descripcion
                if servicios is not None and servicios!=salon.servicios:
                    salon.servicios = servicios
                if foto_url is not None and foto_url!=salon.foto_url:
                    salon.foto_url = foto_url
                    
                salon.save()
                return salon
            
            except IntegrityError:
                return None
            
        else:
            return None
        
    @staticmethod
    def eliminar_salon(id_salon):
        salon = SalonRepository.obtener_por_id(id_salon)
        if salon:
            salon.delete()
            return True
        else:
            return False