from django.urls import path

from common.views import GenericView

app_name = 'common'

urlpatterns = [
    path('', GenericView.as_view(), name='home')
]