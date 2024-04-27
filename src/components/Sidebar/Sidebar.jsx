import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import logout from '../../assets/logout.png'
import { useAuthContext } from '../../contexts/AuthContext'

export const Sidebar = ({ setFilterData, filterData, setIsFilterClear }) => {
  Sidebar.propTypes = {
    setFilterData: Function,
    filterData: Object,
    setIsFilterClear: Function,
  }

  const [filterToggle, setFilterToggle] = useState(false)
  const { setIsLogout } = useAuthContext()

  return (
    <div className="side-bar-main-div">
      <NavLink className="active" to="/">
        Home
      </NavLink>
      <NavLink to="/task-complete">Completed Task</NavLink>
      <div className="filter">
        <span onClick={() => setFilterToggle(!filterToggle)}>Filter</span>
        {filterToggle && (
          <div className="filter-by">
            <div className="by-priority">
              <span>By priority</span>
              <label
                onClick={() => {
                  setFilterData({ ...filterData, priority: 'low' }),
                    setIsFilterClear(true)
                }}
              >
                <input
                  type="radio"
                  name="priority"
                  value="Low"
                  checked={filterData?.priority === 'low'}
                />
                Low
              </label>
              <label
                onClick={() => {
                  setFilterData({ ...filterData, priority: 'medium' }),
                    setIsFilterClear(true)
                }}
              >
                <input
                  type="radio"
                  name="priority"
                  value="Medium"
                  checked={filterData?.priority === 'medium'}
                />
                Medium
              </label>
              <label
                onClick={() => {
                  setFilterData({ ...filterData, priority: 'high' }),
                    setIsFilterClear(true)
                }}
              >
                <input
                  type="radio"
                  name="priority"
                  value="High"
                  checked={filterData?.priority === 'high'}
                />
                High
              </label>
            </div>
            <div className="by-date">
              <span>By Date</span>
              <label
                onClick={() => {
                  setFilterData({ ...filterData, order: 'ascending' }),
                    setIsFilterClear(true)
                }}
              >
                <input
                  type="radio"
                  name="date"
                  value="ascending"
                  checked={filterData?.order === 'ascending'}
                />
                Recents
              </label>
              <label
                onClick={() => {
                  setFilterData({ ...filterData, order: 'descending' }),
                    setIsFilterClear(true)
                }}
              >
                <input
                  type="radio"
                  name="date"
                  value="descending"
                  checked={filterData?.order === 'descending'}
                />
                Old
              </label>
            </div>
            <button
              onClick={() => {
                setFilterData({ priority: 'all', order: 'all' }),
                  setIsFilterClear(false)
              }}
            >
              Clear
            </button>
          </div>
        )}
      </div>
      <div
        className="logout"
        onClick={() => {
          localStorage.removeItem('toDoToken')
          setIsLogout((prev) => !prev)
        }}
      >
        <img src={logout} alt="log out" />
        <span>Logout</span>
      </div>
    </div>
  )
}
