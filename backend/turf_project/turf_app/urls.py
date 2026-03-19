from django.urls import path
from .views import (
    GetCSRFTokenView,
    RegisterView,
    LoginView,
    LogoutView,
    CurrentUserView,
    TurfListView,
    TurfDetailView,
    BookingListCreateView,
    AvailableSlotsView,
    ContactQueryView,
)

urlpatterns = [
    # CSRF
    path('csrf/',                           GetCSRFTokenView.as_view(),     name='csrf-token'),

    # Auth
    path('register/',                       RegisterView.as_view(),         name='register'),
    path('login/',                          LoginView.as_view(),            name='login'),
    path('logout/',                         LogoutView.as_view(),           name='logout'),
    path('me/',                             CurrentUserView.as_view(),      name='current-user'),

    # Turfs
    path('turfs/',                          TurfListView.as_view(),         name='turf-list'),
    path('turfs/<int:pk>/',                 TurfDetailView.as_view(),       name='turf-detail'),
    path('turfs/<int:pk>/available-slots/', AvailableSlotsView.as_view(),   name='available-slots'),

    # Bookings
    path('bookings/',                       BookingListCreateView.as_view(), name='booking-list-create'),

    # Contact
    path('contact/',                        ContactQueryView.as_view(),     name='contact'),
]