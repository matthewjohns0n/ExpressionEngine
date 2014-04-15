/*!
 * ExpressionEngine - by EllisLab
 *
 * @package		ExpressionEngine
 * @author		EllisLab Dev Team
 * @copyright	Copyright (c) 2003 - 2014, EllisLab, Inc.
 * @license		http://ellislab.com/expressionengine/user-guide/license.html
 * @link		http://ellislab.com
 * @since		Version 2.0
 * @filesource
 */
"use strict";function disable_fields(e){var t=$(".main_tab input, .main_tab textarea, .main_tab select, #submit_button"),i=$("#submit_button"),n=$("#holder").find("a");e?(disabled_fields=t.filter(":disabled"),t.attr("disabled",!0),i.addClass("disabled_field"),n.addClass("admin_mode"),$("#holder div.markItUp, #holder p.spellcheck").each(function(){$(this).before('<div class="cover" style="position:absolute;width:98%;height:50px;z-index:9999;"></div>').css({})}),$(".contents, .publish_field input, .publish_field textarea").css("-webkit-user-select","none")):(t.removeAttr("disabled"),i.removeClass("disabled_field"),n.removeClass("admin_mode"),$(".cover").remove(),disabled_fields.attr("disabled",!0),$(".contents, .publish_field input, .publish_field textarea").css("-webkit-user-select","auto"))}EE.publish=EE.publish||{},EE.publish.category_editor=function(){function e(){return+new Date}var t,i,n,a,s=[],l=$("<div />"),o=$('<div id="cat_modal_container" />').appendTo(l),r={},c={},u=EE.BASE+"&C=admin_content&M=category_editor&group_id=",d={},h=$("<div />");for(o.css({height:"100%",padding:"0 20px 0 0",overflow:"auto"}),l.dialog({autoOpen:!1,height:475,width:600,modal:!0,resizable:!1,title:EE.publish.lang.edit_category,open:function(){$(".ui-dialog-content").css("overflow","hidden"),$(".ui-dialog-titlebar").focus(),$("#cat_name").focus(),EE.publish.file_browser.category_edit_modal()}}),$(".edit_categories_link").each(function(){var e=this.href.substr(this.href.indexOf("=")+1),t=e.indexOf("&");-1!=t&&(e=e.substr(0,t)),$(this).data("gid",e),s.push(e)}),a=0;a<s.length;a++)r[s[a]]=$("#cat_group_container_"+[s[a]]),r[s[a]].data("gid",s[a]),c[s[a]]=$("#cat_group_container_"+[s[a]]).find(".cat_action_buttons").remove();t=function(t){r[t].text("loading...").load(u+t+"&timestamp="+e()+" .pageContents table",function(){i.call(r[t],r[t].html(),!1)})},i=function(e,n){var a=$(this),s=a.data("gid");if(e=$.trim(e),a.hasClass("edit_categories_link")&&(a=$("#cat_group_container_"+s)),"<"!==e.charAt(0)&&n)return t(s);a.closest(".cat_group_container").find("#refresh_categories").show();var r,u,d,_,p=$(e),f=p.find("form");if(f.length){o.html(p),r=o.find("input[type=submit]"),u=o.find("form"),d=u.find("#cat_name"),_=u.find("#cat_url_title"),d.keyup(function(){d.ee_url_title(_)});var g=function(e){var t=e||$(this),n=t.serialize(),s=t.attr("action");return $.ajax({url:s,type:"POST",data:n,dataType:"html",beforeSend:function(){h.html(EE.lang.loading)},success:function(e){if(e=$.trim(e),l.dialog("close"),"<"==e[0]){var t=$(e).find(".pageContents"),n=t.find("form");0==n.length&&h.html(t),t=t.wrap("<div />").parent(),i.call(a,t.html(),!0)}else i.call(a,e,!0)},error:function(e){e=$.parseJSON(e.responseText),l.html(e.error)}}),!1};u.submit(g);var b={};b[r.remove().attr("value")]={text:EE.publish.lang.update,click:function(){g(u)}},l.dialog("open"),l.dialog("option","buttons",b),l.one("dialogclose",function(){t(s)})}else c[s].clone().appendTo(a).show();return!1},n=function(t){t.preventDefault();var n=($(this).hide(),$(this).data("gid")),a=".pageContents";($(this).hasClass("edit_cat_order_trigger")||$(this).hasClass("edit_categories_link"))&&(a+=" table"),n||(n=$(this).closest(".cat_group_container").data("gid")),$(this).hasClass("edit_categories_link")&&(d[n]=r[n].find("input:checked").map(function(){return this.value}).toArray()),r[n].find("label").hide(),r[n].append(h.html(EE.lang.loading)),$.ajax({url:$(this).attr("href")+"&timestamp="+e()+a,dataType:"html",success:function(e){var t,s="";e=$.trim(e),"<"==e.charAt(0)&&(t=$(e).find(a),s=$("<div />").append(t).html(),0==t.find("form").length&&h.html(s)),i.call(r[n],s,!0)},error:function(e){e=$.parseJSON(e.responseText),h.text(e.error),i.call(r[n],e.error,!0)}})},$(".edit_categories_link").click(n),$(".cat_group_container a:not(.cats_done, .choose_file)").live("click",n),$(".cats_done").live("click",function(){var t=$(this).closest(".cat_group_container"),i=t.data("gid");return $(".edit_categories_link").each(function(){$(this).data("gid")==i&&$(this).show()}),t.text("loading...").load(EE.BASE+"&C=content_publish&M=category_actions&group_id="+t.data("gid")+"&timestamp="+e(),function(e){t.html($(e).html()),$.each(d[i],function(e,i){t.find("input[value="+i+"]").attr("checked","checked")})}),!1})},EE.publish.get_percentage_width=function(e){var t=/[0-9]+/gi,i=e.attr("data-width");return i&&t.test(i.slice(0,-1))?parseInt(i,10):10*Math.round(e.width()/e.parent().width()*10)},EE.publish.save_layout=function(){var e=0,t={},n={},a=0,s=!1,l="_tab_label",o=$("#tab_menu_tabs li.current").attr("id");if($(".main_tab").show(),$("#tab_menu_tabs a:not(.add_tab_link)").each(function(){if($(this).parent("li").attr("id")&&"menu_"==$(this).parent("li").attr("id").substring(0,5)){var i=$(this).parent("li").attr("id").substring(5),o=$(this).parent("li").attr("id").substring(5),r=$(this).parent("li").attr("title");a=0,visible=!0,$(this).parent("li").is(":visible")?(lay_name=i,t[e]={name:lay_name,fields:{}},t[e].fields[l]=r):(s=!0,visible=!1),$("#"+o).find(".publish_field").each(function(){var i,s=$(this),l=this.id.replace(/hold_field_/,""),o=EE.publish.get_percentage_width(s),r=$("#sub_hold_field_"+l+" .markItUp ul li:eq(2)");o>100&&(o=100),r="undefined"!==r.html()&&"none"!==r.css("display")?!0:!1,i={visible:"none"===$(this).css("display")||visible===!1?!1:!0,collapse:"none"===$("#sub_hold_field_"+l).css("display")?!0:!1,htmlbuttons:r,width:o+"%"},visible===!0?(i.index=a,t[e].fields[l]=i,a+=1):n[l]=i}),visible===!0&&e++}}),1==s){var r=0,c=t[0].fields;for(i in c)c[i].index>r&&(r=c[i].index);$.each(n,function(){this.index=++r}),jQuery.extend(t[0].fields,n)}EE.tab_focus(o.replace(/menu_/,"")),0===e?$.ee_notice(EE.publish.lang.tab_count_zero,{type:"error"}):0===$("#layout_groups_holder input:checked").length?$.ee_notice(EE.publish.lang.no_member_groups,{type:"error"}):$.ajax({type:"POST",dataType:"json",url:EE.BASE+"&C=content_publish&M=save_layout",data:"json_tab_layout="+encodeURIComponent(JSON.stringify(t))+"&"+$("#layout_groups_holder input").serialize()+"&channel_id="+EE.publish.channel_id,success:function(e){"success"===e.messageType?$.ee_notice(e.message,{type:"success"}):"failure"===e.messageType&&$.ee_notice(e.message,{type:"error"})}})},EE.publish.remove_layout=function(){if(0===$("#layout_groups_holder input:checked").length)return $.ee_notice(EE.publish.lang.no_member_groups,{type:"error"});var e="{}";return $.ajax({type:"POST",url:EE.BASE+"&C=content_publish&M=save_layout",data:"json_tab_layout="+e+"&"+$("#layout_groups_holder input").serialize()+"&channel_id="+EE.publish.channel_id+"&field_group="+EE.publish.field_group,success:function(){return $.ee_notice(EE.publish.lang.layout_removed+' <a href="javascript:location=location">'+EE.publish.lang.refresh_layout+"</a>",{duration:0,type:"success"}),!0}}),!1},EE.publish.change_preview_link=function(){$select=$("#layout_preview select"),$link=$("#layout_group_preview"),base=$link.attr("href").split("layout_preview")[0],$link.attr("href",base+"layout_preview="+$select.val()),$.ajax({url:EE.BASE+"&C=content_publish&M=preview_layout",type:"POST",dataType:"json",data:{member_group:$select.find("option:selected").text()}})},file_manager_context="",$(document).ready(function(){var e,t;if($("#layout_group_submit").click(function(){return EE.publish.save_layout(),!1}),$("#layout_group_remove").click(function(){return EE.publish.remove_layout(),!1}),$("#layout_preview select").change(function(){EE.publish.change_preview_link()}),$("a.reveal_formatting_buttons").click(function(){return $(this).parent().parent().children(".close_container").slideDown(),$(this).hide(),!1}),$("#write_mode_header .reveal_formatting_buttons").hide(),$("a.glossary_link").click(function(){return $(this).parent().siblings(".glossary_content").slideToggle("fast"),$(this).parent().siblings(".smileyContent .spellcheck_content").hide(),!1}),EE.publish.smileys===!0&&($("a.smiley_link").toggle(function(){$(this).parent().siblings(".smileyContent").slideDown("fast",function(){$(this).css("display","")})},function(){$(this).parent().siblings(".smileyContent").slideUp("fast")}),$(this).parent().siblings(".glossary_content, .spellcheck_content").hide(),$(".glossary_content a").click(function(){var e=$(this).closest(".publish_field"),t=e.attr("id").replace("hold_field_","field_id_");return e.find("[name="+t+"]").insertAtCursor($(this).attr("title")),!1})),EE.publish.autosave&&EE.publish.autosave.interval){var i=!1;t=function(){i||(i=!0,setTimeout(e,1e3*EE.publish.autosave.interval))},e=function(){var e,n=$("#tools:visible");return 1===n.length?void t():(e=$("#publishForm").serialize(),void $.ajax({type:"POST",dataType:"json",url:EE.BASE+"&C=content_publish&M=autosave",data:e,success:function(e){e.error?console.log(e.error):e.success?(e.autosave_entry_id&&$("input[name=autosave_entry_id]").val(e.autosave_entry_id),$("#autosave_notice").text(e.success)):console.log("Autosave Failed"),i=!1}}))};var n=$("textarea, input").not(":password,:checkbox,:radio,:submit,:button,:hidden"),a=$("select, :checkbox, :radio, :file");n.bind("keypress change",t),a.bind("change",t)}if(EE.publish.pages){var s=$("#pages__pages_uri"),l=EE.publish.pages.pagesUri;s.val()||s.val(l),s.focus(function(){this.value===l&&$(this).val("")}).blur(function(){""===this.value&&$(this).val(l)})}if(void 0!==EE.publish.markitup.fields&&$.each(EE.publish.markitup.fields,function(e){$("textarea[name="+e+"]").markItUp(mySettings)}),EE.publish.setup_writemode=function(){var e,t,i,n=$("#write_mode_writer"),a=$("#write_mode_textarea");a.markItUp(myWritemodeSettings),$(window).resize(function(){var e=$(this).height()-117;n.css("height",e+"px").find("textarea").css("height",e-67-17+"px")}).triggerHandler("resize"),$(".write_mode_trigger").overlay({closeOnEsc:!1,closeOnClick:!1,top:"center",target:"#write_mode_container",mask:{color:"#262626",loadSpeed:200,opacity:.85},onBeforeLoad:function(){var t=this.getTrigger()[0].id;i=$(t.match(/^id_\d+$/)?"textarea[name=field_"+t+"]":"#"+t.replace(/id_/,"")),e=i.getSelectedRange(),a.val(i.val())},onLoad:function(){a.focus(),a.createSelection(e.start,e.end);var t=this;t.getClosers().unbind("click").click(function(e){e.srcElement=this,t.close(e)})},onBeforeClose:function(e){{var n=$(e.srcElement).closest(".close");n.hasClass("publish_to_field")}n.hasClass("publish_to_field")&&(t=a.getSelectedRange(),i.val(a.val()),i.createSelection(t.start,t.end)),i.focus()}})},EE.publish.show_write_mode===!0&&EE.publish.setup_writemode(),$(".hide_field span").click(function(){var e=$(this).parent().parent().attr("id"),t=e.substr(11),i=$("#hold_field_"+t),n=$("#sub_hold_field_"+t);return"block"==n.css("display")?(n.slideUp(),i.find(".ui-resizable-handle").hide(),i.find(".field_collapse").attr("src",EE.THEME_URL+"images/field_collapse.png")):(n.slideDown(),i.find(".ui-resizable-handle").show(),i.find(".field_collapse").attr("src",EE.THEME_URL+"images/field_expand.png")),!1}),$(".close_upload_bar").toggle(function(){$(this).parent().children(":not(.close_upload_bar)").hide(),$(this).children("img").attr("src",EE.THEME_URL+"publish_plus.png")},function(){$(this).parent().children().show(),$(this).children("img").attr("src",EE.THEME_URL+"publish_minus.gif")}),$(".ping_toggle_all").toggle(function(){$("input.ping_toggle").each(function(){this.checked=!1})},function(){$("input.ping_toggle").each(function(){this.checked=!0})}),EE.user.can_edit_html_buttons&&($(".markItUp ul").append('<li class="btn_plus"><a title="'+EE.lang.add_new_html_button+'" href="'+EE.BASE+"&C=myaccount&M=html_buttons&id="+EE.user_id+'">+</a></li>'),$(".btn_plus a").click(function(){return confirm(EE.lang.confirm_exit,"")})),$(".markItUpHeader ul").prepend('<li class="close_formatting_buttons"><a href="#"><img width="10" height="10" src="'+EE.THEME_URL+'images/publish_minus.gif" alt="Close Formatting Buttons"/></a></li>'),$(".close_formatting_buttons a").toggle(function(){$(this).parent().parent().children(":not(.close_formatting_buttons)").hide(),$(this).parent().parent().css("height","13px"),$(this).children("img").attr("src",EE.THEME_URL+"images/publish_plus.png")},function(){$(this).parent().parent().children().show(),$(this).parent().parent().css("height","auto"),$(this).children("img").attr("src",EE.THEME_URL+"images/publish_minus.gif")}),$(".tab_menu li:first").addClass("current"),1==EE.publish.title_focus&&$("#publishForm input[name=title]").focus(),"new"==EE.publish.which&&$("#publishForm input[name=title]").bind("keyup blur",function(){$("#publishForm input[name=title]").ee_url_title($("#publishForm input[name=url_title]"))}),"n"==EE.publish.versioning_enabled?$("#revision_button").hide():$("#versioning_enabled").click(function(){$(this).attr("checked")?$("#revision_button").show():$("#revision_button").hide()}),EE.publish.category_editor(),EE.publish.hidden_fields){EE._hidden_fields=[];var o=$("input");$.each(EE.publish.hidden_fields,function(e){EE._hidden_fields.push(o.filter("[name="+e+"]")[0])}),$(EE._hidden_fields).after('<p class="hidden_blurb">This module field only shows in certain circumstances. This is a placeholder to let you define it in your layout.</p>')}});