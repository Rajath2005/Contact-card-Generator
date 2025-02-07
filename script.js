// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Profile picture upload
    const profileUpload = document.getElementById('profile-upload');
    if (profileUpload) {
        profileUpload.addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const previewPic = document.getElementById('preview-pic');
                    if (previewPic) {
                        previewPic.src = e.target.result;
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Theme selection
    const themeOptions = document.querySelectorAll('.theme-option');
    const cardPreview = document.querySelector('.card-preview');

    if (themeOptions.length > 0 && cardPreview) {
        themeOptions.forEach(option => {
            option.addEventListener('click', function () {
                // Remove active class from all options
                themeOptions.forEach(opt => opt.classList.remove('active'));

                // Add active class to clicked option
                this.classList.add('active');

                // Update card preview background
                const theme = this.getAttribute('data-theme');
                const gradients = {
                    'purple-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    'blue-gradient': 'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)',
                    'dark-gradient': 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
                };

                cardPreview.style.background = gradients[theme] || gradients['purple-gradient'];
            });
        });
    }

    // Live preview updates
    const updateFields = [
        { input: 'name', preview: 'preview-name', default: 'Your Name' },
        { input: 'profession', preview: 'preview-profession', default: 'Your Profession' },
        { input: 'email', preview: 'preview-email', default: 'email@example.com' },
        { input: 'website', preview: 'preview-website', default: 'www.example.com' },
        { input: 'about', preview: 'preview-about', default: 'Tell us about yourself...' },
        { input: 'services', preview: 'preview-services', default: 'Your services...' },
    ];

    updateFields.forEach(field => {
        const inputElement = document.getElementById(field.input);
        const previewElement = document.getElementById(field.preview);

        if (inputElement && previewElement) {
            inputElement.addEventListener('input', function (e) {
                previewElement.textContent = this.value || field.default;
            });
        }
    });

    // Social links updates
    const socialLinks = ['linkedin', 'github', 'instagram', 'facebook'];

    socialLinks.forEach(social => {
        const input = document.getElementById(social);
        const preview = document.getElementById(`preview-${social}`);

        if (input && preview) {
            input.addEventListener('input', function (e) {
                preview.href = this.value || '#';
                // Show/hide social icons based on input
                preview.style.display = this.value ? 'inline-block' : 'none';
            });
        }
    });

    // Reset functionality
    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', function () {
            // Reset form inputs
            document.querySelectorAll('input, textarea').forEach(input => {
                input.value = '';
            });

            // Reset preview elements
            const defaultPreview = {
                'preview-pic': '/api/placeholder/120/120',
                'preview-name': 'Your Name',
                'preview-profession': 'Your Profession',
                'preview-email': 'email@example.com',
                'preview-website': 'www.example.com',
                'preview-about': 'Tell us about yourself...',
                'preview-services': 'Your services...',
            };

            // Update each preview element
            Object.entries(defaultPreview).forEach(([id, value]) => {
                const element = document.getElementById(id);
                if (element) {
                    if (element.tagName === 'IMG') {
                        element.src = value;
                    } else {
                        element.textContent = value;
                    }
                }
            });

            // Reset social links
            socialLinks.forEach(social => {
                const preview = document.getElementById(`preview-${social}`);
                if (preview) {
                    preview.href = '#';
                    preview.style.display = 'inline-block';
                }
            });

            // Reset theme to default (purple gradient)
            const defaultTheme = document.querySelector('[data-theme="purple-gradient"]');
            if (defaultTheme) {
                defaultTheme.click();
            }
        });
    }

    // Download card functionality
    const downloadBtn = document.getElementById('download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function () {
            const cardPreview = document.querySelector('.card-preview');

            if (cardPreview) {
                // Use html2canvas to capture the card preview as an image
                html2canvas(cardPreview, {
                    scale: 2, // Increase scale for better quality
                    useCORS: true, // Allow cross-origin images
                }).then(canvas => {
                    // Convert canvas to image
                    const imgData = canvas.toDataURL('image/png');

                    // Create a temporary link to download the image
                    const link = document.createElement('a');
                    link.href = imgData;
                    link.download = 'business-card.png'; // File name
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }).catch(err => {
                    console.error('Error generating card image:', err);
                });
            }
        });
    }
});
