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

        var uiToolsPanel = new Panel({
            renderTarget: '.workSpace',
            clazz: 'tools-panel',
            type: 'draggable',
            position: ['top', 'right'],
            elements: [
                {
                    id: 'square',
                    type: 'small',
                    onClick: function () {
                        console.log(this);
                    },
                    image: 'url',
                    status: 'active'
                },
                {
                    id: 'triangle',
                    type: 'small',
                    onClick: function () {
                        console.log(this);
                    },
                    image: 'url',
                    status: 'active'
                },
                {
                    id: 'circle',
                    type: 'medium',
                    onClick: function () {
                        console.log(this);
                    },
                    image: 'url',
                    status: 'active'
                },
                {
                    id: 'rhombus',
                    type: "big",
                    onClick: function () {
                        console.log(this);
                    },
                    image: 'url',
                    status: 'active'
                },
                {
                    id: 'parallelogram',
                    type: 'medium',
                    onClick: function () {
                        console.log(this);
                    },
                    image: 'url',
                    status: 'active'
                }, 
                {
                    id: 'polygon-type-1',
                    type: 'small',
                    onClick: function () {
                        console.log(this);
                    },
                    image: 'url',
                    status: 'active'
                },
                {
                    id: 'polygon-type-2',
                    type: 'small',
                    onClick: function () {
                        console.log(this);
                    },
                    image: 'url',
                    status: 'active'
                },
                {
                    id: 'polygon-type-3',
                    type: 'big',
                    onClick: function () {
                        console.log(this);
                    },
                    image: 'url',
                    status: 'active'
                }
            ]
        });

        //uiModalInitWorkspace.showModalWindow();
    }
}

$(function () {
    let myApp = new App({});
});