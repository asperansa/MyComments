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
        $(this.el).append(
            this.templates.add(
                this.model.toJSON()
            )
        );
        H5F.setup(document.getElementById('add-comment'));
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
                time: new Date().getTime()
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