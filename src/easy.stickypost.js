(function($) {

  var _stickyPostCounter = 1;
  var _idPrefix = 'easy_stickypost_';
  var _stickyPostCookieName = "easy_stickypost";
  var _currentPath = window.location.href;
  var settings = {};

  $.fn.stickypost = function( options ) {
    settings = $.extend({
         cached: true,
         tooltip: "Click here to remove this forever.",
         pin: "<i class='fa fa-times'></i>",
         color: 'default',
     }, options );
     var selectors = $(this).find("[data-stickyid]");
    initStickyPost(selectors);
    };

    function initStickyPost(selector) {
        selector.each(function (i, obj) {
            var oriDom = obj;
            var stickId = $(obj).data('stickyid');
            var noteId = "";
            if (typeof (stickId) == 'undefined' || stickId == "") {
                noteId = _idPrefix + _stickyPostCounter++;
            }
            else {
                noteId = _idPrefix + stickId;
            }
            var shoudHide = settings.cached && checkHasPreviouslyClosed(noteId);
            if (shoudHide == true) {
                $(obj).hide();
            }
            else {
                var msg = $(obj).html();
                var workingDom = getWorkingStickyPost(noteId, msg);
                $(obj).replaceWith(workingDom);
            }

        });
    }

    function checkHasPreviouslyClosed(nodeId) {
        var cookieValue = _getStickyPostCookie(_stickyPostCookieName);
        if (cookieValue != "") {
            var json = JSON.parse(cookieValue);
            if (typeof (json[_currentPath]) != 'undefined') {
                var currentPathJson = json[_currentPath];
                if (typeof (currentPathJson[nodeId]) !== 'undefined') {
                    return true;
                }
            }
        }
        return false;
    }


    function getWorkingStickyPost(noteId, msg) {
        var note = $("<div class='easy-stickypost'></div>");
        $(note).attr('id', noteId);
        if(settings.color)
        {
          $(note).addClass(settings.color);
        }

        var text = $("<div class='easy-stickypost-label'></div>");
        $(text).html(msg);

        var eraser = $("<div class='easy-stickypost-delete'>" + settings.pin + "</div>");
        $(eraser).click(function () { _removeStickypost(this); });
        $(eraser).attr('title', settings.tooltip);

        $(note).append(eraser).append(text);
        return note[0];
    }

    function _removeStickypost(note) {
        var noteId = $(note).parent('.easy-stickypost')[0].id;
        _saveStickyPostCookie(noteId, '1');
        $(note).parent().hide();
    }

    function _saveStickyPostCookie(noteId) {
        var d = new Date();
        var defaultDays = 9999;
        d.setTime(d.getTime() + (defaultDays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        var paths = "path=/";

        //Reading Existing Cookies, parse as JSON and update as JSON and store it back as JSON String.
        var cookieValue = _getStickyPostCookie(_stickyPostCookieName);
        var json = cookieValue == "" ? {} : JSON.parse(cookieValue);
        var currentPathJson = typeof (json[_currentPath]) == "undefined" ? {} : json[_currentPath];
        currentPathJson[noteId] = 1;
        json[_currentPath] = currentPathJson;
        var stringJson = JSON.stringify(json);

        document.cookie = _stickyPostCookieName + "=" + stringJson + "; " + expires + "; " + paths;
    }

    function _getStickyPostCookie(cookieName) {
        var name = cookieName + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
    }

    function _findStickyPostState(json, noteId) {
        var pathCookie = json[_currentPath];
        if (typeof (pathCookie) != 'undefined') {
            return pathCookie[noteId];
        }
    }

    function _autoSizeStickPost(id) {
        var stickWidth = 0;
        $(id).find('div').each(function () {
            stickWidth += Math.ceil(this.getBoundingClientRect().width);
        });
        $(id).width(stickWidth);
    }


}(jQuery));
