import json
import requests
from bs4 import BeautifulSoup
from django.shortcuts import get_object_or_404, render
from django.views import generic
from django.utils import timezone
from django.http import JsonResponse, HttpResponseRedirect
from django.urls import reverse
from django.db.models import Case, Value, When

from .models import ShipInfo

from django.db.models import Case, When, Value, CharField


class IndexView(generic.ListView):
    template_name = 'notice/index.html'
    context_object_name = 'vessel_list'

    def get_queryset(self):
        queryset = ShipInfo.objects.annotate(
            ship_status_display=Case(
                When(ship_status=1, then=Value('완료')),
                When(ship_status=0, then=Value('실패')),
                output_field=CharField(),
            )
        ).filter(pub_date__lte=timezone.now()).order_by('pub_date')

        return queryset


class DetailView(generic.DetailView):
    model = ShipInfo
    template_name = 'notice/detail.html'
    context_object_name = 'vessel_detail'


class InsertView(generic.TemplateView):
    template_name = 'notice/insert.html'


def create_vessel(request):
    body = json.loads(request.body)
    new_vessel = ShipInfo()
    new_vessel.ship_name = body['name']
    new_vessel.ship_IMO = body['imoNumber']
    new_vessel.ship_description = body['description']
    new_vessel.ship_status = body['status']
    new_vessel.pub_date = timezone.now()
    new_vessel.save()
    return render(request, 'notice/index.html')


def delete_vessel(request):
    body = json.loads(request.body)
    instance = ShipInfo.objects.filter(id=body['id'])
    instance.delete()
    return render(request, 'notice/index.html')


def update_vessel(request, vessel_id):
    vessel_detail = get_object_or_404(ShipInfo, pk=vessel_id)
    vessel_detail.ship_name = request.POST['vesselName']
    vessel_detail.ship_IMO = request.POST['imoNumber']
    vessel_detail.ship_description = request.POST['description']
    vessel_detail.ship_status = request.POST['status']
    vessel_detail.save()
    return HttpResponseRedirect(reverse('notice:index'))


def imo_check(request):
    body = json.loads(request.body)
    imo_num = body['data']
    url = f'https://www.vesselfinder.com/vessels/details/{imo_num}'
    headers = {'User-Agent': 'Mozilla/5.0'}
    response = requests.get(url=url, headers=headers)
    context = {
        'result': response.status_code,
    }
    return JsonResponse(context)
