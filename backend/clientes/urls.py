from django.urls import path
from .views import registrar_cliente

urlpatterns = [
    path('registro/', registrar_cliente),
]
