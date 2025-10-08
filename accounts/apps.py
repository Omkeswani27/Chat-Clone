from django.apps import AppConfig

class AccountsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'  # Sets the default type for auto-generated primary keys
    name = 'accounts'  # The name of the application
