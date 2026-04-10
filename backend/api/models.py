from django.db import models

class CryptoCurrency(models.Model):
    name = models.CharField(max_length=100, verbose_name="Nazwa")
    symbol = models.CharField(max_length=10, verbose_name="Symbol")
    market_cap_rank = models.PositiveIntegerField(null=True, blank=True, verbose_name="Ranking (Market Cap)")
    image_url = models.URLField(null=True, blank=True, verbose_name="Link do ikony")
    is_active = models.BooleanField(default=True, verbose_name="Aktywna")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Data dodania")

    class Meta:
        verbose_name = "Kryptowaluta"
        verbose_name_plural = "Kryptowaluty"

    def __str__(self):
        return f"{self.name} ({self.symbol})"
