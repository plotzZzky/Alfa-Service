from .models import Work


def validate_update_work(request_id, title, order, status):
    try:
        Work.objects.get(pk=request_id)  # type: ignore
        if validate_work(title, order, status):
            return True
    except Work.DoesNotExist:  # type: ignore
        return False


def validate_work(title, order, status):
    if title == "":
        return False
    if order == "":
        return False
    if status == "":
        return False
    return True
