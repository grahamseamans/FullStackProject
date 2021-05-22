export function SearchBar() {
    return (
        // add call to backend!
      <form onSubmit={(e) => console.log(e)}>
        <input
          type="text"
          className="input"
          onChange={(e) => console.log(e)}
        />
      </form>
    );
  }