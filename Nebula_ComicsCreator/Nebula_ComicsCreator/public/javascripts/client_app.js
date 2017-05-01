class App {
    constructor(settings) {
        this.settings = settings;
        this.$tpl = $('<canvas id="root"/>').width(window.innerWidth).height(window.innerHeight);

        this.init();
    }

    renderer(target) {
        let $target = $(target || 'body'); 

        $target.append(this.$tpl);
    }

    init() {
        this.renderer();

        var uiModalInitWorkspace = new ModalWindow({
            title: 'Initialize your workspace',
            mainContentHTML: "<p>some text <span>with</span> HTML tags</p>",
            beforeShow: function () { }, //your callback here
            afterShow: function () { }, //your callback here
            beforeHide: function () { }, //your callback here
            afterHide: function () { } //your callback here
        });

        uiModalInitWorkspace.showModalWindow();
    }
}

$(function () {
    var myApp = new App({});
});