from django.shortcuts import render
from clientes.repositories.cliente_repository import ClienteRepository

# Create your views here.
def registrar_cliente(request):
    
    # GET = mostrar formulario
    if request.method == 'GET':
        return render(request, 'registro_cliente.html')
    
    # POST = procesar formulario
    if request.method == 'POST':
        nombre = request.POST.get('nombre')
        ciudad = request.POST.get('ciudad')
        whatsapp = request.POST.get('whatsapp')
        email = request.POST.get('email')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')
        
        #verificar que las contraseñas coincidan
        if password != confirm_password:
            return render(request, 'registro_cliente.html', {'mensaje' : 'ERROR: Las contraseñas no coinciden'})
        
        #verificar que todos los campos importabtes esten llenos
        if not all([nombre, ciudad, whatsapp, email, password, confirm_password]):
            return render(request, 'registro_cliente.html', {'mensaje' : 'ERROR: Campos importantes no han sido llenados'})
        
        #verificar que el correo y whatsapp no los tenga un usuario ya registrado
        verificar_correo = ClienteRepository.obtener_por_correo(email)
        verificar_whatsapp = ClienteRepository.obtener_por_whatsapp(whatsapp)
        
        if verificar_correo != None:
            return render(request, 'registro_cliente.html', {'mensaje' : 'ERROR: El correo electronico ya está en uso'})
        if verificar_whatsapp != None:
            return render(request, 'registro_cliente.html', {'mensaje' : 'ERROR: El número de whatsapp ya está en uso'})
            
        
        cliente = ClienteRepository.crear_cliente(
            nombre = nombre,
            correo = email, 
            password = password, 
            whatsapp = whatsapp, 
            ciudad = ciudad, 
            foto_url=None
        )
        
        #verificar si se registro con exito
        if cliente:
            return render(request, 'registro_cliente.html', {'mensaje' : f'Hola {cliente.nombre} has sido registrado con exito'})