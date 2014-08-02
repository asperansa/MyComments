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
        }/*,

        validate: function(attrs) {
            if (attrs.name)
        }*/

    });

    var Comments = Backbone.Collection.extend({
        model: Comment
    });

    function markdown (text) {
        var parser = new Markdown.Parser();
        var html = parser.makeHtml(text);

        return html;
    }

    var CommentView = Backbone.View.extend({
        tagName: 'div',
        className: 'comment-item',

        templates: {
            "comment": _.template($("#comment-template").html()),
            "hide": _.template($("#hide-template").html()),
            "add": _.template($("#add-template").html()),
            "show": _.template($("#show-template").html())
        },

        events: {
            "click .plus": "addScore",
            "click .minus": "decScore",
            "click .open-comment": "render",
            "click .answer": "answer",
            "click .button_blue": "save",
            "click .hide-comment": "hide",
            "click .show-comment": "show"
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

        answer: function () {
            var addTemplate = this.templates["add"];
            $(this.el).append(addTemplate(this.model.toJSON()));
        },

        save: function () {
            if ($(this.el).find('.error').length <= 0 & $(this.el).find('.required').length <= 0)
            {


                var comment = new Comment();
                comment.set({
                    id: this.model.attributes.id+100,
                    parent: this.model.attributes.id,
                    name: $(this.el).find("input#name").val(),
                    text: markdown($(this.el).find("textarea").val()),
                    score: 0,
                    time: '02.08.2014 22:54'
                });
            }
            else
            {
                $('.comments-form').addClass('invalid');
                $(this.el).find('.error-message').html('Не все поля заполнены<br/>');
                if ($(this.el).find("input#name").hasClass('error'))
                    $(this.el).find('.error-message').append('Неверное имя<br/>');
                if ($(this.el).find("input#e-mail").hasClass('error'))
                    $(this.el).find('.error-message').append('Неверный E-mail<br/>');
                return;
            }
            var commentView = new CommentView({
                model: comment
            });
            if (comment.attributes.parent != undefined) {
                this.$('#comment_'+comment.attributes.parent).after(commentView.render().el);
            }
            else {
                this.el.append(commentView.render().el);
            }
            $(this.el).find('.comments-form').hide();
        },

        hide: function () {
            var hideTemplate = this.templates["show"];
            $(this.el).append(hideTemplate(this.model.toJSON()));
            this.$('#comment_'+this.model.attributes.id).hide();
        },

        show: function () {
            commentsView.renderComment(this.model);
            $('.show-comment').hide();
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
                this.$('#comment_'+item.attributes.parent).after(commentView.render().el);
            }
            else {
                this.el.append(commentView.render().el);
            }
        }

    });

    var commentsView = new CommentsView();

});