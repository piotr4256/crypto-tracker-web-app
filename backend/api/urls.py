from django.urls import path
from .views import (
    MarketListView,
    CoinDetailView,
    CoinMarketChartView,
    ExchangesListView,
    TrendingListView,
    GlobalStatsView
)

urlpatterns = [
    path('markets/', MarketListView.as_view(), name='market-list'),
    path('coins/<str:coin_id>/', CoinDetailView.as_view(), name='coin-detail'),
    path('coins/<str:coin_id>/chart/', CoinMarketChartView.as_view(), name='coin-chart'),
    path('exchanges/', ExchangesListView.as_view(), name='exchanges-list'),
    path('trending/', TrendingListView.as_view(), name='trending-list'),
    path('global/', GlobalStatsView.as_view(), name='global-stats'),
]