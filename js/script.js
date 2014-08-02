$(function () {

    var comments = [
        { id: "234", name: "Carabutur tristique", text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", score: 0, time: "23.06.2014 00:13"},
        { id: "2", parent: "234", name: "Carabutur tristique", text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", score: 4, time: "23.06.2014 00:13"},
        { id: "1", name: "Carabutur tristique", text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", score: -5, time: "23.06.2014 00:13"},
        { id: "45", parent: "2", name: "Carabutur tristique", text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", score: 0, time: "23.06.2014 00:13"}

    ];

    var Comment = Backbone.Model.extend({
        defaults: {
            avatar: "img/sprite.png"
        }
    });

    var Comments = Backbone.Collection.extend({
        model: Comment
    });

    var CommentView = Backbone.View.extend({
        tagName: 'div',
        className: 'comment-item',

        templates: {
            "comment": _.template($("#comment-template").html()),
            "hide": _.template($("#hide-template").html())
        },

        events: {
            "click .plus": "addScore",
            "click .minus": "decScore",
            "click .open-comment": "render"
        },

        addScore: function () {
            this.model.attributes.score+=1;
            this.$("#voting_"+this.model.attributes.id).html(this.model.attributes.score);
            this.checkVoting();
        },

        decScore: function () {
            this.model.attributes.score-=1;
            this.$("#voting_"+this.model.attributes.id).html(this.model.attributes.score);
            this.checkVoting();
        },

        checkVoting: function () {
            if (this.model.attributes.score < -10) {
                var hideTemplate = this.templates["hide"];
                $(this.el).html(hideTemplate(this.model.toJSON()));
            }
        },

        render: function () {
            var commentTemplate = this.templates["comment"];

            $(this.el).html(commentTemplate(this.model.toJSON()));
            return this;
        }
    });

    var CommentsView = Backbone.View.extend({
        el: $("#comments"),

        initialize: function () {
            this.collection = new Comments(comments);
            this.render();
        },

        render: function () {
            var that = this;
            _.each(this.collection.models, function (item) {
                that.renderComment(item);
            }, this);
        },

        renderComment: function (item) {
            var commentView = new CommentView({
                model: item
            });
            if (item.attributes.parent != undefined) {
                this.$('#comment_'+item.attributes.parent).append(commentView.render().el);
            }
            else {
                this.el.append(commentView.render().el);
            }
        }

    });

    var commentsView = new CommentsView();
});