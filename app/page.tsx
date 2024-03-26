"use client";
import { useState, useEffect } from 'react';
import DisplayAuthors from '../components/DisplayAuthors';

export default function Home() {
  const [authors, setAuthors] = useState<string[]>([]);
  const [authorName, setAuthorName] = useState('');
  const [users, setUsers] = useState<any[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the form from reloading the page
    if (!authorName.trim()) return; // Prevent adding empty names
    
    setAuthors(prevAuthors => [...prevAuthors, authorName.trim()]); // Add the new author name
    setAuthorName(''); // Clear the input field after submission
  };

  useEffect(() => {
    // Fetch the list of users from the API and update the state
    const fetchUsers = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUsers(data); // Update the state with the fetched users
    };

    fetchUsers();
  }, []);

  // No onFormSubmit handler is passed to MyForm now
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex flex-col gap-4">
          <label htmlFor="authorName" className="block text-sm font-medium text-gray-700">
            Author Name:
          </label>
          <input
            type="text"
            id="authorName"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Submit
          </button>
        </div>
      </form>

      <div className="flex flex-col gap-10">
        <div>
          <h2 className="text-xl font-semibold mb-4">Author Names</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {authors.map((author, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {author}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Users</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
