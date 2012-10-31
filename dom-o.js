/*global console, $, EDIA, arbor, window, document*/

(function ($) {
    "use strict";

    $.extend({
        dom_o : (function () {
    var root  = {},
        slice = Array.prototype.slice,
        has   = Object.prototype.hasOwnProperty,
        lCaseTags = true,
        tags  = [
            "A", "ABBR", "ACRONYM", "ADDRESS", "AREA", "ARTICLE", "ASIDE", "AUDIO",
            "B", "BDI", "BDO", "BIG", "BLOCKQUOTE", "BODY", "BR", "BUTTON",
            "CANVAS", "CAPTION", "CITE", "CODE", "COL", "COLGROUP", "COMMAND",
            "DATALIST", "DD", "DEL", "DETAILS", "DFN", "DIV", "DL", "DT", "EM",
            "EMBED", "FIELDSET", "FIGCAPTION", "FIGURE", "FOOTER", "FORM", "FRAME",
            "FRAMESET", "H1", "H2", "H3", "H4", "H5", "H6", "HEAD", "HEADER",
            "HGROUP", "HR", "HTML", "I", "IFRAME", "IMG", "INPUT", "INS", "KBD",
            "KEYGEN", "LABEL", "LEGEND", "LI", "LINK", "MAP", "MARK", "META",
            "METER", "NAV", "NOSCRIPT", "OBJECT", "OL", "OPTGROUP", "OPTION",
            "OUTPUT", "P", "PARAM", "PRE", "PROGRESS", "Q", "RP", "RT", "RUBY",
            "SAMP", "SCRIPT", "SECTION", "SELECT", "SMALL", "SOURCE", "SPAN",
            "SPLIT", "STRONG", "STYLE", "SUB", "SUMMARY", "SUP", "TABLE", "TBODY",
            "TD", "TEXTAREA", "TFOOT", "TH", "THEAD", "TIME", "TITLE", "TR",
            "TRACK", "TT", "UL", "VAR", "VIDEO", "WBR"
        ],

        i = tags.length;

    function registerNodeName(nodeName) {
        var nName = lCaseTags ? nodeName.toLowerCase() : nodeName;
        root[nName] = function(attributes) {
            var childNodes = slice.call(arguments, 1);

            if (typeof attributes !== "object" || attributes.nodeType) {
                childNodes.unshift(attributes);
                attributes = null;
            }
            return new Element(document, nName, attributes, childNodes);
        };
    }
    
    function hyphenify(text) {
        return text.replace(/[A-Z]/g, "-$&").toLowerCase();
    }
    
    function Element(document, nodeName, attributes, childNodes) {
        var child,
            el = document.createElement(nodeName),
            i;

        for (i in attributes) {
            if (has.call(attributes, i)) {
                child = document.createAttribute(hyphenify(i));
                child.nodeValue = attributes[i];
                el.setAttributeNode(child);
            }
        }

        for (i = 0; i < childNodes.length; i += 1) {
            child = childNodes[i];
            if (typeof child !== "undefined") {
                if (!child || !child.nodeType) {
                    child = document.createTextNode(child);
                }
                el.appendChild(child);
            }
        }
        return el;
    }


    while ((i -= 1))  {
        registerNodeName(tags[i]);
    }



    root.CSS = function(selector) {
        var css = selector + "{",
            i = 1,
            l = arguments.length,
            key,
            block;

        while (i < l) {
            block = arguments[i += 1];

            switch (typeof block) {
                case "object":
                  for (key in block) {
                      if (block.hasOwnProperty(key)) {
                          css += hyphenify(key) + ":" + block[key];
                          if (typeof block[key] === "number") {
                              css += "px";
                          }
                          css += ";";
                      }
                  }
                  break;

                case "string":
                  css = selector + " " + block + css;
                  break;
            }
        }
        css += "}\n";
        return css;
    };

    root.stringify = function(element) {
        return element.outerHTML;
    };

    return root;
    }())
    });
}(jQuery));
