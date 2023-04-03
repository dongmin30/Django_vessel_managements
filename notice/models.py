from django.db import models

class ShipInfo(models.Model):
    ship_name = models.CharField(max_length=50)
    ship_IMO = models.CharField(max_length=7)
    ship_description = models.CharField(max_length=500)
    ship_status = models.CharField(max_length=1, default=0)
    pub_date = models.DateTimeField('date published')