confload.runOf('ModeLoad', /** @param {global#ModeLoad} modeload */(modeload) => {
    modeload.publicMode('app_s', SourcePath + 'lib/js/style',"async");
    modeload.publicMode('modernizr', SourcePath + 'lib/js/INCL/modernizr');
    modeload.publicMode('app', SourcePath + 'lib/js/main', "defer");
    return 'PageLoad';
}).then((pageLoad) => {
    pageLoad.addPage(SourcePath + 'index.html', 'index');
});