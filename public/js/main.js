let currentStep = 1;
const totalSteps = 3;

function updateProgress(step) {
    const percent = ((step - 1) / (totalSteps - 1)) * 100;
    document.getElementById('progress').style.width = `${percent}%`;
    
    document.querySelectorAll('.step-indicator').forEach((indicator, index) => {
        const circle = indicator.querySelector('div div');
        if (index + 1 <= step) {
            circle.classList.remove('bg-gray-300');
            circle.classList.add('bg-blue-500');
        } else {
            circle.classList.remove('bg-blue-500');
            circle.classList.add('bg-gray-300');
        }
    });
}

function showStep(step) {
    document.querySelectorAll('.step-content').forEach(content => {
        content.classList.add('hidden');
    });
    document.getElementById(`step${step}`).classList.remove('hidden');
    
    const backBtn = document.getElementById('backBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    backBtn.style.display = step === 1 ? 'none' : 'block';
    nextBtn.textContent = step === 2 ? 'Generate Website' : 'Next';
    nextBtn.style.display = step === 3 ? 'none' : 'block';
    
    updateProgress(step);
}

document.getElementById('nextBtn').addEventListener('click', async () => {
    if (currentStep === 1) {
        currentStep = 2;
        showStep(currentStep);
    } else if (currentStep === 2) {
        const prompt = document.getElementById('prompt').value.trim();
        if (!prompt) {
            alert('Please enter a website description');
            return;
        }
        currentStep = 3;
        showStep(currentStep);
        await generateWebsite(prompt);
    }
});

document.getElementById('backBtn').addEventListener('click', () => {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }
});

// Initialize on page load
window.addEventListener('load', () => {
    showStep(1);
});

async function generateWebsite(prompt) {
    try {
        const response = await fetch('/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt })
        });

        if (!response.ok) {
            throw new Error('Failed to generate website');
        }

        // Handle the response and update preview
        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            
            const chunk = decoder.decode(value);
            const lines = chunk.split('\n');
            
            for (const line of lines) {
                if (line.trim() === '') continue;
                if (line.startsWith('data: ')) {
                    const data = JSON.parse(line.slice(6));
                    if (data.error) {
                        throw new Error(data.error);
                    }
                    if (data.progress) {
                        document.getElementById('progressBar').style.width = `${data.progress}%`;
                    }
                    if (data.content) {
                        displayPreview(data.content);
                    }
                }
            }
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to generate website: ' + error.message);
    }
}

function displayPreview(websiteContent) {
    const previewFrame = document.getElementById('previewFrame');
    const previewDoc = previewFrame.contentDocument || previewFrame.contentWindow.document;
    
    // Create a complete HTML structure
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${websiteContent.title}</title>
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet">
            <style>
                body { font-family: 'Arial', sans-serif; }
                img { max-width: 100%; height: auto; }
                .section { margin-bottom: 2rem; padding: 1rem; }
            </style>
        </head>
        <body class="bg-white">
            <div class="container mx-auto px-4 py-8">
                <h1 class="text-4xl font-bold mb-6">${websiteContent.title}</h1>
                <p class="text-lg mb-8">${websiteContent.description}</p>
                ${websiteContent.sections.map(section => `
                    <div class="section">
                        <h2 class="text-2xl font-semibold mb-4">${section.title}</h2>
                        <div class="content">${section.content}</div>
                        ${section.image ? `
                            <div class="mt-4">
                                <img src="${section.image}" alt="${section.title}" class="rounded-lg shadow-lg">
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
        </body>
        </html>
    `;

    // Write the content to the iframe
    previewDoc.open();
    previewDoc.write(htmlContent);
    previewDoc.close();
}