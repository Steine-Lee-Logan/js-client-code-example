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
        if (this.settings.beforeShow && this.settings.beforeShow instanceof Function && !silent) {
            this.settings.beforeShow.apply();
        }

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

        if (this.settings.afterShow && this.settings.afterShow instanceof Function && !silent) {
            this.settings.afterShow.apply();
        }
    }

    hideModalWindow(silent) {
        if (this.settings.beforeHide && this.settings.beforeHide instanceof Function && !silent) {
            this.settings.beforeHide.apply();
        }

        this.$tpl.filter('.global-overlay').hide();

        if (this.settings.afterHide && this.settings.afterHide instanceof Function && !silent) {
            this.settings.afterHide.apply();
        }
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

    showGrid() {
        this.$tpl.filter('.grid').css({'opacity': '1'});
    }

    hideGrid() {
        this.$tpl.filter('.grid').css({ 'opacity': '0' });
    }
}

/*
 an example of the Switcher control initialization
 */
class Switcher extends Control {
    constructor(settings) {
        super(settings);
        const control = this;

        this.settings.type == settings.type || 'horizontal';
        this.settings.showTooltip = settings.showTooltip || false;
        this.settings.nodesList = settings.nodesList || { on: { value: 1, text: 'on' }, off: { value: 0, text: 'off' } };

        let callbacks = new Map();

        this.$tpl = $('<div class="switcher-container"></div>');

        $.each(this.settings.nodesList, function () {
            if (this.onActive && this.onActive instanceof Function) {
                callbacks.set(this.id + '_onActive', this.onActive);
            }
            
            control.$tpl.append(
                '<span data-value="' + this.value + '" data-text="' + (this.text || "") + '" class="list-node" id="' + (this.id || "") + '">' +
                (control.settings.showTooltip ? '   <span class="tooltip">' + this.text + ' => ' + this.value + '</snan>' : '') +
                '</span>'
            );
        });

        console.log(callbacks);

        let $listNodes = $(this.$tpl.find('.list-node'));
        $listNodes.click(function () {
            $listNodes.removeClass('selected');
            $(this).addClass('selected');


            if (callbacks.has($(this).attr('id') + '_onActive')) {
                callbacks.get($(this).attr('id') + '_onActive').apply();    
            }
        });

        this.renderer(this.$tpl);
    }

    /*inner tools begin*/

    /*inner tools end*/
}

/*
 an example of the Panel control initialization
 type: draggable/pinned
 position: top/left/bottom/right/{top:px, left:px}
 elemetns: {id, type (small/medium/big), onClick, image, status (active/inactive)}
*/
class Panel extends Control {
    constructor(settings) {
        super(settings);

        var control = this;

        this.$tpl = $(
            '<div class="panel">' +
            (this.settings.type === 'draggable' ? '<span class="draggable-area"></span>' : '') +  
            '</div>'
        );

        if (this.settings.position) {
            for (let i = 0; i < this.settings.position.length; i++) {
                this.$tpl.addClass(this.settings.position[i]);       
            }

        }

        var len = this.settings.elements.length;

        $.each(this.settings.elements, function (index) {
            try {
                if (!this.id) {
                    throw "ERROR: id is requared";
                }

                let $element = $('<span id="' + this.id + '" class="panel-element" style="background-image: url(' + this.image + ')"></span>');

                if (typeof this.type) {
                        $element.addClass(this.type);
                }

                if (typeof this.status) {
                    $element.addClass(this.status);
                }

                if (index == len - 1) {
                    $element.attr('style', 'margin-bottom: 5px;');
                }

                control.$tpl.append($element);

            } catch (err) {
                console.log(err);
                return false;
            }            
        });


        this.renderer(this.$tpl);
    }
}