$(function () {
    var uiModalInitWorkspace = new ModalWindow({
        title: 'Initialize your workspace',
        mainContentHTML: "<p>some text <span>with</span> HTML tags</p>",
        beforeShow: function () { }, //your callback here
        afterShow: function () { }, //your callback here
        beforeHide: function () { }, //your callback here
        afterHide: function () { } //your callback here
    });

    uiModalInitWorkspace.showModalWindow();
});