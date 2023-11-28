import { useContext } from 'react'
import { Context } from '../../Context.js'
import ListTitle, { ListContents } from './list.js'

const ListPanel = () => {
    const { lists, setLists, currentList, setCurrentList } = useContext(Context);

    const handleNewListEnter = (e) => {
      if (e.key === 'Enter' && e.target.value.trim()) {
        var title = e.target.value.trim();
        var newList = generateNewList(title);
        var newLists = lists.concat(newList);
        setLists(newLists);
        setCurrentList(newList)
      }
    }

    function generateNewList(title) {
      return ({ 
          'id': generateId(),
          'title': title, 
          'items': [], 
          'createdDate' : new Date(), 
          'editedDate': new Date() 
        })
    }

    function generateId() { // TODO
      return '1234';
    }
 
    const RootListPanel = () => {
      return (
        <div>
          { lists.map((list, index) => <ListTitle list={list}/>) }
          <div className='tr'><input type='text' onKeyDown={handleNewListEnter}></input></div>
        </div>
      )
    }

    const ExpandedListPanel = () => {
      return (
        <div>
          <div className='td'>
            <RootListPanel />
          </div>
          <div className='td'>
            <ListContents />
          </div>
        </div>
      )
    }

    const EmptyListPanel = () => {
      return (
        <div className='tr'>
          <div className='td'>
            you don't have any lists m8
          </div>
        </div>
      )
    }

    const ListBuilder = () => {
      if (lists.Length === 0)
        return <EmptyListPanel />
      if ( currentList !== null )
        return <ExpandedListPanel selected={currentList} />
      else
        return <RootListPanel />
    }

    return (
      <div className='centered'>
        <div className='table'>
          <ListBuilder />
        </div>
      </div>
    )
}

export default ListPanel;