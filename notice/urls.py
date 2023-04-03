from django.urls import path

from . import views

app_name = 'notice'
urlpatterns = [
    # ex: /notice/
    path('', views.IndexView.as_view(), name='index'),
    path('insert/', views.InsertView.as_view(), name='insert'),
    path('insert/imocheck/', views.imoCheck, name='imoCheck'),
]