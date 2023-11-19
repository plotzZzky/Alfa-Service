from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
import json
from .models import Customer, Work


class WorksTest(TestCase):
    def setUp(self):
        self.credentials = {
            'username': 'temporary',
            'password': 'temporary'
        }
        self.client = APIClient()
        self.user = User.objects.create_user(**self.credentials)
        self.token = Token.objects.create(user=self.user)  # type:ignore
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        self.user_data = {
            "cpf": 000000000,
            "name": "name",
            "lastname": "lastname",
            "address": "address",
            "city": "city",
            "telephone": "(51)0000-0000",
            "email": "@mail.com",
        }
        self.work_data = {
            "costumer": 'aaa',
            "title": "title",
            "order": "order",
            "status": "status"
        }

    def create_new_costumer(self):
        customer = Customer.objects.create(  # type:ignore
            user=self.user,
            cpf=self.user_data['cpf'],
            name=self.user_data['name'],
            lastname=self.user_data['lastname'],
            address=self.user_data['address'],
            city=self.user_data['city'],
            telephone=self.user_data['telephone'],
            email=self.user_data['email'],
        )
        return customer

    def create_new_work(self):
        customer = self.create_new_costumer()
        work = Work.objects.create(  # type:ignore
            customer=customer,
            title=self.work_data['title'],
            order=self.work_data['order'],
            status=self.work_data['status']
        )
        return work

    @staticmethod
    def return_work(work_id):
        work = Work.objects.get(pk=work_id)  # type:ignore
        return work

    # Get all workers
    def test_get_table_status_200(self):
        response = self.client.get('/works/')
        self.assertEqual(response.status_code, 200)

    def test_get_table_status_401_error(self):
        self.client.credentials()
        response = self.client.get('/works/')
        self.assertEqual(response.status_code, 401)

    def test_get_table_check_json(self):
        response = self.client.get('/works/')
        table_json = json.loads(response.content)
        result = True if "works" in table_json else False
        self.assertTrue(result)

    # Get All CPF
    def test_get_user_works_status_200(self):
        self.create_new_costumer()
        response = self.client.get('/works/your/')
        self.assertEqual(response.status_code, 200)

    def test_get_user_works_401_error(self):
        self.client.credentials()
        response = self.client.get('/works/your/')
        self.assertEqual(response.status_code, 401)

    def test_get_user_works_check_json(self):
        self.create_new_costumer()
        response = self.client.get('/works/your/')
        table_json = json.loads(response.content)
        result = True if "works" in table_json else False
        self.assertTrue(result)

    # create customers
    def test_create_work_status_200(self):
        customer = self.create_new_costumer()
        data = self.work_data
        data['customer'] = customer.id
        response = self.client.post('/works/new/', data)
        self.assertEqual(response.status_code, 200)

    def test_create_work_status_error(self):
        data = self.work_data
        response = self.client.post('/works/new/', data)
        self.assertEqual(response.status_code, 404)
        data['customer'] = 99999
        response = self.client.post('/works/new/', data)
        self.assertEqual(response.status_code, 404)

    def test_create_work_title_error(self):
        customer = self.create_new_costumer()
        data = self.work_data
        data['customer'] = customer.id
        data['title'] = ""
        response = self.client.post('/works/new/', data)
        self.assertEqual(response.status_code, 400)
        del data['title']
        response = self.client.post('/works/new/', data)
        self.assertEqual(response.status_code, 404)

    def test_create_work_order_error(self):
        customer = self.create_new_costumer()
        data = self.work_data
        data['customer'] = customer.id
        data['order'] = ""
        response = self.client.post('/works/new/', data)
        self.assertEqual(response.status_code, 400)
        del data['order']
        response = self.client.post('/works/new/', data)
        self.assertEqual(response.status_code, 404)

    # Delete customers
    def test_delete_work_status_200(self):
        work = self.create_new_work()
        response = self.client.delete('/works/del/', {'id': work.id})
        self.assertEqual(response.status_code, 200)

    def test_delete_work_check_if_exists(self):
        work = self.create_new_work()
        self.client.delete('/works/del/', {'id': work.id})
        try:
            Work.objects.get(pk=work.id)  # type: ignore
            response = False
        except Work.DoesNotExist:  # type:ignore
            response = True
        self.assertTrue(response)

    def test_delete_work_check_if_exists_error(self):
        work = self.create_new_work()
        self.client.delete('/works/del/', {'id': 999999})
        try:
            Work.objects.get(pk=work.id)  # type: ignore
            response = False
        except Work.DoesNotExist:  # type:ignore
            response = True
        self.assertFalse(response)

    # Edit customers
    def test_edit_work_status_200(self):
        work = self.create_new_work()
        data = self.work_data
        data['id'] = work.id
        response = self.client.post('/works/edit/', data)
        self.assertEqual(response.status_code, 200)

    def test_edit_work_status_400_error(self):
        data = self.work_data
        data['id'] = 999999
        response = self.client.post('/works/edit/', data)
        self.assertEqual(response.status_code, 400)

    def test_edit_work_title(self):
        work = self.create_new_work()
        data = self.work_data
        data['id'] = work.id
        data['title'] = 'test'
        self.client.post('/works/edit/', data)
        response = self.return_work(work.id)
        self.assertEqual(response.title, data['title'])

    def test_edit_work_order(self):
        work = self.create_new_work()
        data = self.work_data
        data['id'] = work.id
        data['order'] = 'test'
        self.client.post('/works/edit/', data)
        response = self.return_work(work.id)
        self.assertEqual(response.order, data['order'])
