document.addEventListener('DOMContentLoaded', function() {
    const photoInput = document.getElementById('photo-upload');
    const photoPreview = document.getElementById('photo-preview');
    const maxFiles = 5;
    const maxFileSize = 5 * 1024 * 1024; // 5MB
    
    let uploadedFiles = [];
    
    function createPreviewItem(file, index) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const previewItem = document.createElement('div');
            previewItem.className = 'photo-preview__item';
            previewItem.innerHTML = `
                <img src="${e.target.result}" alt="Preview">
                <button type="button" class="photo-preview__remove" data-index="${index}">×</button>
            `;
            photoPreview.appendChild(previewItem);
            
            const removeBtn = previewItem.querySelector('.photo-preview__remove');
            removeBtn.addEventListener('click', function() {
                removeFile(index);
            });
        };
        reader.readAsDataURL(file);
    }
    
    function removeFile(index) {
        uploadedFiles.splice(index, 1);
        updatePreview();
    }
    
    function updatePreview() {
        photoPreview.innerHTML = '';
        uploadedFiles.forEach((file, index) => {
            createPreviewItem(file, index);
        });
    }
    
    function validateFile(file) {
        if (!file.type.startsWith('image/')) {
            alert('Пожалуйста, выберите только изображения');
            return false;
        }
        
        if (file.size > maxFileSize) {
            alert('Размер файла не должен превышать 5MB');
            return false;
        }
        
        return true;
    }
    
    photoInput.addEventListener('change', function(e) {
        const files = Array.from(e.target.files);
        
        if (uploadedFiles.length + files.length > maxFiles) {
            alert(`Максимальное количество файлов: ${maxFiles}`);
            return;
        }
        
        files.forEach(file => {
            if (validateFile(file)) {
                uploadedFiles.push(file);
            }
        });
        
        updatePreview();
        photoInput.value = '';
    });
    
    photoInput.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.currentTarget.closest('.photo-upload__label').style.borderColor = '#e9496d';
    });
    
    photoInput.addEventListener('dragleave', function(e) {
        e.preventDefault();
        e.currentTarget.closest('.photo-upload__label').style.borderColor = '#E5E5E5';
    });
    
    photoInput.addEventListener('drop', function(e) {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        
        if (uploadedFiles.length + files.length > maxFiles) {
            alert(`Максимальное количество файлов: ${maxFiles}`);
            return;
        }
        
        files.forEach(file => {
            if (validateFile(file)) {
                uploadedFiles.push(file);
            }
        });
        
        updatePreview();
        e.currentTarget.closest('.photo-upload__label').style.borderColor = '#E5E5E5';
    });
});
