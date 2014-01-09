$(function(){
    $("#send_button").button();
    $("#result").draggable({containment: "parent"});
    $("#result").tooltip({
        content: "You can drag this window around",
        position: {
             my: "center bottom-20",
             at: "center top"
         },
        close: function(ev, ui){
            $("#result").tooltip("option", "disabled", true );
            }
    });
});
