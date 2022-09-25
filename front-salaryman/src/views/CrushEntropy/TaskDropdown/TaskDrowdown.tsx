export default function TaskDropdown(props: {isShowing: boolean, dropdownCoords: {x: number, y: number}}) {
  var element = <></>
  if (props.isShowing) {
    element = <div 
      style={{
        position: "absolute",
        left: props.dropdownCoords.x,
        top: (props.dropdownCoords.y + 20)
      }}
      className="bg-slate-200"
    >
      This is dropdown
    </div>
  }

  return element
}