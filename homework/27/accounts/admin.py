from django.contrib import admin
from django.contrib.auth.models import User


admin.site.unregister(User)


@admin.register(User)
class UserAdmin(admin.ModelAdmin):

    list_display = [
        "username",
        "email",
        "is_active",
        "date_joined"
    ]


    search_fields = [
        "username",
        "email"
    ]


    list_filter = [
        "is_active"
    ]