import json
import requests
from bs4 import BeautifulSoup
from django.shortcuts import get_object_or_404, render
from django.views import generic
from django.utils import timezone
from django.http import JsonResponse

from .models import ShipInfo

class IndexView(generic.ListView):
    template_name = 'notice/index.html'
    context_object_name = 'vessel_list'
    
    def get_queryset(self):
        return ShipInfo.objects.filter(
            pub_date__lte=timezone.now()
        ).order_by('pub_date')[:5]
    

class InsertView(generic.TemplateView):
    template_name = 'notice/insert.html'
    
def imoCheck(request):
    imoNum = json.loads(request.body)
    url = f'https://www.vesselfinder.com/vessels/details/{imoNum}'
    headers = {'User-Agent': 'Mozilla/5.0'}
    #403 Erorr가 발생할 경우 로봇으로 인식해 차단당하기 때문에 headers를 추가해주어야한다.
    response = requests.get(url=url, headers=headers)
    context = {
        'result': response.status_code,
    }
    return JsonResponse(context)
    