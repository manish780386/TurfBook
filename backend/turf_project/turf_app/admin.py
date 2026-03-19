from django.contrib import admin
from .models import Turf, Booking, ContactQuery


@admin.register(Turf)
class TurfAdmin(admin.ModelAdmin):
    list_display  = ['name', 'location', 'price_per_hour', 'created_at']
    search_fields = ['name', 'location']


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display  = ['user', 'turf', 'date', 'time_slot', 'created_at']
    list_filter   = ['date', 'turf']
    search_fields = ['user__username', 'turf__name']


@admin.register(ContactQuery)
class ContactQueryAdmin(admin.ModelAdmin):
    list_display  = ['name', 'email', 'created_at']
    search_fields = ['name', 'email']