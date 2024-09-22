document.addEventListener('DOMContentLoaded', () => {
    const events = document.getElementById('container');
    const sortByDateRecent = document.getElementById('datE');
    const sortByDateOldest = document.getElementById('date');
    const sortByPriceHigh = document.getElementById('pricE');
    const sortByPriceLow = document.getElementById('price');
    const sortByLocationAsc = document.getElementById('locatioN');
    const sortByLocationDesc = document.getElementById('location');
    const favouritesButton = document.getElementById('favourites');
    const clearFavouritesButton = document.getElementById('clearFavourites'); 

    let eventData = [];

    const renderFavourites = () => {
        const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
        const filteredData = eventData.filter(event => favourites.includes(event.id));
        renderEvents(filteredData);
    };

    const renderEvents = (data) => {
        events.innerHTML = '';
        const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
        data.forEach(event => {
            const eventDiv = document.createElement('div');
            eventDiv.className = 'event';

            const img = document.createElement('img');
            img.src = event.imageUrl;
            img.className = 'event-image';

            const eventTitle = document.createElement('h2');
            eventTitle.textContent = event.title;

            const eventPrice = document.createElement('p');
            eventPrice.textContent = `$${event.price}`;

            const eventDate = document.createElement('p');
            eventDate.textContent = event.date;

            const eventLocation = document.createElement('p');
            eventLocation.textContent = event.location;

            const eventCompany = document.createElement('p');
            eventCompany.textContent = event.company;

            const buyEvent = document.createElement('button');
            buyEvent.textContent = 'Buy Ticket';
            buyEvent.className = 'btn';

            const addToFave = document.createElement('button');
            addToFave.textContent = favourites.includes(event.id) ? 'Remove from Favourites' : 'Add to Favourites';
            addToFave.className = 'btn';
            addToFave.addEventListener('click', () => {
                const eventId = event.id;
                const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
                const isFavourite = favourites.includes(eventId);
                if (isFavourite) {
                    const updatedFavourites = favourites.filter(fav => fav !== eventId);
                    localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
                    addToFave.textContent = 'Add to Favourites';
                    alert('Event removed from favourites');
                    renderFavourites();
                } else {
                    favourites.push(eventId);
                    localStorage.setItem('favourites', JSON.stringify(favourites));
                    addToFave.textContent = 'Remove from Favourites';
                    alert('Event added to favourites');
                }
            });

            eventDiv.append(img, eventTitle, eventPrice, eventDate, eventLocation, eventCompany, buyEvent, addToFave);
            events.appendChild(eventDiv);
        });
    };

    const sortByDate = (data, order = 'recent') => {
        return data.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return order === 'recent' ? dateB - dateA : dateA - dateB;
        });
    };

    const sortByPrice = (data, order = 'high') => {
        return data.sort((a, b) => order === 'high' ? b.price - a.price : a.price - b.price);
    };

    const sortByLocation = (data, order = 'asc') => {
        return data.sort((a, b) => order === 'asc' ? a.location.localeCompare(b.location) : b.location.localeCompare(a.location));
    };

    try {
        fetch('../data.json')
            .then(response => response.json())
            .then(data => {
                eventData = data;
                renderEvents(eventData);
            })
            .catch(error => console.error('Error fetching data:', error));
    } catch (error) {
        console.error('Error:', error);
    }

    sortByDateRecent.addEventListener('click', () => {
        const sortedData = sortByDate(eventData, 'recent');
        renderEvents(sortedData);
    });

    sortByDateOldest.addEventListener('click', () => {
        const sortedData = sortByDate(eventData, 'oldest');
        renderEvents(sortedData);
    });

    sortByPriceHigh.addEventListener('click', () => {
        const sortedData = sortByPrice(eventData, 'high');
        renderEvents(sortedData);
    });

    sortByPriceLow.addEventListener('click', () => {
        const sortedData = sortByPrice(eventData, 'low');
        renderEvents(sortedData);
    });

    sortByLocationAsc.addEventListener('click', () => {
        const sortedData = sortByLocation(eventData, 'asc');
        renderEvents(sortedData);
    });

    sortByLocationDesc.addEventListener('click', () => {
        const sortedData = sortByLocation(eventData, 'desc');
        renderEvents(sortedData);
    });

    favouritesButton.addEventListener('click', renderFavourites);

    clearFavouritesButton.addEventListener('click', () => {
        localStorage.removeItem('favourites');
        renderEvents(eventData);
    });
});