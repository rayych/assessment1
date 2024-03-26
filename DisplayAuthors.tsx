interface DisplayAuthorsProps {
  authors: string[];
}

const DisplayAuthors: React.FC<DisplayAuthorsProps> = ({ authors }) => {
  return (
    <div>
      <h2>Submitted Authors</h2>
      <ul>
        {authors.map((author, index) => (
          // Using the author name as a key; ensure they are unique or consider a different approach
          <li key={author + index}>{author}</li>
        ))}
      </ul>
    </div>
  );
}

export default DisplayAuthors;

  