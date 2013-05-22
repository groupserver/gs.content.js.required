jQuery.noConflict();function GSContentRequired(h,f){var b=null,d=null,g=null,a=null;
function e(){var k=0,l=null,j=true,m=true;a=new Array();for(k=0;k<g.length;k++){l=jQuery(g[k]);
j=(l.val()!="");if(!j){a.push(l)}m=m&&j}if(m){d.removeAttr("disabled")}else{d.attr("disabled","disabled")
}}function c(j){e()}function i(){b=jQuery(h);if((f==null)||(typeof f==="undefined")){d=b.find('input[type="submit"]')
}else{d=jQuery(f)}g=b.find(".required input, .required textarea");e();g.keyup(c)}i();
return{required_widgets:function(){return g},unfinished_widgets:function(){return unfinishedWidgets
}}};