from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Produto,Estoque,EntradaSaida,Usuario


class ProdutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produto
        fields = '__all__'

class EstoqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estoque
        fields = '__all__'

class EntradaSaidaSerializer(serializers.ModelSerializer):
    class Meta:
        model = EntradaSaida
        fields = '__all__'



class LoginSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)
        data['usuario'] = {
            'categoria': self.user.categoria
        }
        return data

class CadastroSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True,required=True,style={'input_type': 'password'})
    password2 = serializers.CharField(write_only=True,required=True,style={'input_type': 'password'})

    class Meta:
        model = Usuario
        fields = ('username', 'password','password2')
    
    def validate(self,attrs):
        data = super().validate(attrs)
        if attrs['password'] != attrs['password2']:
                raise serializers.ValidationError(
                    {'password':'As senhas não batem'}
                )
        return attrs
    
    def create(self, validated_data):
        user = Usuario.objects.create(
            username = validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user