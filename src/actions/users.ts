
const API_URL = 'http://localhost:3001';

const makeUrl = (path: string) => `${API_URL}${path}`;

export const stepfulFetch = async (path: string, data?: RequestInit) => {
  const url = makeUrl(path);
  const response = await fetch(url, data);
  return response.json();
}

export async function loadUsers() {
  try {
    const users = await stepfulFetch('/users');
    console.log('USERS', users);
    return { users };
  } catch (err) {
    return []; // how to handle errors?
  }
}

export async function createUser() {
  // equivalent to a login / signup
  try {
    const user = await stepfulFetch('/users', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: 'Test User', email: `test_user+${new Date().getTime()}@example.com`, password: 'password', type: 'student' })
    });
    return { user };
  } catch (err) {
    return null; //how to handle error
  }
}

export async function fetchUser({ params }: { params: any }) {
  try {
    const user = await stepfulFetch(`/users/${params.userId}`);
    return { user }
  } catch (err) {
    return null;
  }
}
