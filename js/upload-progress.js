$(document).ready(function() {
    //File upload via Ajax
    $('#uploadForm').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            xhr: function() {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener('progress', function(evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = Math.round((evt.loaded / evt.total) * 100);
                        $('.progress-bar').width(percentComplete + '%');
                        $('.progress-bar').html(percentComplete + '%');
                    }
                }, false);
                return xhr;
            },
            type: 'POST',
            url: './upload.php',
            data: new FormData(this),
            contentType: false,
            cache: false,
            processData: false,
            beforeSend: function() {
                $('.progress-bar').width('0%');
                $('#uploadStatus').html('<img src="images/loading-spin.svg" />');
            },
            error: function() {
                $('#uploadStatus').html('<p style="color:#EA4335;">File upload failed, please try again.</p>');
            },
            success: function(resp) {
                if (resp == 'ok') {
                    $('#uploadForm')[0].reset();
                    $('#uploadStatus').html('<p style="color:#28A74B;">File has uploaded successfully!</p>');
                } else if (resp == 'err') {
                    $('#uploadStatus').html('<p style="color:#EA4335;">Please select a valid file to upload.</p>');
                }
            }
        });
    });

    //File type validation
    $('#fileInput').change(function() {
        var allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.ms-office', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
        var file = this.files[0];
        var fileType = file.type;
        if (!allowedTypes.includes(fileType)) {
            alert('Please select a valid file (PDF/DOC/DOCX/JPEG/JPG/PNG/GIF).');
            $('#fileInput').val('');
            return false;
        }
    });
});
