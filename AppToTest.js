import { useEffect, useState } from 'react';

export default function App() {
  const [firstName, setFirstName] = useState([]);
  const [lastName, setLastName] = useState([]);
  const [attending, setAttending] = useState(false);
  //const [singleGuest, setSingleGuest] = useState([]);
  const [allGuests, setAllGuests] = useState([]);
  // const [isLoading, setIsLoading] = true;

  const baseUrl = 'https://b900ebe2-7e93-4ee3-b8d0-d70709118615.id.repl.co';

  /* useEffect(() => {
    async function getSingleGuest() {
      const response = await fetch(`${baseUrl}/guests/:id`);
      const data = await response.json();
      setSingleGuest(data);
    }
    if (singleGuest) {
      setIsLoading(false);
    }
    getSingleGuest();
  }, [singleGuest]); */

  useEffect(() => {
    async function getAllGuests() {
      const response = await fetch(`${baseUrl}/guests`);
      const data = await response.json();
      setAllGuests(data);
    }
    if (allGuests) {
      setIsLoading(false);
    }
    getAllGuests();
  }, [allGuests]);

  async function createGuest() {
    const response = await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName: firstName, lastName: lastName }),
    });
    const createdGuest = await response.json();
  }

  async function updateGuest() {
    const response = await fetch(`${baseUrl}/guests/1`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: attending }),
    });
    const updatedGuest = await response.json();
  }

  async function deleteGuest() {
    const response = await fetch(`${baseUrl}/guests/1`, { method: 'DELETE' });
    const deletedGuest = await response.json();
  }

  // if (isLoading) return <>is Loading...</>;

  return (
    <div data-test-id="guest">
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
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
      </form>
      <br />
      <br />
      <h1>Registered guests:</h1>

      <br />
      <br />
      <label>
        Attending
        <input
          aria-label="attending"
          type="checkbox"
          // 2. Use state variable (connect it to the input)
          checked={attending}
          // 3. Update the state variable when the user types something
          onChange={(event) => {
            setAttending(event.currentTarget.checked);
            updateGuest();
          }}
        />
      </label>
      {/* <button onClick=>{async()=>{

        const newGuest = await getAllGuests();
      }
      >Remove<button/>*/}
      {/* <button aria-label="Remove <first name> <last name>"onClick={{
         deleteGuest();
        }}>Remove</button> */}
    </div>
  );
}
