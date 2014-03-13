"use strict";jQuery.noConflict();function GSContentRequiredInterlock(d,c){var b=null,g=null;
function e(){var j=0,k=null,h=true,l=true;g=new Array();for(j=0;j<b.length;j++){k=jQuery(b[j]);
h=(k.val()!="");if(!h){g.push(k)}l=l&&h}if(l){c.removeAttr("disabled")}else{c.attr("disabled","disabled")
}}function a(h){e()}function f(){if((c===null)||(typeof c==="undefined")){c=d.find('input[type="submit"]')
}b=d.find(".required input, .required textarea");e();b.keyup(a).on("paste",a)}f();
return{required_widgets:function(){return b},unfinished_widgets:function(){return unfinishedWidgets
}}}function GSContentRequired(d,a){var b=null;button=null;function c(){b=jQuery(d);
if((a!==null)&&(typeof a!=="undefined")){button=jQuery(a)}}c();return GSContentRequiredInterlock(b,button)
}jQuery(window).load(function(){var c=null,b=null,a=null,d=null;c=jQuery("form.gs-content-js-required");
if(c.is("*")){b=c.attr("data-required-buttons");if(typeof b!=="undefined"){a=jQuery(b)
}d=GSContentRequiredInterlock(c,a)}});