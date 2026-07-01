from django.contrib import admin
from django.urls import path
from webapp import views

urlpatterns = [
    path('admin/', admin.site.get_urls if hasattr(admin.site, 'get_urls') else admin.site.urls),
    # Nueva ruta limpia para recibir el resultado del escáner
    path('api/registrar-alimento/', views.registrar_alimento_ia_view, name='api_registrar_alimento'),
]

from django.contrib import admin
from django.urls import path
from webapp import views

urlpatterns = [
    path('admin/', admin.site.get_urls if hasattr(admin.site, 'get_urls') else admin.site.urls),
    
    # Ruta para abrir tu página de inicio index.html
    path('', views.home_view, name='home'),
    
    # Ruta de la API de la IA
    path('api/registrar-alimento/', views.registrar_alimento_ia_view, name='api_registrar_alimento'),
]