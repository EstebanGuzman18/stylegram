from django.urls import path
from . import views

urlpatterns = [
    path('crear/', views.crear_producto),
    path('<int:id_salon>/salon/', views.productos_por_salon),
    path('buscar/', views.buscar_productos),
    path('<int:id_producto>/editar/', views.actualizar_producto),
]