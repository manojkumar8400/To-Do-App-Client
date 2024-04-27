import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'
import { useAuthContext } from './AuthContext'

const DataContext = createContext()

const DataProvider = ({ children }) => {
  console.log('feature wala')
  const { userData } = useAuthContext()
  const [data, setData] = useState([])
  const [completedTasks, setCompletedTasks] = useState([])
  const [fetchDataDependancy, setFetchDataDependancy] = useState(false)
  const [isUpdateList, setIsUpdateList] = useState(false)
  const [token, setToken] = useState(null)

  const userId = userData?.user?.userId
  console.log({ userData })
  useEffect(() => {
    console.log('inside useEffect feature wala')

    setToken(localStorage.getItem('toDoToken'))
    const allListFetch = async (userIdd) => {
      console.log(userIdd, ' inside async feature wala')

      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/fetchData?userId=${userIdd}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          { withCredentials: true }
        )
        setData(data)
      } catch (error) {
        console.log(error)
      }
    }
    setTimeout(() => {
      allListFetch(userId)
    }, 3000)
  }, [fetchDataDependancy])

  const createList = async (itemData) => {
    try {
      const { data } = await axios.post(
        'http://localhost:4000/api/create',
        itemData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (data.statusCode === 201) {
        setFetchDataDependancy(!fetchDataDependancy)
      }
      return data
    } catch (error) {
      console.error(error)
    }
  }

  const deleteList = async (id, taskComplete) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/deleteData/${id}?taskComplete=${taskComplete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (data.statusCode === 200) {
        setFetchDataDependancy(!fetchDataDependancy)
      }
      return data
    } catch (error) {
      console.error(error)
    }
  }

  const updateList = async (updatedData, id) => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/updateData/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (data.statusCode === 200) {
        setFetchDataDependancy(!fetchDataDependancy)
      }
      return data
    } catch (error) {
      console.error(error)
    }
  }

  const completeTask = async (id) => {
    try {
      const { data } = await axios.post(
        `http://localhost:4000/api/completeTask/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (data.statusCode === 200) {
        setFetchDataDependancy(!fetchDataDependancy)
      }
      return data
    } catch (error) {
      console.error(error)
    }
  }

  const fetchCompleteTask = async () => {
    let token = localStorage.getItem('toDoToken')
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/fetchCompletedTasks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setCompletedTasks(data)
      return data
    } catch (error) {
      console.error(error)
    }
  }

  const undoCompleteTask = async (id) => {
    try {
      const { data } = await axios.post(
        `http://localhost:4000/api/undoCompleteTask/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (data.statusCode === 200) {
        setFetchDataDependancy(!fetchDataDependancy)
      }
      return data
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <DataContext.Provider
      value={{
        data,
        createList,
        deleteList,
        updateList,
        isUpdateList,
        setIsUpdateList,
        completeTask,
        fetchCompleteTask,
        undoCompleteTask,
        completedTasks,
        fetchDataDependancy,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

const useDataContext = () => {
  // You should call useContext inside the component function, not outside
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider')
  }
  return context
}

export { DataProvider, useDataContext }
