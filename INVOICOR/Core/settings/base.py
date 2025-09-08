from decouple import config
from pathlib import Path
import os

BASE_DIR = Path(__file__).resolve().parent.parent.parent
SECRET_KEY = config('SECRET_KEY')
DEBUG = config('DEBUG', default=True, cast=bool)
ALLOWED_HOSTS = ['127.0.0.1', 'localhost', '*']
DOMAIN_URL = config('DOMAIN_URL')


INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',


    # Saas Apps
    'pages.apps.PagesConfig', 
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.locale.LocaleMiddleware',
]

ROOT_URLCONF = 'Core.urls'

# AUTH_USER_MODEL = 'Accounts.User'
# LOGIN_REDIRECT_URL  = 'Account:login'
# LOGIN_URL  = 'Account:login'
# LOGOUT_REDIRECT_URL = 'Account:login'

# Define the path to the log directory
LOG_DIR = os.path.join(BASE_DIR, 'logs')

# Ensure LOG_DIR exists
os.makedirs(LOG_DIR, exist_ok=True)

# Centralized logging configuration
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {message}',
            'style': '{',
        },
        'simple': {
            'format': '{levelname} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
        },
        'accounts_file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': os.path.join(LOG_DIR, 'accounts.log'),
            'formatter': 'verbose',
        },
        'registration_file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': os.path.join(LOG_DIR, 'registration.log'),
            'formatter': 'verbose',
        },
        'login_file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': os.path.join(LOG_DIR, 'login.log'),
            'formatter': 'verbose',
        },
    },
    'loggers': {
        # 'django': {
        #     'handlers': ['console'],  # Console handler for debugging
        #     'level': 'DEBUG',
        #     'propagate': True,
        # },
        'accounts': {
            'handlers': ['accounts_file'],
            'level': 'DEBUG',
            'propagate': False,
        },
        'registration': {
            'handlers': ['registration_file'],
            'level': 'DEBUG',
            'propagate': False,
        },
        'login': {
            'handlers': ['login_file'],
            'level': 'DEBUG',
            'propagate': False,
        },       
    },
}

# Blacklisted ip [curl -o blacklisted_domains.txt https://raw.githubusercontent.com/stamparm/ipsum/master/ipsum.txt]
BLACKLISTED_IPS_FILE = os.path.join(BASE_DIR, 'blacklisted_domains.txt')
def load_blacklisted_ips():
    blacklisted_ips = []
    with open(BLACKLISTED_IPS_FILE) as file:
        for line in file:
            if line.strip() and not line.startswith('#'):
                ip = line.split()[0].strip()  # Extract IP from the line
                blacklisted_ips.append(ip)
    return blacklisted_ips

BLACKLISTED_IPS = load_blacklisted_ips()

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'Core.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
LANGUAGE_CODE = 'en-US'
TIME_ZONE = 'Europe/Amsterdam'
USE_I18N = True
USE_L10N = True
USE_TZ = True

LANGUAGES = [
    ('en', 'English'),
    ('fr', 'Français'),
    ('de', 'Deutsch'),
    ('nl', 'Nederlands'),
    ('es', 'Español'),
    ('it', 'Italiano'),
    ('pt', 'Português'),
    ('jp', '日本語'),
    ('zh', '中文'),
]

LOCALE_PATHS = [
    BASE_DIR / "locale",
]

# Curency Europe
DECIMAL_SEPARATOR = ','
THOUSAND_SEPARATOR = ' '
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
DATA_UPLOAD_MAX_NUMBER_FIELDS = 2000

# Static Files
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
STATIC_URL = '/static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'Core/static')
]

# Media folder settings
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'