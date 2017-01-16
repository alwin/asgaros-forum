(function($) {
    $(document).ready(function() {
        // Show editor inside another view.
        $('a.forum-editor-button').click(function(e) {
            e.preventDefault();

            $('#forum-editor-form').slideToggle(400, function() {
                // Focus subject line or editor.
                var focusElement = $('.editor-row-subject input');

                if (focusElement.length) {
                    focusElement[0].focus();
                } else {
                    // We need to focus the form first to ensure scrolling.
                    $('#forum-editor-form').focus();

                    // Focus the editor.
                    tinyMCE.activeEditor.focus();
                }
            });
        });

        $('a.forum-editor-quote-button').click(function(e) {
            e.preventDefault();

            // Build quote.
            var quoteID = $(this).attr('data-value-id');
            var quoteContent = $('#post-quote-container-'+quoteID).html();

            // At quote to the end of the editor.
            tinyMCE.activeEditor.setContent(tinyMCE.activeEditor.getContent()+quoteContent);

            // Call slideDown() instead of slideToggle() so we can add multiple quotes at once.
            $('#forum-editor-form').slideDown(400, function() {
                // We need to focus the form first to ensure scrolling.
                $('#forum-editor-form').focus();
                
                // Focus the editor at the last line.
                tinyMCE.activeEditor.focus();
                tinyMCE.activeEditor.selection.select(tinyMCE.activeEditor.getBody(), true);
                tinyMCE.activeEditor.selection.collapse(false);
            });
        });

        $('a#add_file_link').click(function() {
            // Insert new upload element.
            $('<input type="file" name="forumfile[]" /><br />').insertBefore(this);

            // Check if we can add more upload elements.
            checkUploadsMaximumNumber();
        });

        $('.uploaded-files a.delete').click(function() {
            var filename= $(this).attr('data-filename');
            $('.files-to-delete').append('<input type="hidden" name="deletefile[]" value="'+filename+'" />');
            $(this).parent().remove();

            // Check if we can add more upload elements.
            checkUploadsMaximumNumber();

            // When there are no uploads anymore, remove the editor row.
            var filesNumber = $('.uploaded-files li').length;

            if (filesNumber == 0) {
                $('.uploaded-files').parent().remove();
            }
        });

        // Disable submit-button after first submit
        jQuery.fn.preventDoubleSubmission = function() {
            $(this).on('submit', function(e) {
                var $form = $(this);

                if ($form.data('submitted') === true) {
                    e.preventDefault();
                } else {
                    $form.data('submitted', true);
                }
            });

            return this;
        };
        $('#forum-editor-form').preventDoubleSubmission();

        function checkUploadsMaximumNumber() {
            var linkElement = $('a#add_file_link');
            var maximumNumber = linkElement.attr('data-maximum-number');

            if (maximumNumber > 0) {
                var inputsNumber = $('.editor-row-uploads input[type="file"]').length;
                var filesNumber = $('.uploaded-files li').length;
                var totalNumber = inputsNumber + filesNumber;

                if (totalNumber >= maximumNumber) {
                    linkElement.hide();
                } else {
                    linkElement.show();
                }
            }
        }
    });
})(jQuery);
