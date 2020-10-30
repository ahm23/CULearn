$(document).ready(function () {
    if (!$('#installed_cuLearn_new').length)
        fetchInject([
            'https://cdn.jsdelivr.net/gh/ahm23/CULearn@3.0.1b/installer/installerBeta.js'
        ]);
});