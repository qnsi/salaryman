import React, { FormEvent, ReactElement } from "react"
import { JsxElement } from "typescript"

type Card = {
  id: number
  text: string
  stage: string
}

export default function Kanban() {
  var initCards: Card[] = []

  const [cards, setCards] = React.useState(initCards)
  const [lastId, setLastId] = React.useState(1)
  const optionsCards = cards.filter((card: Card) => card.stage === "options")

  React.useEffect(() => {
    console.log(cards)
  }, [cards])

  return (
    <div className="grow basis-11/12 flex">
      <Spacer />

      <CardGrouper name="Options" cards={optionsCards}>
        <AddNewCard setCards={setCards} lastId={lastId} setLastId={setLastId}/>
      </CardGrouper>

      <Spacer />

      <CardGrouper name="Doing" cards={[]}>
        <div></div>
      </CardGrouper>

      <Spacer />

      <CardGrouper name="Done" cards={[]}>
        <div></div>
      </CardGrouper>
    </div>
  )
}

function CardGrouper(props: {name: string, cards: Card[], children: ReactElement}) {
  return (
    <div className="basis-3/12" style={{backgroundColor: "#faffee"}}>
      <div className="justify-center flex text-xl">
        {props.name}
      </div>
      {props.cards.map((card: Card) => {
        return (<div key={card.id}>{card.text}</div>)
      })}
      {props.children}
    </div>
  )
}

function Spacer() {
  return (
    <div className="basis-1/12"></div>
  )
}

function AddNewCard(props: {setCards: Function, lastId: number, setLastId: Function}) {
  const [value, setValue] = React.useState("")

  function submit(event: FormEvent) {
    event.preventDefault()
    props.setCards((cards: Card[]) => {
      return cards.concat([
        {
          id: props.lastId,
          text: value,
          stage: "options"
        }
      ])
    })
    props.setLastId((lastId: number) => lastId + 1)
    setValue("")
  }

  return (
    <form>
      <input value={value} type="text" onChange={(event) => {setValue(event.currentTarget.value)}} />
      <button onClick={submit}> Add</button>
    </form>
  )
}