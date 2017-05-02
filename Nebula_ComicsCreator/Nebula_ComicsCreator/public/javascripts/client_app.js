class App {
    constructor(settings) {
        const app = this;
        this.$tpl = $('<div class="workSpace"></div >');

        this.init();
    }

    renderer(target) {
        let $target = $(target || 'body'); 

        $target.append(this.$tpl);
    }

    init() {
        this.renderer();
        
        let uiModalInitWorkspace = new ModalWindow({
            title: 'Initialize your workspace',
            mainContentHTML: "<p>some text <span>with</span> HTML tags</p>",
            beforeShow: function () { }, //your callback here
            afterShow: function () { }, //your callback here
            beforeHide: function () { }, //your callback here
            afterHide: function () { } //your callback here
        });

        let uiLinedPaper = new LinedPaper({ renderTarget: '.workSpace' }); 

        var uiSwitcher = new Switcher({
            renderTarget: '.workSpace',
            showTooltip: false,
            nodesList: {
                on: {
                    id: 'on',
                    value: 1,
                    text: 'on',
                    onActive: function () { uiLinedPaper.showGrid(); },
                    onDisactive: function () { } 
                },
                off: {
                    id: 'off',
                    value: 0,
                    text: 'off',
                    onActive: function () { uiLinedPaper.hideGrid(); },
                    onDisactive: function () { } 
                }
            }
        });

        //uiModalInitWorkspace.showModalWindow();
    }
}

$(function () {
    let myApp = new App({});
});