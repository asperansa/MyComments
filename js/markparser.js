var Markdown = Markdown || {};

(function () {

    /**
     * Парсер markdown
     * @constructor
     */
    Markdown.Parser = function () {

        this.makeHtml = function (text) {
            text = DoHeaders(text);

            return text;
        } // makeHtml..

        function DoHeaders (text) {

            // # text --> <h1>text</h1>
            // ## text --> <h2>text</h2>
            // ### text --> <h3>text</h3>...
            // ###### text -> <h6>text</h6>

            text = text.replace(/^(\#{1,6})[ \t]*(.+?)[ \t]*\#*\n+/gm,
                function (match, match1, match2) {
                    var level = match1.length;
                    return "<h" + level + ">" + match2 + "</h" + level + ">\n";
                }
            );

            return text;
        } // DoHeaders..

    } // Markdown Parser..

})();