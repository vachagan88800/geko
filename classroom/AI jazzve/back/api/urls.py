from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import (
    MeView,
    NewsletterSubscribeView,
    ProductDetailView,
    ProductListView,
    ProductManageDetailView,
    ProductManageListCreateView,
    RegisterView,
    ReviewListView,
    ReviewManageDetailView,
    ReviewManageListCreateView,
)

urlpatterns = [
    path("auth/register/", RegisterView.as_view(), name="auth-register"),
    path("auth/login/", TokenObtainPairView.as_view(), name="auth-login"),
    path("auth/refresh/", TokenRefreshView.as_view(), name="auth-refresh"),
    path("auth/me/", MeView.as_view(), name="auth-me"),
    path("products/", ProductListView.as_view(), name="product-list"),
    path("products/<int:pk>/", ProductDetailView.as_view(), name="product-detail"),
    path("manage/products/", ProductManageListCreateView.as_view(), name="product-manage-list"),
    path(
        "manage/products/<int:pk>/",
        ProductManageDetailView.as_view(),
        name="product-manage-detail",
    ),
    path("reviews/", ReviewListView.as_view(), name="review-list"),
    path("manage/reviews/", ReviewManageListCreateView.as_view(), name="review-manage-list"),
    path(
        "manage/reviews/<int:pk>/",
        ReviewManageDetailView.as_view(),
        name="review-manage-detail",
    ),
    path("newsletter/", NewsletterSubscribeView.as_view(), name="newsletter-subscribe"),
]
