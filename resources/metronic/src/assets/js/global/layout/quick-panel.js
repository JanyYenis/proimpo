"use strict";

var KTQuickPanel = function() {
    var panel;
    var notificationPanel;
    var logsPanel;
    var settingsPanel;
    // var content;

    var getContentHeight = function() {
        var height;
        var nav = KTUtil.find(panel, '.kt_quick_user');
        var content = KTUtil.find(panel, '.offcanvas-content');

        height = parseInt(KTUtil.getViewPort().height) - parseInt(KTUtil.actualHeight(nav)) - (2 * parseInt(KTUtil.css(nav, 'padding-top'))) - 10;

        return height;
    }

    var initOffcanvas = function() {
        let header = KTUtil.find(panel, '.offcanvas-header');
        let content = KTUtil.find(panel, '.offcanvas-content');

        new KTOffcanvas(panel, {
            overlay: true,
            baseClass: 'offcanvas',
            placement: 'right',
            closeBy: 'kt_quick_user_close',
            toggleBy: 'kt_quick_user_toggle'
        });

        KTUtil.scrollInit(content, {
            disableForMobile: true,
            resetHeightOnDestroy: true,
            handleWindowResize: true,
            height: function() {
                var height = parseInt(KTUtil.getViewPort().height);

                if (header) {
                    height = height - parseInt(KTUtil.actualHeight(header));
                    height = height - parseInt(KTUtil.css(header, 'marginTop'));
                    height = height - parseInt(KTUtil.css(header, 'marginBottom'));
                }

                if (content) {
                    height = height - parseInt(KTUtil.css(content, 'marginTop'));
                    height = height - parseInt(KTUtil.css(content, 'marginBottom'));
                }

                height = height - parseInt(KTUtil.css(panel, 'paddingTop'));
                height = height - parseInt(KTUtil.css(panel, 'paddingBottom'));

                height = height - 2;

                return height;
            }
        });
    }

    var initNotifications = function() {
        KTUtil.scrollInit(notificationPanel, {
            mobileNativeScroll: true,
            resetHeightOnDestroy: true,
            handleWindowResize: true,
            height: function() {
                return getContentHeight();
            }
        });
    }

    var initLogs = function() {
        KTUtil.scrollInit(logsPanel, {
            mobileNativeScroll: true,
            resetHeightOnDestroy: true,
            handleWindowResize: true,
            height: function() {
                return getContentHeight();
            }
        });
    }

    var initSettings = function() {
        KTUtil.scrollInit(settingsPanel, {
            mobileNativeScroll: true,
            resetHeightOnDestroy: true,
            handleWindowResize: true,
            height: function() {
                return getContentHeight();
            }
        });
    }

    var updatePerfectScrollbars = function() {
        $(panel).find('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            KTUtil.scrollUpdate(notificationPanel);
            KTUtil.scrollUpdate(logsPanel);
            KTUtil.scrollUpdate(settingsPanel);
        });
    }

    return {
        init: function() {
            panel = KTUtil.get('kt_quick_user');
            notificationPanel = KTUtil.get('kt_quick_panel_tab_notifications');
            logsPanel = KTUtil.get('kt_quick_panel_tab_logs');
            settingsPanel = KTUtil.get('kt_quick_panel_tab_settings');

            initOffcanvas();
            initNotifications();
            initLogs();
            initSettings();
            updatePerfectScrollbars();
        }
    };
}();

$(document).ready(function() {
    KTQuickPanel.init();
});