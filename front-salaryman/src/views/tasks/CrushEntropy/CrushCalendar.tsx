import { CrushLine } from "../../../types/CrushLine"
import useFitText from "./hooks/useFitText"
import React from "react"

export default function CrushCalendar(props: {lines: CrushLine[]}) {
  var columnOneLines = props.lines.filter(line => line.column == 1)
  var columnTwoLines = props.lines.filter(line => line.column == 2)
  var columnThreeLines = props.lines.filter(line => line.column == 3)

  return (
    <div className="max-h-90vh h-90v, overflow-auto relative flex flex-column">
      <HoursDisplay />
      <div className="flex flex-row h-1080 relative">
        <CalendarRow lines={columnOneLines} />
        <CalendarRow lines={columnTwoLines} />
        <CalendarRow lines={columnThreeLines} />
      </div>
    </div>
  )
}

function HoursDisplay() {
  var hours = [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
  const now = new Date();
  const [currentMinutes, setCurrentMinutes] = React.useState(now.getHours()*60 + now.getMinutes())

  React.useEffect(() => {
    setInterval(() => {
      const now = new Date();
      setCurrentMinutes(now.getHours()*60 + now.getMinutes())
    }, 60000);
  }, []);

  return (
    <div className="basis-5">
      {hours.map(hour => {
        return (
          <div>
            <div className="absolute w-full border-t border-slate-300 z-10" style={{top: 60*(hour-6)}}></div>
            <div className="absolute" style={{top: 60*(hour-6)}}>{hour}</div>
          </div>
        )
      })}
      <div className="absolute w-full border-t border-red-500 z-10" style={{top: currentMinutes-6*60}}></div>
    </div>
  )
}

function CalendarRow(props: { lines: CrushLine[] }) {
  return (
    <div className="">
      {
        props.lines.map(line => {
          return <CalendarBlock line={line} />
        })
      }
    </div>
  )

}
function CalendarBlock(props: { line: CrushLine}) {
  const startPixel = calculatePixelFromTime(props.line.start)
  const endPixel = calculatePixelFromTime(props.line.end)
  const height = endPixel-startPixel
  const numberOfCharacters = props.line.text.length

  const { fontSize, ref } = useFitText()
  return (
    <div ref={ref} className="absolute border border-orange-200" style={{
      top: startPixel,
      left: 120*(props.line.column - 1),
      width:"120px",
      height: height,
      fontSize,
      backgroundColor: "#e1edfc"
    }}>
      {props.line.text}
    </div>
  )
}

function calculatePixelFromTime(start: number) {
  const hours = Math.floor(start/100) - 6 // get hours elipsed starting from 6:00
  const minutes = start % 100 //ignore 6:70 for now we assume correctness
  return hours*60 + minutes
}