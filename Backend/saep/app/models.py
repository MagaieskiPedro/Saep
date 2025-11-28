from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class Usuario(AbstractUser):

    def __str__(self):
        return self.username

class Produto(models.Model):
    TIPO = [
        ('Notebook','Notebook'),
        ('Smartphone','Smartphone'),
        ('TV Smart','TV Smart')
    ]
    modelo = models.CharField(max_length=50,null=False, blank=False)
    tipo = models.CharField(max_length=15, choices=TIPO, default='Smartphone')
    armazenamento = models.FloatField()
    largura = models.IntegerField()
    altura = models.IntegerField()
    tensao = models.IntegerField()
    conectividade = models.CharField(max_length=120,null=False, blank=False)
    
    def __str__(self):
        return self.modelo


class Estoque(models.Model):
    produto = models.ForeignKey(Produto, on_delete=models.CASCADE)
    quantidade = models.IntegerField()
    preco = models.FloatField()
    
class EntradaSaida(models.Model):
    produto = models.ForeignKey(Produto, on_delete=models.CASCADE)
    responsavel = models.CharField(max_length=50,null=False, blank=False)
    ultimaAlteracao = models.DateTimeField(auto_now=True)

