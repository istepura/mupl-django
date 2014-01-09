define('ace/mode/mupl', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text', 'ace/tokenizer', 'ace/mode/mupl_highlight_rules'], function(require, exports, module) {

    var oop = require("../lib/oop");
    var TextMode = require("./text").Mode;
    var Tokenizer = require("../tokenizer").Tokenizer;
    var MuplHighlightRules = require("./mupl_highlight_rules").MuplHighlightRules;

    var Mode = function() {
        this.HighlightRules = MuplHighlightRules;
    };
    oop.inherits(Mode, TextMode);

    (function() {
        this.$id = "ace/mode/mupl";
    }).call(Mode.prototype);

    exports.Mode = Mode;
});

define('ace/mode/mupl_highlight_rules', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text_highlight_rules'], function(require, exports, module) {

    "use strict";

    var oop = require("../lib/oop");
    var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

    var MuplHighlightRules = function(){
        var kwcontrol = "ifgreater|isaunit";
        var kwop = "add|call|snd|fst";
        var kwtype="int|aunit|apair";
        var kwdef = "fun|mlet";
        var kwconst="#f";

        var keywordMapper = this.createKeywordMapper({
            "keyword.control": kwcontrol,
            "keyword.operator": kwop,
            "constant.language": kwconst,
            "keyword.other": kwdef,
            "support.type": kwtype,
            "variable.language" : "var"
        }, "identifier", true);

        this.$rules = 
        {
            "start": [
                {
                    token : "constant.numeric", // hex
                    regex : "0[xX][0-9a-fA-F]+(?:L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b"
                }, 
                {
                    token : "constant.numeric", // float
                    regex : "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?(?:L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b"
                },
                {
                    token : keywordMapper,
                    regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
                },
                {
                    token : "string",
                    regex : '"(?=.)',
                    next  : "qqstring"
                }
            ],
            "qqstring": [
                {
                    token : "string",
                    regex : '[^"\\\\]+'
                }, {
                    token : "string",
                    regex : "\\\\$",
                    next  : "qqstring"
                }, {
                    token : "string",
                    regex : '"|$',
                    next  : "start"
                }
            ]
        } 

    };
    oop.inherits(MuplHighlightRules, TextHighlightRules);
    exports.MuplHighlightRules = MuplHighlightRules;
});
