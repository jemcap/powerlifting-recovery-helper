import axios from "axios";
import { useEffect } from "react";
const baseUrl = "http://localhost:3001";

function App() {
  useEffect(() => {
    const getAll = () => {
      axios
        .get(`${baseUrl}/api/exercises`)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
    getAll();
  }, []);

  return <h1 className="text-3xl font-light underline">Hello world!</h1>;
}

export default App;
