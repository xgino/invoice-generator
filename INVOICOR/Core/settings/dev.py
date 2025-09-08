from .base import *

DEBUG = True

DATABASES['default'].update({
    'ENGINE': 'django.db.backends.sqlite3',
    'NAME': BASE_DIR / '../dev_db.sqlite3',
})

DOMAIN_URL = "http://127.0.0.1:8000"

STRIPE_SECRET_KEY = config('STRIPE_TEST_SECRET_KEY')
STRIPE_PUBLIC_KEY = config('STRIPE_TEST_PUBLIC_KEY')
STRIPE_ENDPOINT_SECRET = config('STRIPE_TEST_ENDPOINT_SECRET')