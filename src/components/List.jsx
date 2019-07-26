import React from 'react'

const ListItemEntries = ({entries}) => {
  if (entries.items.length === 0) {
    return null
  }
  return (
    <ul>
      {entries.items.map((entry, index) => {
        return (
          <li key={index}>
            {entry.title}
          </li>
        )
      })}
    </ul>
  )
}

const List = ({state}) => (
  <div>
    <h1>{state.selectedSubreddit}</h1>
    <ul>
      {Object.entries(state.postsBySubreddit).map((entry, index) => {
        return (
          <li key={index}>
            {entry[0]}
            <ListItemEntries entries={entry[1]}/>
          </li>
        )
      })}
    </ul>
  </div>
)

export default List