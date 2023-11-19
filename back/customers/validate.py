def validate_customer(cpf, name, lastname, address, city, telephone, email):
    if 10 > len(cpf) > 12:
        return False
    if len(name) < 4 or len(lastname) < 4:
        return False
    if len(address) < 4 or not city:
        return False
    if 10 > len(telephone) > 13:
        return False
    if "@mail.com" not in email:
        return False
    return True
