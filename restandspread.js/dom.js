
const endpoints = [
    'http://localhost:3000/0',
    'http://localhost:3000/1',
    'http://localhost:3000/2',
    'http://localhost:3000/3',
    'http://localhost:3000/4',
    'http://localhost:3000/5',
    'http://localhost:3000/6',
    'http://localhost:3000/7',
    'http://localhost:3000/8',
    'http://localhost:3000/9',
];

async function fetchData() {
    try {
        const fetchPromises = endpoints.map(url => fetch(url).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        }));

        const results = await Promise.all(fetchPromises);

        return results.flat(); 
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}


function displayEvents(events) {
    const container = document.getElementById('event-container');
    container.innerHTML = ''; 

    events.forEach(event => {
        const eventDiv = document.createElement('div');
        eventDiv.className = 'event';

        const eventHTML = `
            <h2>${event.title}</h2>
            <img src="${event.imageUrl}" alt="${event.title}">
            <p><strong>Date:</strong> ${event.date}</p>
            <p><strong>Location:</strong> ${event.location}</p>
            <p><strong>Price:</strong> $${event.price}</p>
            <p><strong>Company:</strong> ${event.company}</p>
        `;
        
        eventDiv.innerHTML = eventHTML;
        container.appendChild(eventDiv);
    });
}

async function init() {
    const events = await fetchData();
    displayEvents(events);
}

init();

