from django.urls import path
from .views import registrar_cliente, login

urlpatterns = [
    path('registro/', registrar_cliente),
    path('login/', login)
]
