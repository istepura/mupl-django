from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    url(r'^do/$', 'interp.views.go'),
    url(r'^$', 'interp.views.index'),
    # Examples:
    # url(r'^$', 'mupl_web.views.home', name='home'),
    # url(r'^mupl_web/', include('mupl_web.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)
