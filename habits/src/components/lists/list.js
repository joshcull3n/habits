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

  if (currentList === list) {
    return (
      <div className='centered'>
        <div className="tr" onClick={() => handleListClick(list)}>
          <div className="td listTitle selected">{ list.title }</div>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className='centered'>
        <div className="tr" onClick={() => handleListClick(list)}>
          <div className="td listTitle">{ list.title }</div>
        </div>
      </div>
    )
  }
}

const ListContents = () => {
  const { lists, setLists, currentList, setCurrentList } = useContext(Context);

  if (currentList !== null) {
    var tempItems = Array.from(currentList.items);
    var tempCurrentList = JSON.parse(JSON.stringify(currentList));
    var tempLists = lists.map(list => list);
    var currentListIndex = lists.indexOf(currentList);
  }

  function generateItems() {
    if (tempItems && tempItems.length !== 0)
      return (
        tempItems.map((itemBody, index) => 
          <div className='tr'>
            <div className='td listContents' style={{display: 'flex'}}>
              <input type='checkbox' style={{ height:'20px', width:'20px', margin: '0px 10px' }}/>
              {itemBody}
            </div>
          </div>
        )
      )
    else
      return <div className='centered'><div className="tr"><div className='td listContents'>add your first list item below</div></div></div>
  }

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

  const SelectedList = () => {
    if (currentList === null) {
      return (
        <div>
          <div className='tr'><div className='td listContents'>please select a list</div></div>
        </div>
      )
    }
    else {
      return (
        <div>
          { generateItems() }
          <div className='centered'>
            <div className='tr'><input type='text' onKeyDown={handleNewItemEnter}></input></div>
          </div>
        </div>
      )
    }
  }

  return <SelectedList />
}

export default ListTitle;
export { ListContents };