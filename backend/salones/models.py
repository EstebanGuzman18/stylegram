from django.db import models

# Create your models here.

class Salon(models.Model):
    id_salon = models.AutoField(primary_key=True)
    nombre_estilista = models.CharField(max_length=40)
    nombre_salon = models.CharField(max_length=40)
    correo_electronico = models.CharField(max_length=254, unique=True)
    password = models.CharField(max_length=128)
    whatsapp = models.CharField(max_length=20, unique=True)
    horario_atencion = models.CharField(max_length=255, null=True)
    descripcion = models.CharField(max_length=255, null=True)
    servicios = models.CharField(max_length=255, null=True)
    ciudad = models.CharField(max_length=30)
    direccion = models.CharField(max_length=45)
    publico_objetivo = models.CharField(max_length=20)
    opcion_compra = models.CharField(max_length=20)
    foto_url = models.CharField(max_length=225, null=True)
    
    class Meta:
        managed = False
        db_table = 'salones_virtuales'