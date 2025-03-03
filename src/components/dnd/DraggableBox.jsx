import React from 'react'
import { useDrag } from 'react-dnd'

const DraggableBox = () => {
  const [{isDragging}, dragRef] = useDrag(() => ({
    type: "BOX",
    item: { name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }))

  return (
    <div>DraggableBox</div>
  )
}

export default DraggableBox