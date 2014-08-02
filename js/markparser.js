var Markdown = Markdown || {};

(function () {
    Markdown.Parser = function () {
        this.makeHtml = function (text) {

            text = DoHeaders(text);

            return text;
        }

        function DoHeaders (text) {

            // # text --> <h1>text</h1>
            // ## text --> <h2>text</h2>
            // ### text --> <h3>text</h3>...
            // ###### text -> <h6>text</h6>

            text = text.replace(/^(\#{1,6})[ \t]*(.+?)[ \t]*\#*\n+/gm,
                function (match, match1, match2) {
                    var level = match1.length;
                    alert(match);
                    return "<h" + level + ">" + match2 + "</h" + level + ">\n";
                }
            );

            return text;
        }
    }

})();