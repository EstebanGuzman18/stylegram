from django.urls import path
from .views import login, registrar_salon, obtener_salon, editar_salon, buscar_salones

urlpatterns = [
    path('login/', login),
    path('registro/', registrar_salon),
    path('<int:salon_id>/', obtener_salon),
    path('<int:salon_id>/editar/', editar_salon),
    path('buscar/', buscar_salones)
]