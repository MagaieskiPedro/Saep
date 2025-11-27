from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class Usuario(AbstractUser):

    def __str__(self):
        return self.username

class Produto(models.Model):
    TIPO = [
        ('N','Notebook'),
        ('S','Smartphone'),
        ('T','TV Smart')
    ]
    modelo = models.CharField(max_length=50,null=False, blank=False)
    tipo = models.CharField(max_length=1, choices=TIPO, default='S')
    armazenamento = models.FloatField()
    largura = models.IntegerField()
    altura = models.IntegerField()
    tensao = models.IntegerField()
    conectividade = models.BooleanField(default=False)
    
    def __str__(self):
        return self.modelo


class Estoque(models.Model):
    produto = models.ForeignKey(Produto, on_delete=models.CASCADE)
    quantidade = models.IntegerField()
    preco = models.FloatField()
    
class EntradaSaida(models.Model):
    responsavel = models.CharField(max_length=50,null=False, blank=False)
    ultimaAlteracao = models.DateTimeField(auto_now=True)

