from rest_framework import serializers  # Importing serializers from Django REST Framework
from django.contrib.auth.models import User  # Importing the built-in User model
from .models import Chat,ContactMessage

class UserSerializer(serializers.ModelSerializer):  # Creating a serializer class for the User model
    class Meta:  # Meta class to define serializer behavior
        model = User  # Specifies the model associated with this serializer
        fields = ['id', 'username', 'email', 'password']  # Fields to include in serialization
        extra_kwargs = {'password': {'write_only': True}}  # Make password write-only (not included in output)

    def create(self, validated_data):  # Overriding the create method for custom user creation
        user = User(  # Creating a new User instance
            email=validated_data['email'],  # Setting email from validated data
            username=validated_data['username']  # Setting username from validated data
        )
        user.set_password(validated_data['password'])  # Hashing the password before saving
        user.save()  # Saving the new user instance to the database
        return user  # Returning the created user instance

class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ['id', 'name', 'message']


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'message', 'created_at']
