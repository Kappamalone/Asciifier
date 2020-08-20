$( document ).ready(function() {

    //Changes text of label
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
            formData.append('fileInput',file,file.name);
            formData.append('asciiSize',size);

            imageRequest = fetch('/fileUpload', {
                method: 'POST',
                body: formData
            }).then(response => {
                console.log(response.ok)
            }).catch(error => {
                console.error(error)
            })
        }
    })
});
