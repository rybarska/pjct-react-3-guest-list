import { useEffect, useState } from 'react';

export default function App() {
  const [firstName, setFirstName] = useState([]);
  const [lastName, setLastName] = useState([]);
  const [attending, setAttending] = useState(false);
  const [allGuests, setAllGuests] = useState([]);
  const [singleGuest, setSingleGuest] = useState([]);
  const [updatedGuest, setUpdatedGuest] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const baseUrl = 'https://b900ebe2-7e93-4ee3-b8d0-d70709118615.id.repl.co';

  useEffect(() => {
    async function getAllGuests(props) {
      const response = await fetch(`${baseUrl}/guests`);
      const data = await response.json();
      setAllGuests(data);
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

  async function deleteGuest(id) {
    const response = await fetch(`${baseUrl}/guests/${id}`, {
      method: 'DELETE',
    });
    const deletedGuest = await response.json();
    const filteredGuestsList = allGuests.filter(id !== deletedGuest.id);
    setAllGuests(filteredGuestsList);
    deleteGuest();
  }

  {
    /* useEffect(() => {
    async function getSingleGuest(id) {
      const response = await fetch(`${baseUrl}/guests/${id}`);
      const guest = await response.json();
      setSingleGuest(guest);
    }
    getSingleGuest();
  }, [singleGuest]); */
  }

  async function updateGuest(id) {
    const response = await fetch(`${baseUrl}/guests/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: true }),
    });
    const guest = await response.json();
    setUpdatedGuest(guest);
    updatedGuest.attending = attending;
    return updatedGuest;
    updateGuest();
  }

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
      <br />
      <div>
        <h5>Registered guests:</h5>

        {allGuests.map((props) => {
          return (
            <div key={`guest-${props.id}`}>
              {props.id} {props.firstName} {props.lastName} {props.attending}
              <button
                aria-label="Remove <first name> <last name>"
                onClick={() => {
                  deleteGuest(props.id);
                }}
              >
                Remove
              </button>
              <label>
                <input
                  aria-label="attending"
                  type="checkbox"
                  // 2. Use state variable (connect it to the input)
                  checked={props.attending}
                  // 3. Update the state variable when the user types something
                  onChange={(event) => {
                    // setAttending(event.currentTarget.checked);
                    updateGuest(props.id);
                  }}
                />
                Attending
              </label>
            </div>
          );
        })}
      </div>
      <br />
    </div>
  );
}
