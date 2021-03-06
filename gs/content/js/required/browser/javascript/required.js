'use strict';
// Disable the Submit button of a form if the required widgets are unset.
//
// Copyright © 2013, 2014, 2015 OnlineGroups.net and Contributors.
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

function GSContentRequiredInterlock(form, button) {

    var requiredWidgets = null, unfinished = null, intervalId = null,
        INTERVAL_TIME = 800;

    function check_required_widgets() {
        var i = 0,
            widget = null,
            widgetChecksOk = true,
            checksOk = true;

        unfinished = new Array();  // Clear the unfinished list
        for (i = 0; i < requiredWidgets.length; i++) {
            widget = jQuery(requiredWidgets[i]);
            // The following does not catch radio buttons, nor check
            // boxes. However, it does not make a lick of difference, as
            // both always have a default. (If you radio buttons fail to
            // have a default then you are doing it wrong.)
            widgetChecksOk = (widget.val() != '');
            if (!widgetChecksOk) {  // That is a "not", for those at home
                unfinished.push(widget);
            }
            checksOk = checksOk && widgetChecksOk;
        }

        if (checksOk) {
            enable();
        } else {
            button.attr('disabled', 'disabled');
            if (!intervalId) { // That is a "not", for those at home
                intervalId = setInterval(check, INTERVAL_TIME);
            }
        }
    } // check_required_widgets

    function enable() {
        button.removeAttr('disabled');
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    } // enable

    function check(event) {
        check_required_widgets();
    } // check

    function i_hate_chrome(event) {
        // Check if the required-widgets that Chrome has autofilled is
        // the same length of the required widgets.
        // http://stackoverflow.com/questions/11708092/detecting-browser-autofill
        var required = null, autofilledRequired = null;
        required = document.querySelectorAll('.required input');
        autofilledRequired = document.querySelectorAll(
            '.required input:-webkit-autofill');
        if (required.length == autofilledRequired.length) {
            enable();
        }
    } // i_hate_chrome

    function init() {
        if ((button === null) || (typeof button === 'undefined')) {
            // If the button has not been passed to us, set the default to
            // be the Submit button.
            button = form.find('input[type="submit"]');
        }

        requiredWidgets = form.find('.required input, .required textarea');
        check_required_widgets();
        requiredWidgets
            .keyup(check)
            .on('paste', check);
        try {
            if (document.querySelectorAll('input:-webkit-autofill')) {
                setTimeout(i_hate_chrome, INTERVAL_TIME);
            }
        } catch (e) {
            // Not Google Chrome
        }
    } // init
    init(); // Note the automatic execution

    return {
        required_widgets: function() {return requiredWidgets;},
        unfinished_widgets: function() {return unfinished;}
    };
} // GSContentRequiredInterlock

function GSContentRequired(formId, buttonId) {
    var form = null, button = null;

    function init() {
        form = jQuery(formId);

        if ((buttonId !== null) && (typeof buttonId !== 'undefined')) {
            button = jQuery(buttonId);
        }
    } // init
    init(); // Note the automatic execution

    return GSContentRequiredInterlock(form, button);
} // GSContentRequired

jQuery(window).load(function() {
    var form = null, buttonId = null, button = null, required = null;

    form = jQuery('form.gs-content-js-required');
    if (form.is('*')) {
        buttonId = form.attr('data-required-buttons');
        if (typeof buttonId !== 'undefined') {
            button = jQuery(buttonId);
        }
        required = GSContentRequiredInterlock(form, button);
    }
});
