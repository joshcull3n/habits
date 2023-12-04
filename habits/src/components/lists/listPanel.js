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
          <div className='centered'>
            <div className='tr'><input type='text' onKeyDown={handleNewListEnter}></input></div>
          </div>
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
          <div className='td' style={{textAlign: 'center'}}>
            create a list below
            <RootListPanel />
          </div>
        </div>
      )
    }

    const ListBuilder = () => {
      if (lists.length === 0)
        return <EmptyListPanel />
      if ( currentList !== null )
        return <ExpandedListPanel />
      else
        return <ExpandedListPanel />
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