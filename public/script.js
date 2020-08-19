$( document ).ready(function() {
    $('#fileInput').on('change',function() {
        var fileName = $(this).val().split('\\').pop();
        //replace the "Choose a file" label
        $(this).next('#fileLabel').text(fileName);
    })

    $('#fileSubmit').click(() => {
        let file = $('#fileInput').prop('files')[0];
        let size = $('#asciiSize').val();
        
        if (file){
            const formData = new FormData();
            formData.append('fileInput',file);
            formData.append('asciiSize',size);

            fetch('/fileUpload', {
                method: 'POST',
                body: formData
            })
            .catch(error => {
                console.error(error)
            })
        }
    })
});
