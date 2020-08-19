$( document ).ready(function() {
    $('#fileInput').on('change',function() {
        var fileName = $(this).val().split('\\').pop();
        //replace the "Choose a file" label
        $(this).next('#fileLabel').text(fileName);
    })
});
