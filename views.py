# -*- coding: utf-8 -*-
import json
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
        resp = {}
        try:
            ast = prs.parse(s)
            resp['status'] = 'ok'
            resp['result'] = str(ast.eval({}))
        except Exception as e:
            resp['status'] = 'fail'
            if isinstance(e, ParserException):
                resp['ln'] = e.coord[0]
                resp['col'] = e.coord[1]
            else: 
                res = str(e)
        return HttpResponse(json.dumps(resp), content_type="application/json")


