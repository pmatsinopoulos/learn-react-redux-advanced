import React from 'react'
import ContainerList from "../containers/ContainerList.js";
import SelectSubreddit from "../containers/SelectSubreddit.jsx";

const App = () => {
  return (
    <div>
      <h1>Reddits</h1>
      <SelectSubreddit />
      <ContainerList />
    </div>
  )
}

export default App