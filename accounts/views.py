from rest_framework import status  # Importing HTTP status codes from DRF
from rest_framework.response import Response  # Importing Response class to send responses
from rest_framework.decorators import api_view  # Importing api_view decorator for view functions
from django.contrib.auth import authenticate  # Importing authenticate function for user authentication
from rest_framework.authtoken.models import Token  # Importing Token model for authentication tokens
from .serializers import UserSerializer  # Importing UserSerializer for serializing user data
from .models import Chat
from .serializers import ChatSerializer,ContactMessageSerializer

@api_view(['POST'])  # Specifying that this view will accept POST requests
def signup(request):  # Defining the signup view function
    serializer = UserSerializer(data=request.data)  # Creating a serializer instance with request data
    if serializer.is_valid():  # Checking if the serialized data is valid
        user = serializer.save()  # Saving the user instance if valid
        token = Token.objects.create(user=user)  # Creating a token for the new user
        return Response({'token': token.key}, status=status.HTTP_201_CREATED)  # Returning token with 201 status
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Returning errors with 400 status if invalid

@api_view(['POST'])  # Specifying that this view will also accept POST requests
def login(request):  # Defining the login view function
    username = request.data.get('username')  # Getting the username from request data
    password = request.data.get('password')  # Getting the password from request data
    
    # Validate credentials
    user = authenticate(request, username=username, password=password)  # Authenticating the user
    
    if user is not None:  # If authentication is successful
        # If the user is authenticated, create or get the token
        token, created = Token.objects.get_or_create(user=user)  # Getting or creating a token for the user
        return Response({'success': True, 'token': token.key}, status=status.HTTP_200_OK)  # Returning success response with token
    else:  # If authentication fails
        return Response({'success': False, 'error': 'Invalid username or password.'}, status=status.HTTP_401_UNAUTHORIZED)  # Returning error response with 401 status

@api_view(['GET', 'POST'])
def get_chats(request):
    if request.method == 'GET':
        # Fetch all chat records from the database
        chats = Chat.objects.all()
        serializer = ChatSerializer(chats, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        # Create a new chat entry
        serializer = ChatSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # Save the new chat entry
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def submit_contact_message(request):
    if request.method == 'POST':
        serializer = ContactMessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Your message has been submitted!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)