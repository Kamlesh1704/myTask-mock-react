import './index.css'

const ListItem = props => {
  const {details} = props
  const {task, tag} = details
  return (
    <li>
      <p>{task}</p>
      <p>{tag}</p>
    </li>
  )
}

export default ListItem
