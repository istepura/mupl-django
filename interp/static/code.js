$(function(){
    $("#send_button").button();
    $("#result").draggable({containment: "parent"});
    $("#result").tooltip({
        content: "You can drag this window around",
        close: function(ev, ui){
            $("#result").tooltip("option", "disabled", true );
            }
    });
});
