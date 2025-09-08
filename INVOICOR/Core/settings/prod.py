from .base import *

DEBUG = False

SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_HSTS_PRELOAD = True
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_SECONDS = 31536000
SECURE_REDIRECT_EXEMPT = []
SECURE_SSL_REDIRECT = True
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

ALLOWED_HOSTS = ['*']
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'

WSGI_APPLICATION = 'Core.wsgi.application'

# DATABASES['default'].update({
#     'ENGINE': 'django.db.backends.postgresql',
#     'NAME': config('DB_NAME'),
#     'USER': config('DB_USER'),
#     'PASSWORD': config('DB_PASSWORD'),
#     'HOST': config('DB_HOST'),
#     'PORT': config('DB_PORT'),
# })

DATABASES['default'].update({
    'ENGINE': 'django.db.backends.sqlite3',
    'NAME': BASE_DIR / '../prod_db.sqlite3',
})

# Static files
STATIC_ROOT = '/home/qrdifwdb/public_html/static'
STATIC_URL = '/static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'Core/static')
]

# Media folder settings
MEDIA_ROOT = '/home/qrdifwdb/public_html/media'
MEDIA_URL = '/media/'

STRIPE_SECRET_KEY = config('STRIPE_PRODUCTION_SECRET_KEY')
STRIPE_PUBLIC_KEY = config('STRIPE_PRODUCTION_PUBLIC_KEY')
STRIPE_ENDPOINT_SECRET = config('STRIPE_PRODUCTION_ENDPOINT_SECRET')
