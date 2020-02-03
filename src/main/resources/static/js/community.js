/*
* 基础方法
* */
function commentToTarget(targetId, Type, content) {
    if (!content) {
        alert("内容不能为空");
        return;
    }
    $.ajax({
        type: "post",
        url: "/comment",
        dataType: "json",
        contentType: 'application/json',
        data: JSON.stringify({
            "parentId": targetId,
            "content": content,
            "type": Type
        }),
        success: function (res) {
            if (res.code == 200) {
                window.location.reload();
            } else {
                if (res.code == 2003) {
                    var isAccept = confirm(res.message);
                    if (isAccept) {
                        window.open("https://github.com/login/oauth/authorize?client_id=4037e44789422a18ebb3&redirect_uri=http://127.0.0.1:8887/callback&scope=user&state=1")
                        window.localStorage.setItem("closable", true)
                    }
                } else {
                    alert(res.message)
                }

            }
            console.log(res)
        }
    });

}


/*
* 提交回复
* */
function post() {
    var questionId = $("#question_id").val();
    var questionContent = $("#comment_content").val();
    commentToTarget(questionId, 1, questionContent);
}


function comment(e) {
    console.log(e);
    var commentId = e.dataset.id;
    var commentContent = $("#input-" + commentId).val();
    console.log(commentContent, "xxxxxxxxxxxxx");
    commentToTarget(commentId, 2, commentContent)


}


function collapseComments(e) {
    var id = e.getAttribute("data-id");
    var comments = $("#comment-" + id);
    // 获取一下二级评论的展开状态
    var collapse = e.getAttribute("data-collapse");
    if (collapse) {
        // 折叠二级评论
        comments.removeClass("in");
        e.removeAttribute("data-collapse");
        e.classList.remove("active");
    } else {
        var subCommentContainer = $("#comment-" + id);
        if (subCommentContainer.children().length != 1) {
            //展开二级评论
            comments.addClass("in");
            // 标记二级评论展开状态
            e.setAttribute("data-collapse", "in");
            e.classList.add("active");
        } else {
            $.getJSON("/comment/" + id, function (data) {
                $.each(data.data.reverse(), function (index, comment) {
                    var mediaLeftElement = $("<div/>", {
                        "class": "media-left"
                    }).append($("<img/>", {
                        "class": "media-object img-rounded",
                        "src": comment.user.avatarUrl
                    }));

                    var mediaBodyElement = $("<div/>", {
                        "class": "media-body"
                    }).append($("<h5/>", {
                        "class": "media-heading",
                        "html": comment.user.name
                    })).append($("<div/>", {
                        "html": comment.content
                    })).append($("<div/>", {
                        "class": "menu"
                    }).append($("<span/>", {
                        "class": "pull-right",
                        "html": moment(comment.gmtCreate).format('YYYY-MM-DD'),
                    })));

                    var mediaElement = $("<div/>", {
                        "class": "media"
                    }).append(mediaLeftElement).append(mediaBodyElement);

                    var commentElement = $("<div/>", {
                        "class": "col-lg-12 col-md-12 col-sm-12 col-xs-12 comments"
                    }).append(mediaElement);

                    subCommentContainer.prepend(commentElement);
                });
                //展开二级评论
                comments.addClass("in");
                // 标记二级评论展开状态
                e.setAttribute("data-collapse", "in");
                e.classList.add("active");
            });
        }
    }
}


function selectTag(e) {
    let tag = e.dataset.tag;
    let previous = $("#tag").val();
    if (previous) {
        let arr1 = previous.split(',');
        if (arr1.includes(tag)) {
            return
        }
        $("#tag").val(previous + "," + tag)
    } else {
        $("#tag").val(tag)
    }

}


function showSelectTag() {
    $("#select-tag").show();
}