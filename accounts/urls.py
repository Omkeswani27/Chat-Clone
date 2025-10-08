from django.urls import path
from .views import signup, login, get_chats, submit_contact_message
urlpatterns = [
    path('signup/', signup, name='signup'),
    path('login/', login, name='login'),
    path('chats/', get_chats, name='get_chats'),
    path('contact/', submit_contact_message, name='submit_contact_message'),
]
