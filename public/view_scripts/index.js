/**
 * Created by wsharp on 6/8/14.
 */
function parseLog(log) {
    var html = "";
    html += moment(log.Date).format('MMM DD hh:mm:ssa') + " ";
    html += '<a class="log-machine" href="#">' + log.Machine + '</a> ';
    html += '<a class="log-sender" href="#">' + log.Name + '</a> ';
    html += '<span class="log-level">[' + log.LogLevel.Name.toUpperCase() + ']</span> ';
    html += log.Message;

    return html;
}

function addLog(log) {
    try {
        $("#messageContainer").append('<div class="row"><div class="col-md-12">' + parseLog(log) + '</div></div>');
    }
    catch (err) {
        console.log(err);
    }
}

function setSearchText(text, predicate){
    // json format text
    text = '"' + text + '"';

    if(predicate){
        $("#txtSearch").val(predicate + ": " + text);
    }
    else{
        $("#txtSearch").val(text);
    }
}