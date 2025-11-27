from rest_framework.generics import CreateAPIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.viewsets import ModelViewSet


from .serializers import ProdutoSerializer,EstoqueSerializer,EntradaSaidaSerializer, LoginSerializer,CadastroSerializer
from .models import Produto,Estoque,EntradaSaida,Usuario


class ProdutoView(ModelViewSet):
    queryset = Produto.objects.all().order_by('modelo')
    serializer_class = ProdutoSerializer

class EstoqueView(ModelViewSet):
    queryset = Estoque.objects.all()
    serializer_class = EstoqueSerializer

class EntradaSaidaView(ModelViewSet):
    queryset = EntradaSaida.objects.all().order_by('responsavel')
    serializer_class = EntradaSaidaSerializer    


     
class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer

class CadastroView(CreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = CadastroSerializer