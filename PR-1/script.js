document.getElementById('eventForm').addEventListener('submit', function(event) {
    event.preventDefault();

    
    const eventName = document.getElementById('eventName').value.trim();
    const eventDate = document.getElementById('eventDate').value;
    const eventTime = document.getElementById('eventTime').value;
    const eventLocation = document.getElementById('eventLocation').value.trim();

    // validation
    if (!eventName || !eventDate || !eventTime || !eventLocation) {
        alert("Please fill in all fields.");
        return;
    }

    // Create event object
    const eventObj = {
        name: eventName,
        date: eventDate,
        time: eventTime,
        location: eventLocation,
    };

    // Add event to the list
    addEventToList(eventObj);

    // Clear the form
    document.getElementById('eventForm').reset();

    // Sort events after adding a new one
    sortEvents();

    // Show or hide "No upcoming events" message
    toggleNoEventsMessage();
});

function addEventToList(eventObj) {
    const eventList = document.getElementById('eventList');

    // Create list item
    const eventItem = document.createElement('li');
    const eventDateTime = new Date(`${eventObj.date}T${eventObj.time}`);

    // Determine if the event is past or upcoming
    const currentDateTime = new Date();
    eventItem.classList.add(eventDateTime < currentDateTime ? 'past' : 'upcoming');

    // Event content
    const eventContent = document.createElement('span');
    eventContent.textContent = `${eventObj.name} - ${eventObj.date} at ${eventObj.time}, ${eventObj.location}`;

    // Buttons for editing and deleting
    const eventButtons = document.createElement('div');
    eventButtons.classList.add('event-buttons');

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => editEvent(eventItem, eventObj));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteEvent(eventItem));

    eventButtons.appendChild(editButton);
    eventButtons.appendChild(deleteButton);

    eventItem.appendChild(eventContent);
    eventItem.appendChild(eventButtons);

    eventList.appendChild(eventItem);
}

function editEvent(eventItem, eventObj) {
    // Populate the form with the existing event details
    document.getElementById('eventName').value = eventObj.name;
    document.getElementById('eventDate').value = eventObj.date;
    document.getElementById('eventTime').value = eventObj.time;
    document.getElementById('eventLocation').value = eventObj.location;

    // Remove the old event item
    eventItem.remove();

    // Show or hide "No upcoming events" message
    toggleNoEventsMessage();
}

function deleteEvent(eventItem) {
    eventItem.remove();

    // Show or hide "No upcoming events" message
    toggleNoEventsMessage();
}

function sortEvents() {
    const eventList = document.getElementById('eventList');
    const events = Array.from(eventList.children);

    events.sort((a, b) => {
        const aDateTime = new Date(`${a.querySelector('span').textContent.split(' - ')[1].replace(' at ', 'T')}`);
        const bDateTime = new Date(`${b.querySelector('span').textContent.split(' - ')[1].replace(' at ', 'T')}`);
        return aDateTime - bDateTime;
    });

    events.forEach(event => eventList.appendChild(event));
}

function toggleNoEventsMessage() {
    const eventList = document.getElementById('eventList');
    const noEventsMessage = document.getElementById('noEventsMessage');
    noEventsMessage.style.display = eventList.children.length === 0 ? 'block' : 'none';
}

// Initial check for empty event list
toggleNoEventsMessage();
