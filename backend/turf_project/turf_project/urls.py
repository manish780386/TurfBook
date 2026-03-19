from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('turf_app.urls')),
]

# Media files serve karna development mein
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)