from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
import os

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        username = os.environ.get('DJANGO_SU_NAME', 'admin')
        password = os.environ.get('DJANGO_SU_PASSWORD', 'admin123')
        email = os.environ.get('DJANGO_SU_EMAIL', 'admin@admin.com')
        
        if not User.objects.filter(username=username).exists():
            User.objects.create_superuser(username, email, password)
            self.stdout.write(f'Superuser {username} created!')
        else:
            self.stdout.write('Superuser already exists.')