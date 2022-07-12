import React from "react"
import { CrushLine } from "../../../../../types/CrushLine"

export default function useTranslateValue(value: string, setLines: Function) {
  React.useEffect(() => {
    const lines = value.split("\n")
    var initialCrushLines: CrushLine[] = []
    const crushLines: CrushLine[] = lines.reduce((result: CrushLine[], line) => {
      const translatedLine = translateLine(line, result) 
      if (translatedLine) {
        result.push(translatedLine)
      }
      return result
    }, initialCrushLines)

    setLines(crushLines)
  }, [value])

}

function translateLine(line: string, result: CrushLine[]) {
  if (line.length < 11) { return undefined }
  const start = Number(line.substring(0, 4))
  const end = Number(line.substring(5, 9))
  if (isNaN(start) || isNaN(end)) {
    return undefined
  }
  const column = getColumnAndUpdateState(start, end, result)
  const text = line.substring(10)
  const crushLine: CrushLine = {
    id: 0,
    day: new Date(),
    start,
    end,
    column,
    text,
    task_id: 0
  }
  return crushLine
}

function getColumnAndUpdateState(start: number, end: number, lines: CrushLine[]) {
  const linesWithColTwo = lines.filter(line => line.column == 2)
  for (const line of linesWithColTwo) {
    if (testOverlap(line.start, line.end, start, end)) {
      return 3
    }
  }
  const linesWithColOne = lines.filter(line => line.column == 1)
  for (const line of linesWithColOne) {
    if (testOverlap(line.start, line.end, start, end)) {
      return 2
    }
  }
  return 1
}

//(StartA <= EndB)  and  (EndA >= StartB)
//https://stackoverflow.com/questions/325933/determine-whether-two-date-ranges-overlap/325964#325964
function testOverlap(startA: number, endA: number, startB: number, endB: number) {
  return (startA < endB && endA > startB)
}