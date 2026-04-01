from django.db import models
from salones.models import Salon
from clientes.models import Cliente

# Create your models here.
class Citas(models.Model):
    id_cita = models.AutoField(primary_key=True)
    servicio = models.CharField(max_length=45, null=True, blank=True)
    fecha_hora = models.DateTimeField()
    estado = models.CharField(max_length=20)
    salon = models.ForeignKey(Salon, on_delete=models.CASCADE, db_column='salon')
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, db_column='cliente')
    
    class Meta:
        managed = False
        db_table = 'citas'