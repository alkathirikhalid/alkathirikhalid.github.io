/** Copyright 2023 Amazon.com Inc. or its affiliates. All Rights Reserved. **/
define(["jquery","jquery-idle-timer","jquery-cookie","purl","bootstrap","jquery-timepicker","jqueryHelper","knockoutjs","bootstrapGrid","bootstrap-markdown","customTextbox","windowHelper","bootstrapMarkdownHelper","languageCodes","misc","argumentNullError","browserHelper","resourceManager","navigationHighlighter","stringHelper"],function($,e,t,i,o,n,a,r,l,s,c,u,d,g,h,p,m,f,k,w){var v={textInputsDefaultMaxLength:500,sessionTimerCookieName:null,sessionTimedOutPageRelativePath:"/Account/SessionTimedOut",loginPageRelativePath:"/Account/LogOnOptions",getDOMRefs:function(){var e;v.goToTopButton=a.select(".kiku-go-to-top"),v.divMainBody=$("#divMainBody"),v.mainFooter=$("#kiku-main-footer"),v.divBrowserInstructions=$("#divBrowserInstructions"),v.hiddenAntiForgeryToken=$("#hiddenAntiForgeryToken"),(e=$("#KIKU_SESSION_TIMER_COOKIE_NAME"))&&!w.isStringNullOrWhiteSpace(e.val())&&(v.sessionTimerCookieName=e.val()),(e=$("#KIKU_SESSIONTIMEOUT_PAGE_URL"))&&!w.isStringNullOrWhiteSpace(e.val())&&(v.sessionTimedOutPageRelativePath=e.val()),(e=$("#KIKU_LOGIN_PAGE_URL"))&&!w.isStringNullOrWhiteSpace(e.val())&&(v.loginPageRelativePath=e.val())},initialize:function(e){if(!e)throw p.createInstance("languageOptions");$.ajaxSetup({cache:!1,headers:{RequestVerificationToken:this.hiddenAntiForgeryToken.val(),contentType:"application/json; charset=utf-8"}}),window.addEventListener("popstate",function(e){1<window.history.length&&window.location.reload(!0)}),$.fn.button&&$.fn.button.noConflict&&$.fn.button.noConflict(),f.getResourceStrings(e.getCurrentLanguageCode()),e.initialize(e.lblSelectedLanguage,e.divSelectedLanguage,e.divLanguageOptions),e.setDefaultLanguage(e.lblSelectedLanguage,e.divLanguageOptions),(!1===m.areCookiesEnabledInBrowser()?this.divBrowserInstructions:this.divMainBody).show(),v.enableSmoothScrolling(),v.setWindowScroll(),v.initializeGoToTopButton(),v.initializeNavBar(),v.initializePreventBubbleBinding(),v.initializeAllMarkdownEditors(),v.initializeTimepickers(),v.initializeTextInputs(),v.hookLinkClicks(),c.initializeAll(),l.initializeAll(),v.adjustFooter(),v.initializeIdleTimer(),$(window).resize(v.adjustFooter)},adjustFooter:function(){v.mainFooter&&(v.mainFooter.show(),$("body").css("margin-bottom",v.mainFooter.height()+10))},enableSmoothScrolling:function(){a.select("a[href^=#]:not([href=#]):not([role='presentation'])").click(function(){v.onLinkClicked(this)})},onLinkClicked:function(e){var t,i;if(h.validateObjectParameter(e,"targetElement"),(t=u.getLocationObject()).pathname.replace(/^\//,"")===e.pathname.replace(/^\//,"")&&t.hostname===e.hostname&&((i=(i=$(e.hash)).length?i:$("[name="+e.hash.slice(1)+"]")).hasClass("collapsed")&&i.click(),e.hash.slice(1)))return $("html,body").animate({scrollTop:i.offset().top},1e3),!0},hookLinkClicks:function(){$(document).on("click",".ko-markdown a, #divDialogBoxHtmlContent a",function(e){e=$(e.currentTarget);e.attr("target")||($.url(e.prop("href")).attr("host").toLowerCase()===window.location.hostname.toLowerCase()?e.removeAttr("target"):e.attr("target","_blank"))})},setWindowScroll:function(){a.getWindow().scroll(function(){v.onWindowScroll($(this))})},onWindowScroll:function(e){h.validateObjectParameter(e),30<e.scrollTop()?v.goToTopButton.show():v.goToTopButton.hide()},initializeGoToTopButton:function(){v.goToTopButton.click(function(){a.scrollToTop()})},initializeNavBar:function(){$(".navbar .dropdown > a").click(function(){u.getLocationObject().href=this.href})},initializePreventBubbleBinding:function(){r.bindingHandlers.preventBubble={init:function(e,t){t=r.utils.unwrapObservable(t());r.utils.registerEventHandler(e,t,function(e){e.cancelBubble=!0,e.stopPropagation&&e.stopPropagation()})}}},initializeAllMarkdownEditors:function(){a.select("textarea[data-provide='markdown']").each(function(){v.initializeMarkdownEditor($(this))})},initializeMarkdownEditor:function(e){var t=a.getCurrentCultureCode();e.markdown({language:g.getjQueryLanguageCode(t)}),d.initialize(e.closest(".md-editor"))},initializeTimepickers:function(){a.select("input.timepicker").timepicker({timeFormat:"H:i"})},initializeTextInputs:function(){a.select("input[type='text']").each(function(){this.getAttribute("maxlength")||(this.maxLength=+v.textInputsDefaultMaxLength)})},initializeIdleTimer:function(){v.sessionTimedOutPageRelativePath.toLowerCase()!==u.getLocationObject().pathname.toLowerCase()&&v.loginPageRelativePath.toLowerCase()!==u.getLocationObject().pathname.toLowerCase()&&a.isAuthenticatedUser()&&($.idleTimer(6e4),$(document).bind("idle.idleTimer",function(){var e;a.isAuthenticatedUser()&&(e=u.getLocationObject(),v.sessionTimedOutPageRelativePath.toLowerCase()===e.pathname.toLowerCase()||v.loginPageRelativePath.toLowerCase()===e.pathname.toLowerCase()?$.idleTimer("destroy"):($.cookie(v.sessionTimerCookieName)||u.open(v.sessionTimedOutPageRelativePath+"?returnUrl="+encodeURIComponent(e.href)),$(document).idleTimer("reset")))}))}};return v});