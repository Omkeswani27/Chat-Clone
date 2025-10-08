from django.shortcuts import render

# Renders the index page
def index(request):
    return render(request, 'index.html')

# Handles the signup page rendering
def signup(request):
    # Handle GET or POST logic for signup
    return render(request, 'SignUp.html')
