from django.urls import path
from .views import login, registrar_salon

urlpatterns = [
    path('login/', login),
    path('registro/', registrar_salon)
]