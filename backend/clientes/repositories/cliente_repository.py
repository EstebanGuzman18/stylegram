from clientes.models import Cliente
from django.db import IntegrityError

class ClienteRepository:
    
    @staticmethod
    def crear_cliente(nombre, correo, password, whatsapp, ciudad, foto_url=None):
        try:
            cliente = Cliente(
                nombre = nombre,
                correo_electronico = correo,
                password = password,
                whatsapp = whatsapp,
                ciudad = ciudad,
                foto_url = foto_url
            )
            cliente.save()
            return cliente
        except IntegrityError:
            return None
            
    
    @staticmethod
    def obtener_todo():
        return Cliente.objects.all()
    
    @staticmethod
    def obtener_por_id(id):
        try:
            return Cliente.objects.get(id_cliente = id)
        except Cliente.DoesNotExist:
            return None
    
    @staticmethod
    def obtener_por_correo(correo):
        try:
            return Cliente.objects.get(correo_electronico = correo)
        except:
            return None
        
    @staticmethod
    def obtener_por_whatsapp(whatsapp):
        try:
            return Cliente.objects.get(whatsapp = whatsapp)    
        except:
            return None
        
    @staticmethod
    def actualizar_cliente(id_cliente, nombre=None, correo=None, password=None, whatsapp=None, ciudad=None, foto_url=None):
        cliente = ClienteRepository.obtener_por_id(id_cliente)
        if cliente is None:
            return None
        else:
            try:
                if nombre is not None and nombre != cliente.nombre:
                    cliente.nombre = nombre
                
                if correo is not None and correo != cliente.correo_electronico:
                    cliente.correo_electronico = correo
                
                if password is not None and password != cliente.password:
                    cliente.password = password
                
                if whatsapp is not None and whatsapp != cliente.whatsapp:
                    cliente.whatsapp = whatsapp
                    
                if ciudad is not None and ciudad != cliente.ciudad:
                    cliente.ciudad = ciudad
                    
                if foto_url is not None and foto_url != cliente.foto_url:
                    cliente.foto_url = foto_url
                    
                cliente.save()
                return cliente
        
            except IntegrityError:
                return None
        
    @staticmethod
    def eliminar_cliente(id):
        cliente = ClienteRepository.obtener_por_id(id)
        if cliente:
           cliente.delete()
           return True
        else:
            return False