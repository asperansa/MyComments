$(function () {
    'use strict';

    var cs = {};

    cs.VERSION = '<%= version %>';

    var comments;
    /**
     * Первоначальный набор demo комментариев
     * @type {*[]}
     *     id (number) - идентификатор комментария
     *     parent (number) - идентификатор родителя (максимальный уровень вложенности = 3)
     *     name (string) - автор комментария
     *     text (string) - текст комментария (поддержка markdown)
     *     score (number) - рейтинг комментария
     *     time (timestamp) -время добавления комментария
     */
    comments = [
        {
            id: '234',
            name: 'Carabutur tristique',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, ' +
                'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            score: 3,
            time: '1407010357627'
        },
        {
            id: '2',
            parent: '234',
            name: 'Carabutur tristique',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, ' +
                'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            score: 0,
            time: '1407010357627'
        },
        {
            id: '1',
            name: 'Carabutur tristique',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, ' +
                'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            score: -5,
            time: '1407010357627'
        },
        {
            id: '45',
            parent: '2',
            name: 'Carabutur tristique',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, ' +
                'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            score: 0,
            time: '1407010357627'
        }
    ]; // var comments...

    // @include Models/comment.model.js

    // @include Collections/comments.collection.js

    // @include Views/comment.view.js

    // @include Views/comments.view.js

    // @include markdown.js

    // @include markparser.js

    // @include timeToLate.js

    return cs;
}); // точка входа..