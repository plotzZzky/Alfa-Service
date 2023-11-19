
def serializer_work(item):
    request_id = item.id
    user_id = item.customer.id
    title = item.title
    status = item.status
    order = item.order
    name = item.customer.name
    lastname = item.customer.lastname
    telephone = item.customer.telephone
    address = item.customer.address
    return {"id": request_id, "title": title, "status": status, "order": order, "name": name, "lastname": lastname,
            "telephone": telephone, "address": address, "user_id": user_id}
