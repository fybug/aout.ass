aout_ass.modifyMode("app", (mode) => {
    mode.mode = "defer";
    return mode;
}).modifyPage("main", (page) => {
    console.debug(page.chunk);
    return page;
});