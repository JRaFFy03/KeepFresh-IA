from django.db import models


class UsuarioKeepFresh(models.Model):
    nombre = models.CharField(max_length=80)
    apellido = models.CharField(max_length=80)
    usuario = models.CharField(max_length=80, unique=True)
    password = models.CharField(max_length=120)
    cedula = models.CharField(max_length=40, unique=True)
    biografia = models.TextField(blank=True, default="¡Pensemos en la naturaleza!")
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nombre} {self.apellido} - {self.usuario}"


class HistorialAlimento(models.Model):
    ESTADOS = [
        ("fresh", "Fresco"),
        ("warning", "Maduro / Riesgo"),
        ("expired", "Vencido"),
    ]

    usuario = models.ForeignKey(
        UsuarioKeepFresh,
        on_delete=models.CASCADE,
        related_name="historial"
    )
    nombre_alimento = models.CharField(max_length=120)
    fecha_registro = models.DateTimeField(auto_now_add=True)
    dias_restantes = models.IntegerField(default=0)
    estado = models.CharField(max_length=20, choices=ESTADOS, default="fresh")

    def __str__(self):
        return f"{self.nombre_alimento} - {self.usuario.usuario}"