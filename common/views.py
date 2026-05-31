from django.shortcuts import render
from django.views.generic import TemplateView


class GenericView(TemplateView):
    template_name = 'common/home.html'