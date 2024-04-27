/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useDataContext } from '../../contexts/FeatureContext'
import { useAuthContext } from '../../contexts/AuthContext'

export const TaskModal = ({ setShowModal, editDataId, setEditDataId }) => {

  const { data, createList, updateList, isUpdateList } = useDataContext();
  const { userData } = useAuthContext();
  
  const [listData, setListData] = useState({
    title: '',
    description: '',
    priority: '',
    dueDate: new Date(),
    createdAt: new Date(),
    userId: userData?.user?.userId
  });
  const filterData = data?.data?.filter((item) => item._id === editDataId)

  useEffect(()=>{
    setListData({
      ...listData,
      title: filterData[0]?.title,
      description: filterData[0]?.description,
      priority: filterData[0]?.priority,
      dueDate: new Date(filterData[0]?.dueDate),
    })
  },[]);

  const saveDataHandler = () => {
    isUpdateList ? createList(listData) : updateList(listData, editDataId);
    setShowModal(false), 
    setEditDataId()
    console.log({listData});
  };

  return (
    <div className="task-modal-main-div">
      <label>Title</label>
      <input
        onChange={(e) => setListData({ ...listData, title: e.target.value })}
        value={listData?.title}
        type="text"
        placeholder="Title..."
      />
      <label className="content-txt">Content</label>
      <textarea
        onChange={(e) => {
          setListData({ ...listData, description: e.target.value })
        }}
        cols="30"
        rows="5"
        placeholder="Enter note..."
        value={listData?.description}
      />
      <div className="priority-date-div">
        <div className="priority-div">
          <label>Priority</label>
          <input
            onClick={() => {
              setListData({ ...listData, priority: 'low' })
            }}
            className="first-input"
            type="radio"
            name="priority"
            value="low"
            checked={listData.priority === 'low'}
          />
          <label>Low</label>
          <input
            onClick={() => {
              setListData({ ...listData, priority: 'medium' })
            }}
            type="radio"
            name="priority"
            value="medium"
            checked={listData.priority === 'medium'}
          />
          <label>Medium</label>
          <input
            onClick={() => {
              setListData({ ...listData, priority: 'high' })
            }}
            type="radio"
            name="priority"
            value="high"
            checked={listData.priority === 'high'}
          />
          <label>High</label>
        </div>
        <div>
          <label className="due-date-label">Due date</label>
          <DatePicker
            selected={listData?.dueDate == "Invalid Date" ? new Date() : listData?.dueDate}
            onChange={(date) => setListData({ ...listData, dueDate: date })}
          />
        </div>
      </div>
      <div className="btn-div">
        <button
          className="close"
          onClick={() => {
            setShowModal(false), setEditDataId()
          }}
        >
          Close
        </button>
        <button
          onClick={saveDataHandler}
        >
          Save
        </button>
      </div>
    </div>
  )
}
