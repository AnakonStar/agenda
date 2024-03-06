import * as React from 'react';

export default function UserContainer({ handleAddBtn }) {
    return (
      <div className='userContainer'>
        <div className='userData'>
          <div className='userPhoto'></div>
          <span>
            Username
          </span>
        </div>
        <button className='addContactBtn' onClick={handleAddBtn}>
          <span>
            +
          </span>
        </button>
      </div>
    )
  }