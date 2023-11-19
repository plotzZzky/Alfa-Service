def serializer_customer(item, username):
    id = item.id
    cpf = item.cpf
    name = item.name
    lastname = item.lastname
    address = item.address
    city = item.city
    telephone = item.telephone
    email = item.email
    return {"id": id, "cpf": cpf, "name": name, "lastname": lastname, "address": address, "city": city,
            "telephone": telephone, "email": email, "username": username}


def serializer_cpf(item):
    customer_id = item.id
    cpf = item.cpf
    return {"id": customer_id, "cpf": cpf}
