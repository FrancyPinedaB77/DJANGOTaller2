from django.conf.urls import url
from django.contrib import admin
from . import views

urlpatterns = [
 	url(r'^$', views.inicio),
 	 url(r'^grafo$', views.grafo),
]

