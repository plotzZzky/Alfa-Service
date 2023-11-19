from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
import json
from .models import Customer


class CustomersTest(TestCase):
    def setUp(self):
        self.credentials = {
            'username': 'temporary',
            'password': 'temporary'
        }
        self.client = APIClient()
        self.user = User.objects.create_user(**self.credentials)
        self.token = Token.objects.create(user=self.user)  # type:ignore
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        self.data = {
            "cpf": 000000000,
            "name": "name",
            "lastname": "lastname",
            "address": "address",
            "city": "city",
            "telephone": "(51)0000-0000",
            "email": "@mail.com",
        }

    def create_new_user(self):
        customer = Customer.objects.create(  # type:ignore
            cpf=self.data['cpf'],
            name=self.data['name'],
            lastname=self.data['lastname'],
            address=self.data['address'],
            city=self.data['city'],
            telephone=self.data['telephone'],
            email=self.data['email'],
        )
        return customer

    # Função feita para verificar qual o id do usário criado
    @staticmethod
    def check_id_from_user():
        c = Customer.objects.all()  # type:ignore
        for x in c:
            print(x.id)

    @staticmethod
    def return_user(user_id):
        customer = Customer.objects.get(pk=user_id)  # type:ignore
        return customer

    # Get all customers
    def test_get_table_status_200(self):
        response = self.client.get('/customers/')
        self.assertEqual(response.status_code, 200)

    def test_get_table_status_401_error(self):
        self.client.credentials()
        response = self.client.get('/customers/')
        self.assertEqual(response.status_code, 401)

    def test_get_table_check_json(self):
        response = self.client.get('/customers/')
        table_json = json.loads(response.content)
        result = True if "customers" in table_json else False
        self.assertTrue(result)

    # Get All CPF
    def test_get_all_cpf(self):
        response = self.client.get('/customers/all/')
        self.assertEqual(response.status_code, 200)

    def test_get_all_cpf_401_error(self):
        self.client.credentials()
        response = self.client.get('/customers/all/')
        self.assertEqual(response.status_code, 401)

    def test_get_all_cpf_check_json(self):
        response = self.client.get('/customers/all/')
        table_json = json.loads(response.content)
        result = True if "customers" in table_json else False
        self.assertTrue(result)

    # create customers
    def test_create_customers(self):
        response = self.client.post('/customers/new/', self.data)
        self.assertEqual(response.status_code, 200)

    def test_create_customers_404_error(self):
        response = self.client.post('/customers/new/')
        self.assertEqual(response.status_code, 400)

    # Delete customers
    def test_delete_customer_status_200(self):
        self.client.post('/customers/new/', self.data)
        response = self.client.delete('/customers/del/', {'id': 3})
        self.assertEqual(response.status_code, 200)

    def test_delete_customer_check_if_exists(self):
        self.create_new_user()
        customer_id = {
            "id": 2
        }
        self.client.delete('/customers/del/', customer_id)

        try:
            Customer.objects.get(pk=customer_id['id'])  # type: ignore
            response = False
        except Customer.DoesNotExist:  # type:ignore
            response = True
        self.assertTrue(response)

    # Edit customers
    def test_edit_customer_status_200(self):
        user = self.create_new_user()
        data = self.data
        data['id'] = user.id
        response = self.client.post('/customers/edit/', data)
        self.assertEqual(response.status_code, 200)

    def test_edit_customer_key_error_404(self):
        self.create_new_user()
        response = self.client.post('/customers/edit/', self.data)
        self.assertEqual(response.status_code, 404)

    def test_edit_customer_user_does_not_exist(self):
        self.create_new_user()
        data = self.data
        data['id'] = 10
        response = self.client.post('/customers/edit/', data)
        self.assertEqual(response.status_code, 404)

    def test_edit_customer_name(self):
        user = self.create_new_user()
        data = self.data
        data['id'] = user.id
        data['name'] = 'zekaka'
        self.client.post('/customers/edit/', data)
        response = self.return_user(data['id'])
        self.assertEqual(response.name, data['name'])

    def test_edit_customer_name_empty_error(self):
        user = self.create_new_user()
        data = self.data
        data['id'] = user.id
        data['name'] = ''
        self.client.post('/customers/edit/', data)
        response = self.return_user(data['id'])
        self.assertNotEqual(response.name, data['name'])
