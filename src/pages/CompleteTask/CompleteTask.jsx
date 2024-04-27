import React, { useEffect } from 'react'
import { Item } from '../../components/Item/Item'
import { useDataContext } from '../../contexts/FeatureContext'
import { Header } from '../../components'
import "../style.scss";

const CompleteTask = () => {
  const { fetchCompleteTask, completedTasks, fetchDataDependancy } =
    useDataContext()

  useEffect(() => {
    fetchCompleteTask()
  }, [fetchDataDependancy])

  return (
    <div className="complete-task-main-div">
      <div className='complete-task-secondary-div'>
        <Item
          data={completedTasks.data}
          isPinHide={false}
          isEditHide={false}
          isTaskCompleted={true}
        />
      </div>
    </div>
  )
}

export default CompleteTask
