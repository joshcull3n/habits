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
  const { lists, setLists, currentList, setCurrentList } = useContext(Context);
  var tempItems = Array.from(currentList.items);
  var tempCurrentList = JSON.parse(JSON.stringify(currentList));
  var tempLists = lists.map(list => list);
  var currentListIndex = lists.indexOf(currentList);

  // add item to list on enter
  const handleNewItemEnter = (e) => {
    var item = e.target.value.trim();
    if (e.key === 'Enter' && item) {
      tempItems = tempItems.concat(item);
      tempCurrentList.items = tempItems;
      if (currentListIndex > -1)
        tempLists[currentListIndex] = tempCurrentList;
      setCurrentList(tempCurrentList);
      setLists(tempLists);
    }
  }

  function generateItems() {
    if (tempItems.length !== 0)
      return tempItems.map((itemBody, index) => <div className="tr"><div className="td">{itemBody}</div></div>)
    else
      return <div className="tr"><div className="td"></div></div>
  }

  return (
    <div>
      { generateItems() }
      <div className='tr'><input type='text' onKeyDown={handleNewItemEnter}></input></div>
    </div>
  )
}

export default ListTitle;
export { ListContents };