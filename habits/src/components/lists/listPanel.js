import { useContext } from 'react'
import { Context } from '../../Context.js'
import List from './list.js'

const ListPanel = () => {
    const { lists, setLists } = useContext(Context);

    const FullListPanel = () => {
      return (
        <div>
          { lists.map((list, index) => <List list={list}/>) }
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
      console.log(lists);
      if ( lists.length > 0 )
        return <FullListPanel />
      else
        return <EmptyListPanel />
    }

    return (
      <div className='centered'>
        <div className='table'>
          <div className='tbody'>
            <ListBuilder />
          </div>
        </div>
      </div>
    )
}

export default ListPanel;