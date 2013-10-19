from django.core.context_processors import csrf
from django.shortcuts import render_to_response
from django.http import HttpResponse
from django.template import RequestContext, loader
from parser.parser import *

def index(request):
    c = {}
    c.update(csrf(request))
    return render_to_response('interp/index.html', c)

def go(request):
    if request.method == 'POST':
        s = request.POST["code"]
        prs = Parser(Lexer())
        try:
            ast = prs.parse(s)
            return HttpResponse(str(ast.eval({})))
        except Exception as e:
            return HttpResponse(str(e))


