function post() {
    var questionId = $("#question_id").val();
    var questionContent = $("#comment_content").val();
    $.ajax({
        type: "post",
        url: "/comment",
        dataType: "json",
        contentType: 'application/json',
        data: JSON.stringify({
            "parentId": questionId,
            "content": questionContent,
            "type": 1
        }),
        success: function (res) {
            if (res.code == 200){
                $("#comment_section").hide()
            }else {
                alert(res.message)
            }
            console.log(res)
        }
    });
    console.log(questionId);
    console.log(questionContent);

}