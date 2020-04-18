import Link from 'next/link'
import React from 'react'

export default ({ link, isActive, text }) => {
  return (
    <>
      <Link href={ link }>
        <a className={ !isActive ? 'menu-item' : 'menu-item item-focus' }>
          { text }
        </a>
      </Link>
      <style jsx>{`
        .menu-item {
          height: 50px;
          color: #000c17;
          font-size: 18px;
          line-height: 50px;
          font-weight: 600;
          padding-left: 10px;
          margin-bottom: 5px;
        }
        .menu-item:hover, .menu-item:focus, .item-focus {
          background-color: rgba(51,183,255, 0.2);
          border-right: #33b7ff solid 2px;
          color: #33b7ff;
        }
      `}
      </style>
    </>
  )
}
