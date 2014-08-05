/**
 * Определение модели комментария
 *      задаем defaults: рейтинг и время по-умолчанию
 * @type {*|void}
 */
var Comment = Backbone.Model.extend({
    defaults: {
        score: 0,
        time: new Date().getTime() // timestamp
    }
}); // Model Comment...
