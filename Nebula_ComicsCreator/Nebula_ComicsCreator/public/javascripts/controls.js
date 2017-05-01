/*the base Control class which contain the most common logic*/
class Control {
    constructor(settings) {
        this.settings = settings;
    }

    renderer($tpl) {
        let $target = $(this.settings.renderTarget || "body");
        $tpl.addClass("control");

        if (this.settings.clazz) {
            $tpl.addClass(this.settings.clazz);
        }

        console.log($tpl);

        $target.append($tpl);
    }
}

/*
an example of the ModalWindow control initialization
var uiModalWindow = new ModalWindow({
    target: ".dom-node", //the DOM node, where you want to insert this control,
    title: "your title",
    mainContentText: "some text without html tags",
    mainContentHTML: "<p>some text <span>with</span> HTML tags</p>",
    beforeShow: function () {  }, //your callback here
    afterShow: function () {  }, //your callback here
    beforeHide: function () {  }, //your callback here
    afterHide: function () {  } //your callback here
});

usable methods
showModalWindow(silent), //showing modal window. If calling with silent === true, beforeShow and afterShow callbacks will be ignored
hideModalWindow(silent) //hiding modal window. If calling with silent === true, beforeHide and afterHide callbacks will be ignored
*/
const recalcWrapperPosition = Symbol('recalcWrapperPosition');
class ModalWindow extends Control {
    constructor(settings) {
        super(settings);
        const control = this;

        this.$tpl = $(
            '<div class="global-overlay">' +
            '   <div class="transparent-bg"></div>' +
            '   <div class="content-wrapper">' +
            '       <span class="close-btn"></span>' +
            '       <div class="title-block"></div>' +
            '       <div class="main-content-block"></div>' +
            '   </div>' +
            '</div>'
        );

        this.renderer(this.$tpl);
        this.$tpl.find('.close-btn').click(function () { control.hideModalWindow(); });
        $(window).resize(function () { control[recalcWrapperPosition](); });
    }

    /*inner tools begin*/
    [recalcWrapperPosition]() {
        let HTMLContentWrapper = this.$tpl.find('.content-wrapper');

        this.$tpl.find('.content-wrapper').css({
            'opacity': 1,
            'top': ($(this.settings.target || window).height() / 2) - (HTMLContentWrapper.outerHeight() / 2) + 'px',
            'left': ($(this.settings.target || window).width() / 2) - (HTMLContentWrapper.outerWidth() / 2) + 'px'
        });
    };
    /*inner tools end*/

    showModalWindow(data, silent) {
        if (this.settings.beforeShow && this.settings.beforeShow instanceof Function && !silent) { this.settings.beforeShow.apply(); }

        let content = this.settings;

        if (typeof data === 'object') {
            for (let key in data) {
                content[key] = data[key]; 
            }
        }

        if (typeof content === 'object') {
            if (content.title) {
                this.$tpl.find('.title-block').text(content.title);
            }

            if (content.mainContentText) {
                this.$tpl.find('.main-content-block').text(content.mainContentText);
            } else if (content.mainContentHTML) {
                this.$tpl.find('.main-content-block').html(content.mainContentHTML);
            }

            this.$tpl.filter('.global-overlay').show();
            this[recalcWrapperPosition]();
        }

        if (this.settings.afterShow && this.settings.afterShow instanceof Function && !silent) { this.settings.afterShow.apply(); }
    }

    hideModalWindow(silent) {
        if (this.settings.beforeHide && this.settings.beforeHide instanceof Function && !silent) { this.settings.beforeHide.apply(); }
        this.$tpl.filter('.global-overlay').hide();
        if (this.settings.afterHide && this.settings.afterHide instanceof Function && !silent) { this.settings.afterHide.apply(); }
    }
}

/*
 an example of the LinedPaper control initialization
 */
class LinedPaper extends Control {
    constructor(settings) {
        super(settings);
        const control = this;

        this.$tpl = $('<div class="grid"></div>');
        this.renderer(this.$tpl);
    }
}