from django.db import models

# Create your models here.
class Cliente(models.Model):
    id_cliente = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=40)
    correo_electronico = models.CharField(max_length=254, unique=True)
    password = models.CharField(max_length=128)
    whatsapp = models.CharField(max_length=20, unique=True)
    ciudad = models.CharField(max_length=30)
    foto_url = models.CharField(max_length=225, null=True)
    
    class Meta:
        managed = False
        db_table = 'clientes'
    
