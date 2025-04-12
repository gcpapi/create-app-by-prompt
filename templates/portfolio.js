function generateNavigation(info, currentPage) {
    // Default navigation if none provided
    const navigation = info.navigation || {
        logo: info.title,
        links: info.pages?.map(page => ({
            text: page.name,
            path: page.path
        })) || [{
            text: 'Home',
            path: 'index.html'
        }]
    };

    return `
        <nav class="navbar">
            <div class="nav-brand">${navigation.logo}</div>
            <ul class="nav-menu">
                ${navigation.links.map(link => 
                    `<li><a href="${link.path}"${currentPage === link.path ? ' class="active"' : ''}>${link.text}</a></li>`
                ).join('')}
            </ul>
            <div class="nav-toggle">
                <i class="fas fa-bars"></i>
            </div>
        </nav>
    `;
}

function generateSection(section) {
    if (section.title.toLowerCase() === 'gallery') {
        return `
        <section id="${section.title.toLowerCase()}" class="section">
            <div class="container">
                <h2>${section.title}</h2>
                <div class="media-tabs">
                    <button class="tab active" onclick="showTab('images')">Images</button>
                    <button class="tab" onclick="showTab('videos')">Videos</button>
                </div>
                <div id="images" class="media-grid active">
                    ${section.images?.map(img => `
                        <div class="media-card" onclick="openLightbox('${img.url}')">
                            <img src="${img.url}" alt="${img.title}">
                            <div class="media-info">
                                <h3>${img.title}</h3>
                                <p>${img.description}</p>
                            </div>
                        </div>
                    `).join('') || ''}
                </div>
                <div id="videos" class="media-grid">
                    ${section.videos?.map(video => `
                        <div class="media-card video">
                            <iframe src="${video.url}" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
                            <div class="media-info">
                                <h3>${video.title}</h3>
                                <p>${video.description}</p>
                            </div>
                        </div>
                    `).join('') || ''}
                </div>
            </div>
        </section>`;
    } else {
        return `
        <section id="${section.title.toLowerCase()}" class="section">
            <div class="container">
                <h2>${section.title}</h2>
                <div class="section-content">
                    ${section.content || ''}
                </div>
                ${section.features ? `
                <div class="features-grid">
                    ${section.features.map(feature => `
                        <div class="feature-card">
                            <i class="fas fa-${feature.icon}"></i>
                            <h3>${feature.title}</h3>
                            <p>${feature.description}</p>
                        </div>
                    `).join('')}
                </div>
                ` : ''}
            </div>
        </section>`;
    }
}

function generatePortfolioHTML(info) {
    // Create an object to store all HTML files
    const files = {};
    // Generate each page
    (info.pages || [{
        name: 'Home',
        path: 'index.html',
        title: info.title,
        description: info.description,
        sections: [{
            title: 'Features',
            features: info.features
        }, {
            title: 'Gallery',
            images: info.images,
            videos: info.videos
        }]
    }]).forEach(page => {
        files[page.path] = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${page.title || info.title} - ${info.title}</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body class="portfolio-template">
    ${generateNavigation(info, page.path)}

    <main class="main-content">
        <header id="home" class="hero">
            <div class="hero-content">
                <h1>${page.title || info.title}</h1>
                <p class="hero-text">${page.description || info.description}</p>
            </div>
        </header>

        ${(page.sections || []).map(section => generateSection(section)).join('')}
    </main>

    <div id="lightbox" class="lightbox" onclick="closeLightbox()">
        <span class="close">&times;</span>
        <img id="lightbox-img" src="" alt="Lightbox Image">
    </div>

    <script src="app.js"></script>
</body>
</html>`;
    });

    return files;}

function generatePortfolioCSS(info) {
    const primaryColor = info.color || '#4a90e2';
    const secondaryColor = info.secondaryColor || '#2c3e50';
    return `
        /* Reset and base styles */
        *, *::before, *::after {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            --primary: ${primaryColor};
            --secondary: ${secondaryColor};
            --text: #333;
            --bg: #fff;
            --nav-bg: #fff;
            --card-bg: #f8f9fa;
            --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
.portfolio-template {
    margin: 0;
    padding: 0;
    display: flex;
    background: #f8f9fa;
    color: #333;
    font-family: 'Helvetica Neue', sans-serif;
}

.side-nav {
    width: 250px;
    height: 100vh;
    position: fixed;
    background: white;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    box-shadow: 2px 0 5px rgba(0,0,0,0.1);
}

.nav-brand {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 2rem;
    color: ${info.color};
}

.nav-menu {
    list-style: none;
    padding: 0;
    margin: 0;
    flex-grow: 1;
}

.nav-menu a {
    display: block;
    padding: 0.8rem 0;
    color: #333;
    text-decoration: none;
    transition: color 0.3s;
}

        .navbar {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.25rem 2rem;
            background-color: var(--nav-bg);
            box-shadow: var(--shadow);
            z-index: 1000;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(0,0,0,0.05);
        }

        .nav-brand {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--primary);
            text-decoration: none;
        }

        .nav-menu {
            display: flex;
            gap: 2rem;
            list-style: none;
            margin: 0;
            padding: 0;
        }

        .nav-menu a {
            color: var(--text);
            text-decoration: none;
            font-weight: 500;
            transition: color 0.3s ease;
            position: relative;
            padding: 0.5rem 0;
        }

        .nav-menu a:hover,
        .nav-menu a.active {
            color: var(--primary);
        }

        .nav-menu a::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: var(--primary);
            transform: scaleX(0);
            transition: transform 0.3s ease;
        }

        .nav-menu a:hover::after,
        .nav-menu a.active::after {
            transform: scaleX(1);
        }

        .main-content {
            padding-top: 80px;
            max-width: 1200px;
            margin: 0 auto;
            padding-left: 2rem;
            padding-right: 2rem;
            width: 100%;
        }

        .hero {
            padding: 6rem 2rem;
            text-align: center;
            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
            color: white;
            border-radius: 1rem;
            margin-bottom: 4rem;
            position: relative;
            overflow: hidden;
            min-height: 400px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect width="1" height="1" fill="rgba(255,255,255,0.05)"/></svg>');
            opacity: 0.3;
        }

        .hero-content {
            position: relative;
            z-index: 1;
            max-width: 800px;
            padding: 2rem;
        }

        .hero h1 {
            font-size: 3.5rem;
            font-weight: 800;
            margin-bottom: 1rem;
            line-height: 1.2;
            background: linear-gradient(45deg, #fff, rgba(255,255,255,0.8));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .hero-text {
            font-size: 1.25rem;
            max-width: 600px;
            margin: 0 auto;
            opacity: 0.9;
        }

        .section {
            padding: 5rem 0;
            max-width: 1200px;
            margin: 0 auto;
        }

        .section h2 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 3rem;
            text-align: center;
            color: var(--secondary);
            position: relative;
        }

        .section h2::after {
            content: '';
            display: block;
            width: 50px;
            height: 3px;
            background: var(--primary);
            margin: 1rem auto 0;
            border-radius: 2px;
        }

        .section-content {
            max-width: 800px;
            margin: 0 auto;
            font-size: 1.1rem;
            line-height: 1.8;
        }

        .masonry-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 2rem;
            padding: 0;
            max-width: 1200px;
            margin: 0 auto;
        }

        .masonry-item {
            position: relative;
            border-radius: 1rem;
            overflow: hidden;
            box-shadow: var(--shadow);
            aspect-ratio: 16/9;
            cursor: pointer;
            transition: transform 0.3s ease;
        }

        .masonry-item:hover {
            transform: scale(1.02);
        }

        .masonry-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .masonry-item .overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 1.5rem;
            background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
            color: white;
            transform: translateY(100%);
            transition: transform 0.3s ease;
        }

        .masonry-item:hover .overlay {
            transform: translateY(0);
        }

        .masonry-item .overlay h3 {
            font-size: 1.25rem;
            margin-bottom: 0.5rem;
        }

        .masonry-item .overlay p {
            font-size: 0.9rem;
            opacity: 0.9;
            margin: 0;
        }

.masonry-item {
    aspect-ratio: 1;
    margin-bottom: 1.5rem;
    height: 100%;
    position: relative;
    cursor: pointer;
    border-radius: 10px;
    overflow: hidden;
    transition: transform 0.3s;
}

.masonry-item:hover {
    transform: translateY(-5px);
}

.masonry-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    border-radius: 10px;
}

.overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,0.7);
    color: white;
    padding: 1rem;
    transform: translateY(100%);
    transition: transform 0.3s;
}

.masonry-item:hover .overlay {
    transform: translateY(0);
}

.about-section {
    background: white;
}

.about-content {
    display: flex;
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.about-text {
    flex: 1;
}

.skills {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    margin-top: 2rem;
}

.skill {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: #f8f9fa;
    padding: 0.8rem;
    border-radius: 5px;
}

.skill i {
    color: ${info.color};
}

.content-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.content-card {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    text-align: center;
    transition: transform 0.3s;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.content-card:hover {
    transform: translateY(-5px);
}

.content-card i {
    font-size: 2rem;
    color: ${info.color};
    margin-bottom: 1rem;
}

@media (max-width: 768px) {
    .side-nav {
        width: 100%;
        height: auto;
        position: relative;
    }

    .main-content {
        margin-left: 0;
        width: 100%;
    }

    .masonry-grid {
        columns: 2 200px;
    }
}`;
}

async function generate(websiteInfo) {
    const html = generatePortfolioHTML(websiteInfo);
    const css = generatePortfolioCSS(websiteInfo);
    const js = `
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
            document.querySelector('.tab[onclick="showTab(\'' + tabId + '\'')"]').classList.add('active');
        }
    `;

    return {
        html: html['index.html'],
        css: css,
        js: js
    };
}

module.exports = { generate };
