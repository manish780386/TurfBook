from django.db import models
from django.contrib.auth.models import User


class Turf(models.Model):
    name           = models.CharField(max_length=200)
    location       = models.CharField(max_length=300)
    price_per_hour = models.DecimalField(max_digits=8, decimal_places=2)
    description    = models.TextField()
    image          = models.ImageField(upload_to='turf_images/', blank=True, null=True)
    created_at     = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Booking(models.Model):
    TIME_SLOT_CHOICES = [
        ('06:00-07:00', '6:00 AM – 7:00 AM'),
        ('07:00-08:00', '7:00 AM – 8:00 AM'),
        ('08:00-09:00', '8:00 AM – 9:00 AM'),
        ('09:00-10:00', '9:00 AM – 10:00 AM'),
        ('10:00-11:00', '10:00 AM – 11:00 AM'),
        ('11:00-12:00', '11:00 AM – 12:00 PM'),
        ('12:00-13:00', '12:00 PM – 1:00 PM'),
        ('13:00-14:00', '1:00 PM – 2:00 PM'),
        ('14:00-15:00', '2:00 PM – 3:00 PM'),
        ('15:00-16:00', '3:00 PM – 4:00 PM'),
        ('16:00-17:00', '4:00 PM – 5:00 PM'),
        ('17:00-18:00', '5:00 PM – 6:00 PM'),
        ('18:00-19:00', '6:00 PM – 7:00 PM'),
        ('19:00-20:00', '7:00 PM – 8:00 PM'),
        ('20:00-21:00', '8:00 PM – 9:00 PM'),
        ('21:00-22:00', '9:00 PM – 10:00 PM'),
    ]

    user       = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    turf       = models.ForeignKey(Turf, on_delete=models.CASCADE, related_name='bookings')
    date       = models.DateField()
    time_slot  = models.CharField(max_length=20, choices=TIME_SLOT_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('turf', 'date', 'time_slot')

    def __str__(self):
        return f"{self.user.username} — {self.turf.name} on {self.date} at {self.time_slot}"


class ContactQuery(models.Model):
    name       = models.CharField(max_length=150)
    email      = models.EmailField()
    message    = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Query from {self.name} ({self.email})"