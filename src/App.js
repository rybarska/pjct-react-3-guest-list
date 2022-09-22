import { useState } from 'react';

export default function App() {
  const [firstName, setFirstName] = useState([]);
  const [lastName, setLastName] = useState([]);
  const [isAttending, setIsAttending] = useState(false);

  const baseUrl = 'http://localhost:4000';

  async function getAllGuests() {
    const response = await fetch(`${baseUrl}/guests`);
    const allGuests = await response.json();
  }

  async function getSingleGuest() {
    const response = await fetch(`${baseUrl}/guests/:id`);
    const guest = await response.json();
  }

  async function createGuest() {
    const response = await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName: 'Karl', lastName: 'Horky' }),
    });
    const createdGuest = await response.json();
  }

  async function updateGuest() {
    const response = await fetch(`${baseUrl}/guests/1`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: true }),
    });
    const updatedGuest = await response.json();
  }

  async function deleteGuest() {
    const response = await fetch(`${baseUrl}/guests/1`, { method: 'DELETE' });
    const deletedGuest = await response.json();
  }

  /* async function addGuest(firstName, lastName, isAttending) {
    const guestData = await fetch;
    const newGuest = {
      firstName: firstName,
      lastName: lastName,
      isAttending: isAttending,
    };
    const newState = [guestList, newGuest];
    setGuestList(newState);
  } */

  return (
    <div data-test-id="guest">
      <form
      /* onSubmit={(event) => {
          event.preventDefault();
        }} */
      >
        <label>
          First name
          <input
            // 2. Use state variable (connect it to the input)
            value={firstName}
            // 3. Update the state variable when the user types something
            onChange={(event) => {
              setFirstName(event.currentTarget.value);
            }}
          />
        </label>
        <br />
        <br />
        <label>
          Last name
          <input
            // 2. Use state variable (connect it to the input)
            value={lastName}
            // 3. Update the state variable when the user types something
            onChange={(event) => {
              setLastName(event.currentTarget.value);
            }}
            onKeyPress={async (event) =>
              event.key === 'Enter' ? await createGuest() : null
            }
          />
        </label>
        <br />
        <br />
        <label>
          Attending
          <input
            aria-label="attending"
            type="checkbox"
            // 2. Use state variable (connect it to the input)
            checked={isAttending}
            // 3. Update the state variable when the user types something
            onChange={(event) => {
              setIsAttending(event.currentTarget.checked);
            }}
          />
        </label>
      </form>
    </div>
  );
}
