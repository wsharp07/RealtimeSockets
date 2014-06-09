/**
 * Created by wsharp on 6/8/14.
 */
function initToastr(){
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "positionClass": 'toast-top-center',
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
}

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