from django.urls import path

from . import views

app_name = 'notice'
urlpatterns = [
    # ex: /notice/
    path('', views.IndexView.as_view(), name='index'),
    path('insert/', views.InsertView.as_view(), name='insert'),
    path('imocheck/', views.imo_check, name='imoCheck'),
    path('insert/createVessel/', views.create_vessel, name='createVessel'),
    path('delete/', views.delete_vessel, name='deleteVessel'),
    path('<int:pk>/', views.DetailView.as_view(), name='detail'),
    path('<int:vessel_id>/update', views.update_vessel, name='update'),
]