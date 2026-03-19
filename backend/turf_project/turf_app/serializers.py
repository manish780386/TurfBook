from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Turf, Booking, ContactQuery


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model  = User
        fields = ['id', 'username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password'],
        )
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model  = User
        fields = ['id', 'username', 'email']


class TurfSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Turf
        fields = '__all__'


class BookingSerializer(serializers.ModelSerializer):
    turf_detail = TurfSerializer(source='turf', read_only=True)
    username    = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model  = Booking
        fields = ['id', 'user', 'turf', 'turf_detail', 'username', 'date', 'time_slot', 'created_at']
        read_only_fields = ['user', 'created_at']

    def validate(self, data):
        turf      = data.get('turf')
        date      = data.get('date')
        time_slot = data.get('time_slot')

        if Booking.objects.filter(turf=turf, date=date, time_slot=time_slot).exists():
            raise serializers.ValidationError(
                "Ye time slot already booked hai!"
            )
        return data


class ContactQuerySerializer(serializers.ModelSerializer):
    class Meta:
        model  = ContactQuery
        fields = '__all__'
        read_only_fields = ['created_at']