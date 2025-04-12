function generateBlogHTML(info) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${info.title}</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body class="blog-template">
    <header class="main-header">
        <nav class="top-nav">
            <div class="nav-brand">${info.title}</div>
            <ul class="nav-menu">
                ${info.sections.map(section => 
                    `<li><a href="#${section.toLowerCase()}">${section}</a></li>`
                ).join('')}
            </ul>
            <div class="nav-actions">
                <button class="search-toggle"><i class="fas fa-search"></i></button>
                <button class="menu-toggle"><i class="fas fa-bars"></i></button>
            </div>
        </nav>
        <div class="search-bar">
            <div class="container">
                <input type="text" placeholder="Search articles...">
                <button><i class="fas fa-search"></i></button>
            </div>
        </div>
    </header>

    <div class="featured-post">
        <div class="container">
            <div class="featured-content">
                <span class="category">Featured</span>
                <h1>${info.title}</h1>
                <p>${info.description}</p>
                <a href="#articles" class="read-more">Read More</a>
            </div>
        </div>
    </div>

    <main class="main-content">
        <div class="container">
            <div class="content-wrapper">
                <div class="articles-section">
                    ${info.sections.map((section, index) => {
                        if (section === 'Articles' || section === 'Blog') {
                            return `
                            <section id="${section.toLowerCase()}" class="section">
                                <h2>${section}</h2>
                                <div class="articles-grid">
                                    ${info.images.map((img, i) => `
                                        <article class="article-card ${i === 0 ? 'featured' : ''}">
                                            <div class="article-image">
                                                <img src="${img.url}" alt="${img.title}">
                                                <span class="category">${info.features[i % info.features.length].title}</span>
                                            </div>
                                            <div class="article-content">
                                                <h3>${img.title}</h3>
                                                <p>${img.description}</p>
                                                <div class="article-meta">
                                                    <span class="date">April ${i + 1}, 2025</span>
                                                    <span class="read-time">${Math.floor(Math.random() * 10) + 5} min read</span>
                                                </div>
                                                <a href="#" class="read-more">Read More</a>
                                            </div>
                                        </article>
                                    `).join('')}
                                </div>
                            </section>`;
                        } else if (section === 'Categories') {
                            return `
                            <section id="categories" class="section">
                                <h2>Categories</h2>
                                <div class="categories-grid">
                                    ${info.features.map(feature => `
                                        <a href="#" class="category-card">
                                            <i class="fas fa-${feature.icon}"></i>
                                            <h3>${feature.title}</h3>
                                            <p>${Math.floor(Math.random() * 50) + 10} Articles</p>
                                        </a>
                                    `).join('')}
                                </div>
                            </section>`;
                        } else {
                            return `
                            <section id="${section.toLowerCase()}" class="section">
                                <h2>${section}</h2>
                                <div class="content-grid">
                                    ${info.features.map(feature => `
                                        <div class="feature-card">
                                            <i class="fas fa-${feature.icon}"></i>
                                            <h3>${feature.title}</h3>
                                            <p>${feature.description}</p>
                                        </div>
                                    `).join('')}
                                </div>
                            </section>`;
                        }
                    }).join('')}
                </div>

                <aside class="sidebar">
                    <div class="widget about-widget">
                        <h3>About</h3>
                        <p>${info.description}</p>
                    </div>

                    <div class="widget categories-widget">
                        <h3>Categories</h3>
                        <ul>
                            ${info.features.map(feature => `
                                <li>
                                    <a href="#">
                                        <span>${feature.title}</span>
                                        <span class="count">${Math.floor(Math.random() * 50) + 10}</span>
                                    </a>
                                </li>
                            `).join('')}
                        </ul>
                    </div>

                    <div class="widget popular-widget">
                        <h3>Popular Posts</h3>
                        ${info.images.slice(0, 3).map(img => `
                            <div class="popular-post">
                                <img src="${img.url}" alt="${img.title}">
                                <div class="post-info">
                                    <h4>${img.title}</h4>
                                    <span class="date">April ${Math.floor(Math.random() * 30) + 1}, 2025</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <div class="widget newsletter-widget">
                        <h3>Newsletter</h3>
                        <p>Subscribe to our newsletter and get the latest updates</p>
                        <form class="newsletter-form">
                            <input type="email" placeholder="Enter your email">
                            <button type="submit">Subscribe</button>
                        </form>
                    </div>
                </aside>
            </div>
        </div>
    </main>

    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>${info.title}</h3>
                    <p>${info.description}</p>
                    <div class="social-links">
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-facebook"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                        <a href="#"><i class="fab fa-pinterest"></i></a>
                    </div>
                </div>
                <div class="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        ${info.sections.map(section => 
                            `<li><a href="#${section.toLowerCase()}">${section}</a></li>`
                        ).join('')}
                    </ul>
                </div>
                <div class="footer-section">
                    <h3>Categories</h3>
                    <ul>
                        ${info.features.slice(0, 5).map(feature => 
                            `<li><a href="#">${feature.title}</a></li>`
                        ).join('')}
                    </ul>
                </div>
                <div class="footer-section">
                    <h3>Contact</h3>
                    <p>Email: contact@${info.title.toLowerCase().replace(/\s+/g, '')}.com</p>
                    <p>Phone: (123) 456-7890</p>
                    <p>Address: 123 Blog Street, Content City, ST 12345</p>
                </div>
            </div>
        </div>
    </footer>

    <script src="app.js"></script>
</body>
</html>`;}

function generateBlogCSS(info) {
    return `
.blog-template {
    margin: 0;
    padding: 0;
    font-family: 'Merriweather', serif;
    color: #333;
    background: #f8f9fa;
}

.main-header {
    background: white;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
}

.top-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.nav-brand {
    font-size: 1.8rem;
    font-weight: bold;
    color: ${info.color};
    font-family: 'Playfair Display', serif;
}

.nav-menu {
    display: flex;
    list-style: none;
    gap: 2rem;
    margin: 0;
    padding: 0;
}

.nav-menu a {
    color: #333;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s;
}

.nav-menu a:hover {
    color: ${info.color};
}

.nav-actions {
    display: flex;
    gap: 1rem;
}

.nav-actions button {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    color: #333;
    transition: color 0.3s;
}

.nav-actions button:hover {
    color: ${info.color};
}

.search-bar {
    background: #f1f1f1;
    padding: 1rem;
    display: none;
}

.search-bar.active {
    display: block;
}

.search-bar .container {
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    gap: 1rem;
}

.search-bar input {
    flex: 1;
    padding: 0.8rem;
    border: none;
    border-radius: 5px;
    outline: none;
}

.search-bar button {
    background: ${info.color};
    color: white;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 5px;
    cursor: pointer;
}

.featured-post {
    height: 70vh;
    background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://source.unsplash.com/1920x1080/?${info.title}');
    background-size: cover;
    background-position: center;
    color: white;
    display: flex;
    align-items: center;
    margin-top: 70px;
}

.featured-content {
    max-width: 800px;
    padding: 2rem;
}

.featured-content h1 {
    font-size: 3rem;
    margin: 1rem 0;
    font-family: 'Playfair Display', serif;
}

.category {
    background: ${info.color};
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 25px;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.read-more {
    display: inline-block;
    background: ${info.color};
    color: white;
    padding: 0.8rem 2rem;
    text-decoration: none;
    border-radius: 25px;
    margin-top: 1rem;
    transition: transform 0.3s;
}

.read-more:hover {
    transform: translateY(-2px);
}

.container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
    width: 100%;
}

.content-wrapper {
    display: grid;
    grid-template-columns: minmax(0, 2fr) minmax(300px, 1fr);
    gap: 3rem;
    padding: 3rem 0;
    max-width: 1400px;
    margin: 0 auto;
}

.section {
    margin-bottom: 4rem;
}

.section h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
    font-family: 'Playfair Display', serif;
}

.articles-grid {
    display: grid;
    gap: 2.5rem;
    max-width: 900px;
}

.article-card {
    background: white;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 3px 15px rgba(0,0,0,0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.article-card.featured {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    min-height: 500px;
    background: linear-gradient(to right, white 50%, #f8f9fa 50%);
}

.article-image {
    position: relative;
}

.article-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
    transform-origin: center;
}

.article-content {
    padding: 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.article-content h3 {
    font-size: 1.5rem;
    margin: 1rem 0;
    font-family: 'Playfair Display', serif;
}

.article-meta {
    display: flex;
    gap: 1rem;
    color: #666;
    font-size: 0.9rem;
    margin: 1rem 0;
}

.categories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
}

.category-card {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    text-align: center;
    text-decoration: none;
    color: #333;
    transition: transform 0.3s;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.category-card:hover {
    transform: translateY(-5px);
}

.category-card i {
    font-size: 2rem;
    color: ${info.color};
    margin-bottom: 1rem;
}

.sidebar {
    position: sticky;
    top: 100px;
}

.widget {
    background: white;
    padding: 2.5rem;
    border-radius: 15px;
    margin-bottom: 2.5rem;
    box-shadow: 0 3px 15px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
}

.widget h3 {
    font-family: 'Playfair Display', serif;
    margin-bottom: 1.5rem;
}

.categories-widget ul {
    list-style: none;
    padding: 0;
}

.categories-widget li {
    margin-bottom: 0.8rem;
}

.categories-widget a {
    display: flex;
    justify-content: space-between;
    color: #333;
    text-decoration: none;
    transition: color 0.3s;
}

.categories-widget a:hover {
    color: ${info.color};
}

.popular-post {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
}

.popular-post img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 5px;
}

.post-info h4 {
    font-size: 1rem;
    margin: 0 0 0.5rem;
}

.newsletter-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
}

.newsletter-form input {
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.newsletter-form button {
    background: ${info.color};
    color: white;
    border: none;
    padding: 0.8rem;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;
}

.newsletter-form button:hover {
    filter: brightness(110%);
}

.footer {
    background: #1a1a1a;
    color: white;
    padding: 5rem 0 2rem;
}

.footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
}

.footer-section h3 {
    color: white;
    margin-bottom: 1.5rem;
    font-family: 'Playfair Display', serif;
}

.footer-section ul {
    list-style: none;
    padding: 0;
}

.footer-section li {
    margin-bottom: 0.8rem;
}

.footer-section a {
    color: #999;
    text-decoration: none;
    transition: color 0.3s;
}

.footer-section a:hover {
    color: ${info.color};
}

.social-links {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
}

.social-links a {
    color: white;
    font-size: 1.2rem;
    transition: color 0.3s;
}

.social-links a:hover {
    color: ${info.color};
}

@media (max-width: 768px) {
    .nav-menu {
        display: none;
    }

    .content-wrapper {
        grid-template-columns: 1fr;
    }

    .article-card.featured {
        grid-template-columns: 1fr;
    }

    .sidebar {
        position: static;
    }
}`;
}

module.exports = {
    generateBlogHTML,
    generateBlogCSS
};
