from django.contrib.auth import authenticate, login, logout
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Turf, Booking, ContactQuery
from .serializers import (
    RegisterSerializer,
    UserSerializer,
    TurfSerializer,
    BookingSerializer,
    ContactQuerySerializer,
)


class GetCSRFTokenView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({'message': 'ok'})


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'message': 'Registration successful!',
                'user': UserSerializer(user).data,
                'tokens': {
                    'access': str(refresh.access_token),
                    'refresh': str(refresh),
                }
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username', '').strip()
        password = request.data.get('password', '')

        if not username or not password:
            return Response({'error': 'Username aur password required hai.'}, status=400)

        user = authenticate(request, username=username, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'message': 'Login successful!',
                'user': UserSerializer(user).data,
                'tokens': {
                    'access': str(refresh.access_token),
                    'refresh': str(refresh),
                }
            })
        return Response({'error': 'Invalid username ya password.'}, status=401)


class LogoutView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        return Response({'message': 'Logout successful.'}, status=status.HTTP_200_OK)


class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(UserSerializer(request.user).data)


class TurfListView(APIView):
    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAdminUser()]
        return [AllowAny()]

    def get(self, request):
        turfs = Turf.objects.all().order_by('-created_at')
        serializer = TurfSerializer(turfs, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request):
        serializer = TurfSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TurfDetailView(APIView):
    def get_permissions(self):
        if self.request.method in ['PUT', 'DELETE']:
            return [IsAdminUser()]
        return [AllowAny()]

    def get_object(self, pk):
        try:
            return Turf.objects.get(pk=pk)
        except Turf.DoesNotExist:
            return None

    def get(self, request, pk):
        turf = self.get_object(pk)
        if not turf:
            return Response({'error': 'Turf nahi mila.'}, status=status.HTTP_404_NOT_FOUND)
        serializer = TurfSerializer(turf, context={'request': request})
        return Response(serializer.data)

    def put(self, request, pk):
        turf = self.get_object(pk)
        if not turf:
            return Response({'error': 'Turf nahi mila.'}, status=status.HTTP_404_NOT_FOUND)
        serializer = TurfSerializer(turf, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        turf = self.get_object(pk)
        if not turf:
            return Response({'error': 'Turf nahi mila.'}, status=status.HTTP_404_NOT_FOUND)
        turf.delete()
        return Response({'message': 'Turf delete ho gaya.'}, status=status.HTTP_204_NO_CONTENT)


class BookingListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        bookings = Booking.objects.filter(user=request.user).order_by('-created_at')
        serializer = BookingSerializer(bookings, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request):
        serializer = BookingSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AvailableSlotsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        date = request.query_params.get('date')
        if not date:
            return Response({'error': 'Date required hai.'}, status=status.HTTP_400_BAD_REQUEST)
        booked = Booking.objects.filter(turf_id=pk, date=date).values_list('time_slot', flat=True)
        return Response({'booked_slots': list(booked)})


class ContactQueryView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ContactQuerySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {'message': 'Query submit ho gayi! Hum jald reply karenge.'},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)