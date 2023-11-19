from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import IsAuthenticated

from .models import Customer
from .serialize import serializer_customer, serializer_cpf
from .validate import validate_customer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_customers(request):
    query = Customer.objects.all()  # type:ignore
    data = [serializer_customer(item, "") for item in query]
    return JsonResponse({"customers": data}, status=200)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_cpf(request):
    query = Customer.objects.all()  # type:ignore
    data = [serializer_cpf(item) for item in query]
    return JsonResponse({"customers": data}, status=200)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_customer(request):
    try:
        cpf = request.POST['cpf']
        if Customer.objects.filter(cpf=cpf).exists():  # type:ignore
            return HttpResponse('CPF já existe', status=400)
        name = request.POST['name']
        lastname = request.POST['lastname']
        address = request.POST['address']
        city = request.POST['city']
        telephone = request.POST['telephone']
        email = request.POST['email']
        if validate_customer(cpf, name, lastname, address, city, telephone, email):
            customer = Customer(
                cpf=cpf,
                name=name,
                lastname=lastname,
                address=address,
                city=city,
                telephone=telephone,
                email=email,
            )
            customer.save()
            return HttpResponse('Cliente criado!', status=200)
        return HttpResponse('Formulario incorreto!', status=400)
    except KeyError:
        return HttpResponse("Formulario incompleto", status=400)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_customer(request):
    try:
        costumer_id = request.data["id"]
        query = Customer.objects.get(pk=costumer_id)  # type:ignore
        query.delete()
        return HttpResponse("Cliente deletado!", status=200)
    except Customer.DoesNotExist:  # type:ignore
        return HttpResponse("cliente não encontrado", status=404)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def edit_customer(request):
    try:
        customer_id = request.POST['id']
        query = Customer.objects.get(pk=customer_id)  # type: ignore
        cpf = request.POST['cpf']
        name = request.POST['name']
        lastname = request.POST['lastname']
        address = request.POST['address']
        city = request.POST['city']
        telephone = request.POST['telephone']
        email = request.POST['email']
        if validate_customer(cpf, name, lastname, address, city, telephone, email):
            query.cpf = cpf
            query.name = name
            query.lastname = lastname
            query.city = city
            query.address = address
            query.telephone = telephone
            query.email = email
            query.save()
            return HttpResponse('Cliente editado!', status=200)
        return HttpResponse('Formulario invalido!', status=400)
    except (KeyError, Customer.DoesNotExist):  # type:ignore
        return HttpResponse("Formulario incompleto", status=404)
