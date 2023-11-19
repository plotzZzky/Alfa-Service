
def valid_user(password, pwd, username, email):
    if not validate_password(password, pwd):
        return False
    if not validate_username(username):
        return False
    if not validate_email(email):
        return False
    return True


def validate_password(password, pwd):
    return False if password != pwd or len(password) < 8 else True


def validate_username(username):
    return False if len(username) < 4 else True


def validate_email(email):
    if '@' not in email or 'mail.com' not in email:
        return False
    else:
        return True


def validate_cpf(cpf):
    if 12 > len(cpf) > 10:
        return True


def validate_name_lastname(name, lastname):
    if len(name) < 4 or len(lastname) < 4:
        return False


def validate_address(address, city):
    if len(address) > 4 and city:
        return True


def validate_telephone(telephone):
    if 10 < len(telephone) < 13:
        return True


def validate_mail(email):
    if "@mail.com" in email:
        return True


def update_profile(request):
    user = request.user
    costumer = user.costumer
    password = request.user_data['password1']
    pwd = request.user_data['password2']
    username = request.user_data['username']
    email = request.user_data['email']
    cpf = request.POST['cpf']
    name = request.POST['name']
    lastname = request.POST['lastname']
    city = request.POST['city']
    address = request.POST['address']
    telephone = request.POST['telephone']
    if validate_username(username):
        user.username = username
    if validate_email(email):
        user.email = email
    if validate_password(password, pwd):
        user.set_password(password)
    user.save()
    if validate_telephone(telephone):
        costumer.telephone = telephone
    if validate_address(address, city):
        costumer.address = address
        costumer.city = city
    if validate_name_lastname(name, lastname):
        costumer.name = name
        costumer.lastname = lastname
    if validate_cpf(cpf):
        costumer.cpf = cpf
    costumer.save()
