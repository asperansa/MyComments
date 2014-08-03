$(function () {
    'use strict';

    var cs = {};

    cs.VERSION = '0.0.1';

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

    /**
     * Определение модели комментария
     *      задаем defaults: рейтинг и время по-умолчанию
     * @type {*|void}
     */
    var Comment;
    Comment = Backbone.Model.extend({
        defaults: {
            score: 0,
            time: new Date().getTime() // timestamp
        }
    }); // Model Comment...
    

    /**
     * Определении коллекциии коментариев
     *      задаем model: модель комментариев
     * @type {*|void}
     */
    var Comments;
    Comments = Backbone.Collection.extend({
        model: Comment
    }); // Collection Comments...
    

    /**
     * Определяем представление для комментария
     * @type {*|void}
     */
    var CommentView;
    CommentView = Backbone.View.extend({
        tagName: 'div',
        className: 'comment-item',
    
        templates: {
            'comment': _.template($('#comment-template').html()), // основной шаблон комментария
            'hide': _.template($('#hide-template').html()), // Открыть комментарий
            'add': _.template($('#add-template').html()), // Добавить комментарий
            'show': _.template($('#show-template').html()) // Развернуть комментарий
        }, // templates..
    
        events: {
            'click .plus': 'addScore',
            'click .minus': 'decScore',
            'click .open-comment': 'render',
            'click .answer': 'answer',
            'click .button_blue': 'save',
            'click .hide-comment': 'hide',
            'click .show-comment': 'show'
        }, // events..
    
        /**
         * Увеличивает рейтинг комментария на +1
         */
        addScore: function () {
            this.$(
                '#voting_' + this.model.attributes.id
            ).html(this.model.attributes.score += 1);
            this.checkVoting();
        }, // addScore..
    
        /**
         * Уменьшает рейтинг комментария на -1
         */
        decScore: function () {
            this.$(
                '#voting_' +
                    this.model.attributes.id
            ).html(this.model.attributes.score -= 1);
            this.checkVoting();
        }, // decScore..
    
        /**
         * Проверка на скрытие комментария
         */
        checkVoting: function () {
            if (this.model.attributes.score < -10) {
                $(this.el).html(
                    this.templates.hide(
                        this.model.toJSON()
                    )
                );
            } // если рейтинг < -10..
        }, // checkVoting..
    
        /**
         * Ответить на комментарий
         */
        answer: function () {
            $(this.el).find('.comments-form').hide();
            if ($(this.el).find('.comments-form').length <= 0) {
                $(this.el).append(
                    this.templates.add(
                        this.model.toJSON()
                    )
                );
                H5F.setup(document.getElementById('add-comment'));
            }
        }, // answer..
    
        /**
         * Сохранить комментарий
         */
        save: function () {
            var comment = new Comment();
            if ($(this.el).find('.error').length <= 0 &&
                $(this.el).find('.required').length <= 0) { // if данные валидны
                comment.set({
                    id: this.model.attributes.id +
                        100,
                    parent: this.model.attributes.id,
                    name: $(this.el).find('input#name').val(),
                    text: markdown($(this.el).find('textarea').val()),
                    time: timeToLate(new Date().getTime())
                });
            } else { // сообщения об ошибках
                $('.comments-form').addClass('invalid');
                $(this.el).find('.error-message').html('Не все поля заполнены<br/>');
                if ($(this.el).find('input#name').hasClass('error')) {
                    $(this.el).find('.error-message').append('Неверное имя<br/>');
                }
                if ($(this.el).find('input#e-mail').hasClass('error')) {
                    $(this.el).find('.error-message').append('Неверный E-mail<br/>');
                }
                return;
            }
            var commentView = new CommentView({
                model: comment
            });
            if (comment.attributes.parent !== undefined) {
                this.$(
                    '#comment_' +
                        comment.attributes.parent
                ).after(commentView.render().el);
            } else {
                this.el.append(commentView.render().el);
            }
            $(this.el).find('.comments-form').hide();
        }, // save..
    
        /**
         * Скрыть комментарий
         */
        hide: function () {
            $(this.el).append(this.templates.show(this.model.toJSON()));
            this.$(
                '#comment_' +
                    this.model.attributes.id
            ).hide();
        },// hide..
    
        /**
         * Показать комментарий
         */
        show: function () {
            commentsView.renderComment(this.model);
            $('.show-comment').hide();
        }, // show..
    
        render: function () {
            $(this.el).html(this.templates.comment(this.model.toJSON()));
            return this;
        } // render..
    
    }); // Vew CommentView...

    /**
     * Определяем представление для коллекции комментарией
     * @type {*|void}
     */
    var CommentsView, commentsView;
    CommentsView = Backbone.View.extend({
        el: $('#comments'),
    
        initialize: function () {
            this.collection = new Comments(comments);
            this.render();
        }, // initialize..
    
        render: function () {
            var that = this;
            _.each(this.collection.models, function (item) {
                that.renderComment(item);
            }, this);
        }, // render..
    
        renderComment: function (item) {
            if (item.attributes.time > 0) {
                item.attributes.time = timeToLate(item.attributes.time);
            }
            var commentView = new CommentView({
                model: item
            });
            if (item.attributes.parent !== undefined) {
                this.$(
                    '#comment_' +
                        item.attributes.parent
                ).after(commentView.render().el);
            } else {
                this.el.append(commentView.render().el);
            }
        } // renderComment..
    
    }); // View CommentsView..
    
    commentsView = new CommentsView();

    /**
     * Преобразование markdown в html
     * @param text - исходный текст
     * @returns {*} - html
     */
    function markdown (text) {
        var parser = new Markdown.Parser();
        return parser.makeHtml(text);
    } // markdown..
    

    var Markdown = Markdown || {};
    
    (function () {
        /**
         * Парсер markdown
         * @constructor
         */
        Markdown.Parser = function () {
            this.makeHtml = function (text) {
                text = new DoHeaders(text);
    
                return text;
            }; // makeHtml..
    
            function DoHeaders (text) {
                // # text --> <h1>text</h1>
                // ## text --> <h2>text</h2>
                // ### text --> <h3>text</h3>...
                // ###### text -> <h6>text</h6>
    
                text = text.replace(/^(\#{1,6})[ \t]*(.+?)[ \t]*\#*\n+/gm,
                    function (match, match1, match2) {
                        var level = match1.length;
                        return '<h' + level + '>' + match2 + '</h' + level + '>\n';
                    }
                );
    
                return text;
            } // DoHeaders..
        }; // Markdown Parser..
    })();

    /**
     * Отсчет сколько прошло времени
     * @param time
     * @returns {string}
     */
    function timeToLate (time) {
        var now, daystoCD, hourstoCD, minutestoCD;
        now = new Date();
        // days
        daystoCD = Math.floor((now.getTime() - time) /
            (1000 * 60 * 60 * 24));
        if (daystoCD > 0) {
            return daystoCD +
                ' дн. назад';
        }
        // hours
        hourstoCD = Math.floor((now.getTime() - time) /
            (1000 * 60 * 60));
        if (hourstoCD > 0) {
            return hourstoCD +
                ' час. назад';
        }
        // minutes
        minutestoCD = Math.floor((now.getTime() - time) /
            (1000 * 60));
        if (minutestoCD > 0) {
            return minutestoCD +
                ' мин. назад';
        }
        return 'только что';
    } // timeToLate..
    

    return cs;
}); // точка входа..