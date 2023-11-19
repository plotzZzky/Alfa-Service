from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.permissions import IsAuthenticated

from .validate import valid_user, update_profile
from customers.models import Customer
from customers.serialize import serializer_customer


@api_view(['POST'])
@csrf_exempt
def register_user(request):
    try:
        password = request.data['password1']
        pwd = request.data['password2']
        username = request.data['username']
        email = request.data['email']
        if valid_user(password, pwd, username, email):
            user = User(username=username, email=email, password=password)
            user.set_password(password)
            user.save()
            user = authenticate(username=username, password=password)
            token = Token.objects.create(user=user)  # type:ignore
            return JsonResponse({"token": token.key, "profile": {}}, status=200)
        else:
            return JsonResponse({"error": "Informações incorretas!"}, status=401)
    except KeyError:
        return JsonResponse({"error": "Informações faltando!"}, status=401)


@api_view(['POST'])
@csrf_exempt
def login(request):
    try:
        password = request.data['password']
        username = request.data['username']
        user = authenticate(username=username, password=password)
        if user is not None:
            token = Token.objects.get(user=user)  # type:ignore
            try:
                costumer = serializer_customer(user.customer, user.username)
            except ObjectDoesNotExist:
                costumer = {}
            return JsonResponse({"token": token.key, "profile": costumer}, status=200)
        else:
            return JsonResponse({"error": "Login incorreto!"}, status=401)
    except KeyError:
        return JsonResponse({"error": "Login incorreto!"}, status=401)


@api_view(['POST'])
@csrf_exempt
def register_customer(request):
    try:
        password = request.data['password1']
        pwd = request.data['password2']
        username = request.data['username']
        email = request.data['email']
        if valid_user(password, pwd, username, email):
            user = User(username=username, email=email, password=password)
            user.set_password(password)
            user.save()
            user = authenticate(username=username, password=password)
            token = Token.objects.create(user=user)  # type:ignore
            # Create profile e customers
            cpf = request.data['cpf']
            name = request.data['name']
            lastname = request.data['lastname']
            city = request.data['city']
            address = request.data['address']
            telephone = request.data['telephone']
            costumer = Customer(cpf=cpf, name=name, lastname=lastname, city=city, address=address, email=email,
                                telephone=telephone, user=user)
            costumer.save()
            profile = serializer_customer(user.customer, username)
            return JsonResponse({"token": token.key, "profile": profile}, status=200)
        else:
            return JsonResponse({"error": "Informações incorretas!"}, status=401)
    except KeyError:
        return JsonResponse({"error": "Informações faltando!"}, status=401)


@api_view(['POST'])
@csrf_exempt
@permission_classes([IsAuthenticated])
def update_user(request):
    try:
        update_profile(request)
        user = request.user
        profile = serializer_customer(user.costumer, user.username)
        token = Token.objects.get(user=user)  # type:ignore
        return JsonResponse({"token": token.key, "profile": profile}, status=200)
    except KeyError:
        return JsonResponse({"error": "Informações incorretas!"}, status=401)
