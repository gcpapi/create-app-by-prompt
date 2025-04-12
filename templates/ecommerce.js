function generateEcommerceHTML(info) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${info.title}</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body class="ecommerce-template">
    <nav class="top-nav">
        <div class="nav-left">
            <div class="nav-brand">${info.title}</div>
            <ul class="nav-menu">
                ${info.sections.map(section => 
                    `<li><a href="#${section.toLowerCase()}">${section}</a></li>`
                ).join('')}
            </ul>
        </div>
        <div class="nav-right">
            <div class="search-bar">
                <input type="text" placeholder="Search products...">
                <button><i class="fas fa-search"></i></button>
            </div>
            <div class="nav-icons">
                <a href="#" class="nav-icon"><i class="fas fa-user"></i></a>
                <a href="#" class="nav-icon"><i class="fas fa-heart"></i></a>
                <a href="#" class="nav-icon cart-icon">
                    <i class="fas fa-shopping-cart"></i>
                    <span class="cart-count">0</span>
                </a>
            </div>
        </div>
    </nav>

    <header class="hero">
        <div class="hero-content">
            <h1>${info.title}</h1>
            <p class="hero-text">${info.description}</p>
            <a href="#products" class="cta-button">Shop Now</a>
        </div>
    </header>

    <main>
        ${info.sections.map((section, index) => {
            if (section === 'Products' || section === 'Categories') {
                return `
                <section id="${section.toLowerCase()}" class="section products-section">
                    <div class="container">
                        <h2>${section}</h2>
                        <div class="filters">
                            <button class="filter active">All</button>
                            ${info.features.map(feature => 
                                `<button class="filter">${feature.title}</button>`
                            ).join('')}
                        </div>
                        <div class="products-grid">
                            ${info.images.map(img => `
                                <div class="product-card">
                                    <div class="product-image">
                                        <img src="${img.url}" alt="${img.title}">
                                        <div class="product-actions">
                                            <button class="action-btn"><i class="fas fa-heart"></i></button>
                                            <button class="action-btn"><i class="fas fa-shopping-cart"></i></button>
                                            <button class="action-btn"><i class="fas fa-eye"></i></button>
                                        </div>
                                    </div>
                                    <div class="product-info">
                                        <h3>${img.title}</h3>
                                        <p>${img.description}</p>
                                        <div class="product-price">
                                            <span class="price">$${Math.floor(Math.random() * 100) + 99}.99</span>
                                            <span class="rating">
                                                ${'★'.repeat(4)}${'☆'.repeat(1)}
                                                <span class="reviews">(${Math.floor(Math.random() * 100) + 1})</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </section>`;
            } else {
                return `
                <section id="${section.toLowerCase()}" class="section">
                    <div class="container">
                        <h2>${section}</h2>
                        <div class="features-grid">
                            ${info.features.map(feature => `
                                <div class="feature-card">
                                    <i class="fas fa-${feature.icon}"></i>
                                    <h3>${feature.title}</h3>
                                    <p>${feature.description}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </section>`;
            }
        }).join('')}
    </main>

    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-section">
                    <h3>${info.title}</h3>
                    <p>${info.description}</p>
                    <div class="social-links">
                        <a href="#"><i class="fab fa-facebook"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
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
                    <h3>Customer Service</h3>
                    <ul>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Shipping Policy</a></li>
                        <li><a href="#">Returns & Exchange</a></li>
                        <li><a href="#">FAQs</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h3>Newsletter</h3>
                    <p>Subscribe to get special offers and updates</p>
                    <div class="newsletter">
                        <input type="email" placeholder="Enter your email">
                        <button>Subscribe</button>
                    </div>
                </div>
            </div>
        </div>
    </footer>

    <script src="app.js"></script>
</body>
</html>`;}

function generateEcommerceCSS(info) {
    return `

.ecommerce-template {
    margin: 0;
    padding: 0;
    font-family: 'Inter', sans-serif;
    color: #333;
}

.top-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: white;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    z-index: 1000;
}

.nav-left {
    display: flex;
    align-items: center;
    gap: 2rem;
}

.nav-brand {
    font-size: 1.5rem;
    font-weight: bold;
    color: ${info.color};
}

.nav-menu {
    display: flex;
    list-style: none;
    gap: 1.5rem;
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

.nav-right {
    display: flex;
    align-items: center;
    gap: 2rem;
}

.search-bar {
    display: flex;
    align-items: center;
    background: #f1f1f1;
    border-radius: 25px;
    padding: 0.5rem 1rem;
}

.search-bar input {
    border: none;
    background: none;
    outline: none;
    padding: 0.2rem;
    width: 200px;
}

.search-bar button {
    border: none;
    background: none;
    cursor: pointer;
    color: #666;
}

.nav-icons {
    display: flex;
    gap: 1rem;
}

.nav-icon {
    color: #333;
    text-decoration: none;
    position: relative;
}

.cart-count {
    position: absolute;
    top: -8px;
    right: -8px;
    background: ${info.color};
    color: white;
    font-size: 0.7rem;
    padding: 0.2rem 0.5rem;
    border-radius: 50%;
}

.hero {
    height: 80vh;
    background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://source.unsplash.com/1920x1080/?${info.title}');
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: white;
    margin-top: 70px;
}

.container {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
}

.section {
    padding: 5rem 0;
    max-width: 1400px;
    margin: 0 auto;
    padding: 5rem 2rem;
}

.filters {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin: 2rem 0;
}

.filter {
    border: none;
    background: #f1f1f1;
    padding: 0.5rem 1.5rem;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s;
}

.filter.active, .filter:hover {
    background: ${info.color};
    color: white;
}

.products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    padding: 2rem 0;
    max-width: 1200px;
    margin: 0 auto;
}

.product-card {
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    transition: transform 0.3s;
}

.product-card:hover {
    transform: translateY(-5px);
}

.product-card:hover .product-image img {
    transform: scale(1.1);
}

.product-image {
    position: relative;
    aspect-ratio: 1;
    height: 300px;
    overflow: hidden;
    border-radius: 10px 10px 0 0;
    overflow: hidden;
}

.product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.product-actions {
    position: absolute;
    bottom: -50px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    padding: 1rem;
    background: rgba(255,255,255,0.9);
    transition: bottom 0.3s;
}

.product-card:hover .product-actions {
    bottom: 0;
}

.action-btn {
    background: white;
    border: none;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
}

.action-btn:hover {
    background: ${info.color};
    color: white;
}

.product-info {
    padding: 1.5rem;
    background: white;
    border-radius: 0 0 10px 10px;
    height: 100%;
}

.product-price {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
}

.price {
    font-size: 1.2rem;
    font-weight: bold;
    color: ${info.color};
}

.rating {
    color: #ffd700;
    font-size: 0.9rem;
}

.reviews {
    color: #666;
    font-size: 0.8rem;
}

.footer {
    background: #1a1a1a;
    color: white;
    padding: 5rem 0 2rem;
}

.footer-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
}

.footer-section h3 {
    margin-bottom: 1.5rem;
    color: white;
}

.footer-section ul {
    list-style: none;
    padding: 0;
}

.footer-section ul li {
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

.newsletter {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
}

.newsletter input {
    flex: 1;
    padding: 0.8rem;
    border: none;
    border-radius: 5px;
}

.newsletter button {
    background: ${info.color};
    color: white;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;
}

.newsletter button:hover {
    filter: brightness(110%);
}

@media (max-width: 768px) {
    .nav-menu {
        display: none;
    }

    .search-bar {
        display: none;
    }

    .products-grid {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
}`;
}

module.exports = {
    generateEcommerceHTML,
    generateEcommerceCSS
};
