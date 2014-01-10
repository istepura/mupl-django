# vim: tabstop=4 expandtab shiftwidth=4 softtabstop=4
# -*- coding: utf-8 -*-
import json
from django.core.context_processors import csrf
from django.shortcuts import render_to_response
from django.http import HttpResponse
from django.template import RequestContext, loader
from parser.parser import *
from parser.exception import *

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
        except ParserException as e:
            resp['status'] = 'fail'
            resp['ln'] = e.coord[0]
            resp['col'] = e.coord[1]
            resp['str'] = str(e)
        except Exception as e:
            resp['status'] = 'fail'
            resp['str'] = str(e)
        return HttpResponse(json.dumps(resp), content_type="application/json")


