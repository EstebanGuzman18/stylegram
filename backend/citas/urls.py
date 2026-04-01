from django.urls import path
from . import views

urlpatterns = [
    # Crear cita
    path('solicitar/', views.crear_cita),

    # Obtener citas
    path('<int:id_salon>/salones/', views.citas_salon),
    path('<int:id_cliente>/clientes/', views.citas_cliente),

    # Acciones sobre citas
    path('<int:id_cita>/confirmar/', views.confirmar_cita),
    path('<int:id_cita>/rechazar/', views.rechazar_cita),
    path('<int:id_cita>/reagendar/', views.reagendar_cita),
]