import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import ListItem from './ListItem'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// Replace your code here
class App extends Component {
  state = {
    taskInput: '',
    tagInput: tagsList[0].optionId,
    resultList: [],
    filteredList: [],
    showFilteredList: false,
  }

  onInput = event => {
    this.setState({taskInput: event.target.value})
  }

  onSelect = event => {
    this.setState({tagInput: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {taskInput, tagInput} = this.state
    const data = {
      id: uuidv4(),
      task: taskInput,
      tag: tagInput,
    }
    this.setState(prev => ({
      resultList: [...prev.resultList, data],
      taskInput: '',
    }))
  }

  onClickFilter = optionId => {
    this.setState(prev => ({
      filteredList: prev.resultList.filter(each => each.tag === optionId),
      showFilteredList: true,
    }))
  }
  
  renderinggs = () => {
    const {resultList} = this.state
    return (
      resultList.length === 0 ? (
          <div>
            <p>No Tasks Added Yet</p>
          </div>
        ) : (
          <ul>
            {resultList.map(each => (
              <ListItem details={each} key={each.id} />
            ))}
          </ul>
        ))
    
  }
  render() {
    const {resultList, tagInput, taskInput, filteredList, showFilteredList} =
      this.state
    return (
      <>
        <form onSubmit={this.onSubmitForm}>
          <h1>Create a Task</h1>
          <label htmlFor="Task">Task</label>
          <input
            type="text"
            id="Task"
            placeholder="Enter the task here"
            onChange={this.onInput}
            value={taskInput}
          />
          <label htmlFor="Tags">Tags</label>
          <select
            id="Tags"
            onChange={this.onSelect}
            value={tagInput}
            selected={tagsList[0].optionId}
          >
            {tagsList.map(each => (
              <option key={each.optionId} value={each.optionId}>
                {each.displayText}
              </option>
            ))}
          </select>
          <button type="submit">Add Task</button>
        </form>
        <h1>Tags</h1>
        <ul>
          {tagsList.map(each => (
            <button
              key={each.optionId}
              type="button"
              onClick={() => this.onClickFilter(each.optionId)}
            >
              <li key={each.optionId}>{each.displayText}</li>
            </button>
          ))}
        </ul>
        <h1>Tasks</h1>
        {showFilteredList ? (
          <ul>
            {filteredList.map(each => (
              <ListItem details={each} key={each.id} />
            ))}
          </ul>
        ) : this.renderinggs()}
      </>
    )
  }
}

export default App
