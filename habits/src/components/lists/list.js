import { useContext } from 'react'
import { Context } from '../../Context.js'

// List Object
// id, title, items, createdDate, editedDate

const ListTitle = ({ list }) => {
  const { currentList, setCurrentList } = useContext(Context);

  function handleListClick(list) {
    if (currentList === list)
      setCurrentList(null);
    else
      setCurrentList(list);
  }

  return (
    <div className="tr" onClick={() => handleListClick(list)}>
      <div className="td">{ list.title }</div>
    </div>
  )
}

const ListContents = () => {
  const { currentList } = useContext(Context);
  var items = currentList.items;
  return (
    <div>
      { items.map((itemBody, index) => <div className="tr"><div className="td">{itemBody}</div></div>)}
      <div className='tr'><input type='text'></input></div>
    </div>
  )
}

export default ListTitle;
export { ListContents };