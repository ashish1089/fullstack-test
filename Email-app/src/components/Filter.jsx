import React from 'react'

export default function Filter({ handleFilter, activeButton }) {
    return (
        <div className='py-6  flex items-center gap-3 '>
            <p>Filter By:</p>
            <div>
                <button className={`btn ${activeButton === 'all' ? 'btnActive' : ''}`} onClick={() => handleFilter('all')}>All</button >
                <button className={`btn ${activeButton === 'unread' ? 'btnActive' : ''}`} onClick={() => handleFilter('unread')}>Unread</button>
                <button className={`btn ${activeButton === 'read' ? 'btnActive' : ''}`} onClick={() => handleFilter('read')}>Read</button>
                <button className={`btn ${activeButton === 'favorites' ? 'btnActive' : ''}`} onClick={() => handleFilter('favorites')}>Favorites</button>
            </div >
        </div >
    )
}
