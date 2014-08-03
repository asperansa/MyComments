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