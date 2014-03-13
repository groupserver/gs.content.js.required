// Copyright © 2013, 2014 OnlineGroups.net and Contributors.
// All Rights Reserved.
//
// This software is subject to the provisions of the Zope Public License,
// Version 2.1 (ZPL). http://groupserver.org/downloads/license/
//
// THIS SOFTWARE IS PROVIDED "AS IS" AND ANY AND ALL EXPRESS OR IMPLIED
// WARRANTIES ARE DISCLAIMED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
// WARRANTIES OF TITLE, MERCHANTABILITY, AGAINST INFRINGEMENT, AND
// FITNESS FOR A PARTICULAR PURPOSE.
jQuery.noConflict();

function GSContentRequiredInterlock (form, button) {

    var requiredWidgets = null,
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
        if ((button === null) || (typeof button === "undefined")) {
            // If the button has not been passed to us, set the default to
            // be the Submit button.
            button = form.find('input[type="submit"]');
        } 
        
        requiredWidgets = form.find('.required input, .required textarea');
        check_required_widgets();
        requiredWidgets.keyup(check).on('paste', check);
    } // init
    init(); // Note the automatic execution

    return {
        required_widgets: function () {return requiredWidgets;},
        unfinished_widgets: function () {return unfinishedWidgets;}
    };
} // GSContentRequiredInterlock

function GSContentRequired (formId, buttonId) {
    var form = null
        button = null;

    function init () {
        form = jQuery(formId);
        
        if ((buttonId !== null) && (typeof buttonId !== "undefined")) {
            button = jQuery(buttonId);
        }
    } // init
    init(); // Note the automatic execution

    return GSContentRequiredInterlock(form, button);
} // GSContentRequired

jQuery(window).load(function () {
    var form=null, buttonId=null, button=null, required=null;

    form = jQuery('form.gs-content-js-required');
    if ( form.is('*') ) {
        buttonId = form.attr('data-required-buttons');
        if ( typeof buttonId !== 'undefined' ) {
            button = jQuery(buttonId);
        }
        required = GSContentRequiredInterlock(form, button);
    }
});
