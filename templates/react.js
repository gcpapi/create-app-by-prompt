const generateReactApp = (info) => {
    const files = {};

    // package.json
    files['package.json'] = `{
        "name": "${info.title.toLowerCase().replace(/\\s+/g, '-')}",
        "version": "1.0.0",
        "private": true,
        "dependencies": {
            "react": "^18.2.0",
            "react-dom": "^18.2.0",
            "react-router-dom": "^6.10.0",
            "@mui/material": "^5.12.0",
            "@mui/icons-material": "^5.11.16"
        },
        "scripts": {
            "start": "react-scripts start",
            "build": "react-scripts build",
            "test": "react-scripts test",
            "eject": "react-scripts eject"
        }
    }`;

    // Generate component for each page
    info.pages.forEach(page => {
        const componentName = page.name.replace(/\\s+/g, '');
        files[`src/pages/${componentName}.js`] = `
            import React from 'react';
            import { Container, Typography, Box } from '@mui/material';
            
            export default function ${componentName}() {
                return (
                    <Container maxWidth="lg">
                        <Box sx={{ my: 4 }}>
                            <Typography variant="h2" component="h1" gutterBottom>
                                ${page.title}
                            </Typography>
                            <Typography variant="body1">
                                ${page.description}
                            </Typography>
                            ${page.sections.map(section => `
                                <Box sx={{ my: 4 }}>
                                    <Typography variant="h4" gutterBottom>
                                        ${section.title}
                                    </Typography>
                                    ${section.content ? `
                                        <Typography variant="body1">
                                            ${section.content}
                                        </Typography>
                                    ` : ''}
                                    ${section.features ? `
                                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 3, my: 4 }}>
                                            ${section.features.map(feature => `
                                                <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
                                                    <Typography variant="h6" gutterBottom>
                                                        ${feature.title}
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        ${feature.description}
                                                    </Typography>
                                                </Box>
                                            `).join('')}
                                        </Box>
                                    ` : ''}
                                </Box>
                            `).join('')}
                        </Box>
                    </Container>
                );
            }
        `;
    });

    // App.js with routing
    files['src/App.js'] = `
        import React from 'react';
        import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
        import { AppBar, Toolbar, Typography, Container, Button } from '@mui/material';
        ${info.pages.map(page => `import ${page.name.replace(/\\s+/g, '')} from './pages/${page.name.replace(/\\s+/g, '')}';`).join('\n')}

        export default function App() {
            return (
                <BrowserRouter>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                ${info.title}
                            </Typography>
                            ${info.navigation.links.map(link => `
                                <Button color="inherit" component={Link} to="${link.path}">
                                    ${link.text}
                                </Button>
                            `).join('')}
                        </Toolbar>
                    </AppBar>
                    <Container>
                        <Routes>
                            ${info.pages.map(page => `
                                <Route path="${page.path}" element={<${page.name.replace(/\\s+/g, '')} />} />
                            `).join('')}
                        </Routes>
                    </Container>
                </BrowserRouter>
            );
        }
    `;

    // index.js
    files['src/index.js'] = `
        import React from 'react';
        import ReactDOM from 'react-dom/client';
        import { ThemeProvider, createTheme } from '@mui/material/styles';
        import CssBaseline from '@mui/material/CssBaseline';
        import App from './App';

        const theme = createTheme({
            palette: {
                primary: {
                    main: '${info.color || '#1976d2'}',
                },
            },
        });

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(
            <React.StrictMode>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <App />
                </ThemeProvider>
            </React.StrictMode>
        );
    `;

    return files;
};

module.exports = {
    generateReactApp
};
