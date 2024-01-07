import React from 'react'

const HistoryList = ({filteredHistory}) => {
  return (
    <div className='history'>
    {
        filteredHistory.map((item) => {
            return (
                <div className='history-item' key={item.id}>
                    {item.user}: {item.prize}
                </div>
            )
        })
    }
</div>
  )
}

export default HistoryList