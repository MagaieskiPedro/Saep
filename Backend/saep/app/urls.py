from django.urls import path, include
from . import views
from .views import ProdutoView,EstoqueView,EntradaSaidaView
from rest_framework import routers

router = routers.DefaultRouter()

router.register(r'produto',ProdutoView,basename="produto")
router.register(r'estoque',EstoqueView,basename="estoque")
router.register(r'entradasaida',EntradaSaidaView,basename="entrada e saida")

urlpatterns = [
    path("",include(router.urls)),
    path("login/",view=views.LoginView.as_view()),
    path("cadastro/",view=views.CadastroView.as_view())
]