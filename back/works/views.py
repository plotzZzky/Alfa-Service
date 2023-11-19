from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import IsAuthenticated

from .models import Work
from .serialize import serializer_work
from .validate import validate_work, validate_update_work
from customers.models import Customer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_works(request):
    query = Work.objects.all()  # type:ignore
    data = [serializer_work(item) for item in query]
    return JsonResponse({"works": data}, status=200)


# Fornece os chamados do usuario atual para o perfil
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_works_from_user(request):
    customer = request.user.customer
    query = Work.objects.filter(customer=customer)  # type:ignore
    data = [serializer_work(item) for item in query]
    return JsonResponse({"works": data}, status=200)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_work(request):
    try:
        print(request.data)
        customer_id = request.POST['customer']
        customer = Customer.objects.get(pk=int(customer_id))  # type:ignore
        title = request.POST['title']
        order = request.POST['order']
        status = request.POST['status']
        valid = validate_work(title, order, status)
        if valid:
            new_request = Work(
                customer=customer,
                title=title,
                order=order,
                status=status
            )
            new_request.save()
            return HttpResponse('Chamado criado!', status=200)
        else:
            return HttpResponse('Formulario incorreto', status=400)
    except (KeyError, Customer.DoesNotExist):  # type:ignore
        return HttpResponse("Formulario incompleto", status=404)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_work(request):
    try:
        request_id = request.POST['id']
        query = Work.objects.get(pk=request_id)  # type:ignore
        if query:
            query.delete()
            return HttpResponse("Chamado deletado", status=200)
        return HttpResponse("Chamado não encontrado", status=300)
    except (Work.DoesNotExist, KeyError):  # type:ignore
        return HttpResponse("Chamado não encontrado", status=300)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def edit_work(request):
    try:
        request_id = request.POST['id']
        title = request.POST['title']
        order = request.POST['order']
        status = request.POST['status']
        query = Work.objects.get(pk=request_id)  # type: ignore
        validate = validate_update_work(request_id, title, order, status)
        if validate:
            query.title = title
            query.order = order
            query.status = status
            query.save()
            return HttpResponse('Cliente editado!', status=200)
        return HttpResponse('Formulario invalido!', status=400)
    except (KeyError, Work.DoesNotExist):  # type:ignore
        return HttpResponse("Formulario incompleto", status=400)

