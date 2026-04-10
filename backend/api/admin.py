from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import CryptoCurrency

@admin.register(CryptoCurrency)
class CryptoCurrencyAdmin(ModelAdmin):
    list_display = ("name", "symbol", "market_cap_rank", "is_active", "created_at")
    search_fields = ("name", "symbol")
    list_filter = ("is_active",)
    
    # Przykładowe dostosowanie wyświetlania w Unfold
    fieldsets = (
        ("Informacje Podstawowe", {
            "fields": ("name", "symbol", "market_cap_rank")
        }),
        ("Media i Status", {
            "fields": ("image_url", "is_active")
        }),
    )