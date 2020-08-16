$( document ).ready(function() {
    $('#fileInput').on('change',() => {
        var fileName = $(this).val();
        console.log(fileName)
        //replace the "Choose a file" label
        $(this).next('#fileLabel').text(fileName);
    })
});
