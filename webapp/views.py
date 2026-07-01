from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime, timedelta

# Diccionario con los días estimados de vida útil para alimentos FRESCOS
DIAS_VENCIMIENTO = {
    "Manzanas Frescas": 14,
    "Bananos Frescos": 7,
    "Melón Amargo Fresco": 5,
    "Pimientos Frescos": 10,
    "Pepinos Frescos": 7,
    "Ocras Frescas": 6,
    "Naranjas Frescas": 14,
    "Papas Frescas": 30,
    "Tomates Frescos": 7,
}

@csrf_exempt
def registrar_alimento_ia_view(request):
    """
    Recibe el nombre del alimento detectado directamente desde el JavaScript de la cámara,
    calcula su fecha de vencimiento y responde con los datos listos.
    """
    if request.method == 'POST':
        try:
            alimento_detectado = request.POST.get('alimento')
            if not alimento_detectado:
                return JsonResponse({"error": "No se recibió el nombre del alimento"}, status=400)

            # Calcular días de vencimiento sugeridos
            dias_utiles = DIAS_VENCIMIENTO.get(alimento_detectado, 0)
            
            if "Podridas" in alimento_detectado or "Podrido" in alimento_detectado:
                estado = "Mal Estado / Vencido"
                mensaje = "¡Alerta! El alimento detectado está dañado. Se recomienda desecharlo o compostarlo."
                fecha_vencimiento = datetime.now().strftime("%Y-%m-%d")
            else:
                estado = "Fresco"
                fecha_calculada = datetime.now() + timedelta(days=dias_utiles)
                fecha_vencimiento = fecha_calculada.strftime("%Y-%m-%d")
                mensaje = f"Alimento fresco detectado. Consumir preferiblemente antes del {fecha_vencimiento}."

            return JsonResponse({
                "status": "success",
                "alimento": alimento_detectado,
                "estado": estado,
                "fecha_vencimiento": fecha_vencimiento,
                "mensaje": mensaje
            })

        except Exception as e:
            return JsonResponse({"status": "error", "error": str(e)}, status=500)

    return JsonResponse({"error": "Método no permitido"}, status=405)

def home_view(request):
    from django.shortcuts import render
    return render(request, 'index.html')

def home_view(request):
    return render(request, 'index.html')