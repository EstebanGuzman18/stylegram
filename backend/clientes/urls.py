from django.urls import path
from .views import registrar_cliente, login, obtener_cliente, editar_cliente

urlpatterns = [
    path('registro/', registrar_cliente),
    path('login/', login),
    path('<int:cliente_id>/', obtener_cliente),
    path('<int:cliente_id>/editar/', editar_cliente)
]
