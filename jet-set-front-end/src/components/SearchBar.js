// https://www.digitalocean.com/community/tutorials/how-to-build-a-react-to-do-app-with-react-hooks
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