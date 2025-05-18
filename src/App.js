// // import React from "react";
// // import Path from "./router";


// // function App() {
 
// //    return <Path/>
  
// // }

// // export default App;
// import React, { createContext, useEffect, useState } from "react";
// import "./App.css";
// import Path from "./router";
// export const UserContext = createContext();
// function App() {
//   const [pageNo, setPageNo] = useState(1);
//   const [todosData, setTodosData] = useState([]);
//    // Changed from null to []
   
//   const todos = () => {
//     let url = `https://jsonplaceholder.typicode.com/todos/${pageNo}`;
//     fetch(url)
//       .then(response => response.json())
//       .then(json => {
//         setTodosData([...todosData,json]); // Append new todo to the list
//       })
//       .catch(error => {
//         console.error("Error fetching todos:", error);
//       });
//   };
//   useEffect(() => {
//     todos();
//   }, [pageNo]);
//   return (
//     <UserContext.Provider value={{ user: "John" }}>
//       <Path />
//       <div style={{ marginTop: "20px" }}>
//         <button onClick={() => setPageNo(pageNo + 1)}>Next Record</button>
//         {todosData.length > 0 && (
//           <div style={{ marginTop: "20px" }}>
//             <h2>Todo List</h2>
//             {todosData?.length > 0 && todosData.map((todo, index) => (
//               <div key={index} style={{ border: "1px solid #ccc", marginBottom: "10px", padding: "10px", borderRadius: "5px" }}>
//                 <p><strong>ID:</strong> {todo.id}</p>
//                 <p><strong>Title:</strong> {todo.title}</p>
//                 <p><strong>Completed:</strong> {todo.completed ? "Yes" : "No"}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </UserContext.Provider>
//   );
// }
// export default App;

import React, { createContext, useEffect, useState } from "react";
import "./App.css";
import Path from "./router";
export const UserContext = createContext();
function App() {
  const [pageNo, setPageNo] = useState(1);
  const [todosData, setTodosData] = useState([]); // Changed from null to []
  const post = () => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: "foo",
        body: "bar",
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };
  useEffect(() => {
    post();
  }, []);
  return (
    <UserContext.Provider value={{ user: "John" }}>
      <Path />
      {/* <div style={{ marginTop: "20px" }}>
        <button onClick={() => setPageNo(pageNo + 1)}>Next Record</button>
        {todosData.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <h2>Todo List</h2>
            {todosData?.length > 0 &&
              todosData.map((todo, index) => (
                <div
                  key={index}
                  style={{
                    border: "1px solid #ccc",
                    marginBottom: "10px",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                >
                  <p>
                    <strong>ID:</strong> {todo.id}
                  </p>
                  <p>
                    <strong>Title:</strong> {todo.title}
                  </p>
                  <p>
                    <strong>Completed:</strong> {todo.completed ? "Yes" : "No"}
                  </p>
                </div>
              ))}
          </div>
        )}
      </div> */}
    </UserContext.Provider>
  );
}
export default App;