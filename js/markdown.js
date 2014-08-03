/**
 * Преобразование markdown в html
 * @param text - исходный текст
 * @returns {*} - html
 */
function markdown (text) {
    var parser = new Markdown.Parser();
    return parser.makeHtml(text);
} // markdown..
