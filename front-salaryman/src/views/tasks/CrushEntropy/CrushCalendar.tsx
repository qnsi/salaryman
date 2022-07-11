import { CrushLine } from "../../../types/CrushLine"
import useFitText from "./hooks/useFitText"

export default function CrushCalendar(props: {lines: CrushLine[]}) {
  var columnOneLines = props.lines.filter(line => line.column == 1)
  var columnTwoLines = props.lines.filter(line => line.column == 2)
  var columnThreeLines = props.lines.filter(line => line.column == 3)
  return (
    <div className="max-h-90vh h-90v, overflow-auto relative">
      <div className="flex flex-row h-1080 relative">
        <CalendarRow lines={columnOneLines} />
        <CalendarRow lines={columnTwoLines} />
        <CalendarRow lines={columnThreeLines} />
      </div>
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