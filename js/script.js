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
        template: $("#comment-template").html(),

        events: {
            "click .plus": "addScore",
            "click .minus": "decScore"
        },

        addScore: function () {
            this.model.attributes.score+=1;
            this.$("#voting_"+this.model.attributes.id).html(this.model.attributes.score);
        },

        decScore: function () {
            this.model.attributes.score-=1;
            this.$("#voting_"+this.model.attributes.id).html(this.model.attributes.score);
        },

        render: function () {
            var commentTemplate = _.template(this.template);

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