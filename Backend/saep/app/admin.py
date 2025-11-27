from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Usuario,Produto


admin.site.register(Usuario)
admin.site.register(Produto)