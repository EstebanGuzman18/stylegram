from django.db import models
from salones.models import Salon

# Create your models here.

class Producto(models.Model):
    id_producto = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=45)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    descripcion = models.CharField(max_length=45, null=True, blank=True)
    cantidad = models.IntegerField()
    foto_url = models.CharField(max_length=225)
    vendedor = models.ForeignKey(Salon, on_delete=models.DO_NOTHING, db_column='vendedor')

    class Meta:
        managed = False
        db_table = 'productos'