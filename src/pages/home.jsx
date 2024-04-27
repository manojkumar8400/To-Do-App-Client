import { useState } from 'react'
import { Item, ProfileModal, Sidebar, TaskModal } from '../components'
import add from '../assets/plus1.png'
import { useDataContext } from '../contexts/FeatureContext'
import { useAuthContext } from '../contexts/AuthContext'
import "./style.scss";

const Home = () => {
  const { isProfilePreview } = useAuthContext();
  const { data, completeTask, setIsUpdateList } = useDataContext();
  const [showModal, setShowModal] = useState(false);
  const [editDataId, setEditDataId] = useState();
  const [filterData, setFilterData] = useState({
    priority: 'all',
    order: 'all'
  });
  const [isFilterClear, setIsFilterClear] = useState(false);

  return (
    <div className="home-page">
      {isProfilePreview && <ProfileModal />}
      <div className='secondary-div'>
        <div>
          <Sidebar setFilterData={setFilterData} filterData={filterData} setIsFilterClear={setIsFilterClear}/>
        </div>
        <div className='home-page-start'>
          <Item
            data={data?.data}
            completeTask={completeTask}
            setShowModal={setShowModal}
            setEditDataId={setEditDataId}
            filterData={filterData}
            isFilterClear={isFilterClear}
          />
          {showModal && (
            <div className="modal">
              <TaskModal
                setShowModal={setShowModal}
                editDataId={editDataId}
                setEditDataId={setEditDataId}
              />
            </div>
          )}
          <div
            className="add-task"
            onClick={() => {
              setShowModal(true), setIsUpdateList(true)
            }}
          >
            <img src={add} alt="add" />
            <h4>New Task</h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
