
        // Toggle navigation menu
        document.querySelector('.nav-toggle').addEventListener('click', function() {
            document.querySelector('.nav-menu').classList.toggle('active');
        });

        // Lightbox functionality
        function openLightbox(imgSrc) {
            document.getElementById('lightbox').style.display = 'flex';
            document.getElementById('lightbox-img').src = imgSrc;
        }

        function closeLightbox() {
            document.getElementById('lightbox').style.display = 'none';
        }

        // Media tabs functionality
        function showTab(tabId) {
            document.querySelectorAll('.media-grid').forEach(grid => grid.classList.remove('active'));
            document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
            document.querySelector('.tab[onclick="showTab('' + tabId + ''')"]').classList.add('active');
        }
    