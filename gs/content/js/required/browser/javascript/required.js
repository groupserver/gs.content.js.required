jQuery.noConflict();

function GSContentRequired (formId, buttonId) {

    var form = null,
        button = null,
        requiredWidgets = null,
        unfinished = null;

    function check_required_widgets() {
        var i = 0, 
            widget = null,
            widgetChecksOk = true,
            checksOk = true;

        unfinished = new Array();  // Clear the unfinished list
        for ( i=0; i < requiredWidgets.length; i++ ) {
            widget = jQuery(requiredWidgets[i]);
            // The following does not catch radio buttons, nor check 
            // boxes. However, it does not make a lick of difference, as
            // both always have a default. (If you radio buttons fail to
            // have a default then you are doing it wrong.)
            widgetChecksOk = ( widget.val() != '' );
            if ( !widgetChecksOk ) {
                unfinished.push(widget);
            }
            checksOk = checksOk && widgetChecksOk;
        }

        if ( checksOk ) {
            button.removeAttr("disabled");
        } else {
            button.attr("disabled", "disabled");
        }
    } // check_required_widgets

    function check(event) {
        check_required_widgets();
    } // check

    function init () {
        form = jQuery(formId);
        
        if ((buttonId == null) || (typeof buttonId === "undefined")) {
            // If the button has not been passed to us, set the default to
            // be the Submit button.
            button = form.find('input[type="submit"]');
        } else {
            button = jQuery(buttonId);
        }
        
        requiredWidgets = form.find('.required input, .required textarea');
        check_required_widgets();
        requiredWidgets.keyup(check);
    } // init
    init(); // Note the automatic execution

    return {
        required_widgets: function () {return requiredWidgets;},
        unfinished_widgets: function () {return unfinishedWidgets;}
    }
} // GSContentRequired
