/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import pin from '../../assets/pin.png'
import filledPin from '../../assets/fill-pin.png'
import pencil from '../../assets/pen.png'
import deleteIcon from '../../assets/deleteIcon.png'
import correct from '../../assets/correct.png'
import cancel from '../../assets/cancel.png'
import { useDataContext } from '../../contexts/FeatureContext'

export const Item = ({
  data,
  setShowModal,
  setEditDataId,
  isPinHide = true,
  isEditHide = true,
  isTaskCompleted = false,
  filterData,
  isFilterClear,
}) => {
  Item.propTypes = {
    data: Array,
    setShowModal: Function,
    setEditDataId: Function,
    isPinHide: Boolean,
    isEditHide: Boolean,
    isTaskCompleted: Boolean,
    filterData: Object,
    isFilterClear: Boolean,
  }

  const { completeTask, undoCompleteTask, deleteList, setIsUpdateList } =
    useDataContext()
  const [pinnedItemId, setPinnedItemId] = useState(
    JSON.parse(localStorage.getItem('pinnedItemsArray'))
  )
  const [newUpdatedData, setNewUpdatedData] = useState([])
  const [duplicateData, setDuplicateData] = useState()

  const pinHandler = (id) => {
    const isAlreadyPinned = pinnedItemId.includes(id)
    if (isAlreadyPinned) {
      setPinnedItemId(pinnedItemId.filter((item) => item !== id))
    } else {
      setPinnedItemId([...pinnedItemId, id])
    }
  }

  useEffect(() => {
    localStorage.setItem('pinnedItemsArray', JSON.stringify(pinnedItemId))
    // Find pinned items
    const pinnedItems =
      data?.filter((item) => pinnedItemId.includes(item._id)) || []
    // const reversedPinnedItems = [...pinnedItems].reverse()

    // Remove pinned items from the original array
    const newData =
      data?.filter((item) => !pinnedItemId.includes(item._id)) || []
    setNewUpdatedData([...pinnedItems, ...newData])
    setDuplicateData([...pinnedItems, ...newData])
  }, [pinnedItemId, data])

  useEffect(() => {
    switch (filterData?.order) {
      case 'descending': {
        let prioData = data
        if (filterData.priority !== 'all') {
          prioData = data?.filter(
            (item) => item?.priority === filterData.priority
          )
        }
        setNewUpdatedData(
          prioData
            .slice()
            .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        )
        break
      }
      case 'ascending': {
        let prioData = data
        if (filterData.priority !== 'all') {
          prioData = data?.filter(
            (item) => item?.priority === filterData.priority
          )
        }
        setNewUpdatedData(
          prioData
            .slice()
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        )
        break
      }
      case 'all':
        isFilterClear
          ? setNewUpdatedData(
              data?.filter((item) => item?.priority === filterData.priority)
            )
          : setNewUpdatedData(duplicateData)
        break
      default:
        setNewUpdatedData(duplicateData)
    }
  }, [filterData])

  return (
    <div className="main-container">
      {newUpdatedData?.map((item) => {
        return (
          <div className="todo-items-main-div" key={item?._id}>
            <div className="text-content">
              {isPinHide &&
                (pinnedItemId?.includes(item?._id) ? (
                  <img
                    onClick={() => {
                      pinHandler(item._id)
                    }}
                    className={`pin ${
                      pinnedItemId?.includes(item?._id)
                        ? 'neutral-position'
                        : ''
                    }`}
                    src={filledPin}
                    alt="pinned"
                  />
                ) : (
                  <img
                    onClick={() => {
                      pinHandler(item._id)
                    }}
                    className={`pin`}
                    src={pin}
                    alt="pinned"
                  />
                ))}
              <div className="content-div">
                <p className="title">{item?.title}</p>
                <p className="discription">{item?.description}</p>
              </div>
            </div>

            <div className="item-bottom">
              <div className="date-prio-div">
                <span>{item?.priority}</span>
              </div>
              <div className="icons-div">
                {isEditHide && (
                  <img
                    onClick={() => {
                      setShowModal(true),
                        setEditDataId(item?._id),
                        setIsUpdateList(false)
                    }}
                    src={pencil}
                    alt="pencil"
                  />
                )}
                <img
                  onClick={() => deleteList(item?._id, isTaskCompleted)}
                  src={deleteIcon}
                  alt="delete"
                />
                {isTaskCompleted ? (
                  <img
                    onClick={() => undoCompleteTask(item?._id)}
                    src={correct}
                    alt="correct"
                  />
                ) : (
                  <img
                    onClick={() => completeTask(item?._id)}
                    src={cancel}
                    alt="cancel"
                  />
                )}
              </div>
            </div>
            <div className="date-div">
              <div>
                <span>Created at - </span>
                <span>{item?.createdAt?.split('T')[0]}</span>
              </div>
              <div>
                <span>Due date - </span>
                <span>{item?.dueDate?.split('T')[0]}</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
