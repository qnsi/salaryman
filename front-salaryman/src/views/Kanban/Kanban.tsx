import React, { FormEvent, ReactElement } from "react"
import { JsxElement } from "typescript"
import { getCardsFromBackend } from "../../api/Kanban/getCards"
import { saveCard } from "../../api/Kanban/saveCard"
import { updateCard } from "../../api/Kanban/updateCard"

export type KanbanCard = {
  id: number
  text: string
  stage: string
}

export default function Kanban() {
  var initCards: KanbanCard[] = []

  const [cards, setCards] = React.useState(initCards)
  const [lastId, setLastId] = React.useState(1)
  const optionsCards = cards.filter((card: KanbanCard) => card.stage === "options")
  const doingCards = cards.filter((card: KanbanCard) => card.stage === "doing")
  const doneCards = cards.filter((card: KanbanCard) => card.stage === "done")

  React.useEffect(() => {
      getCardsFromBackend().then((response) => {
        setCards(response.data.cards)
      }).catch(error => {
        window.alert("We couldn't connect to the server! Try again.\n\n" + error)
      })
  }, [])

  function updateCardStage(id: number, stage: string) {
    updateCard(id, stage).then((response) => {
      setCards((prevState: KanbanCard[]) => {
        return prevState.map((card: KanbanCard) => {
          if (card.id === id) {
            return {...card, stage}
          }
          return card
        })
      })
    }).catch(error => {
      window.alert("We couldn't connect to the server! Try again.\n\n" + error)
    })
  }

  return (
    <div className="grow basis-11/12 flex">
      <Spacer />

      <CardGrouper name="options" cards={optionsCards} updateCardStage={updateCardStage}>
        <AddNewCard setCards={setCards} lastId={lastId} setLastId={setLastId}/>
      </CardGrouper>

      <Spacer />

      <CardGrouper name="doing" cards={doingCards} updateCardStage={updateCardStage}>
        <div></div>
      </CardGrouper>

      <Spacer />

      <CardGrouper name="done" cards={doneCards} updateCardStage={updateCardStage}>
        <div></div>
      </CardGrouper>
    </div>
  )
}

function CardGrouper(props: {name: string, cards: KanbanCard[], updateCardStage: Function, children: ReactElement}) {
  function handleDragStart(e: React.DragEvent<HTMLDivElement>, card: KanbanCard) {
    e.currentTarget.style.opacity = '0.4';
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData("text", String(card.id))
  }
  
  function handleDragEnd(e: React.DragEvent<HTMLDivElement>) {
    e.currentTarget.style.opacity = '1';
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.stopPropagation();
    const id = Number(e.dataTransfer.getData("text"))
    props.updateCardStage(id, props.name)
    return false;
  }

  return (
    <div onDrop={handleDrop} onDragOver={(e) => {e.preventDefault()}} className="basis-3/12" style={{backgroundColor: "#faffee"}}>
      <div className="justify-center flex text-xl">
        {props.name}
      </div>
      {props.cards.map((card: KanbanCard) => {
        return (
          <div 
            className="bg-slate-100 m-1 p-1 cursor-move"
            draggable={true}
            onDragStart={(e: React.DragEvent<HTMLDivElement>) => handleDragStart(e, card)}
            onDragEnd={handleDragEnd}
            key={card.id}
          >
            {card.text}
          </div>
        )
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

    saveCard(value).then((response) => {
      props.setCards((cards: KanbanCard[]) => {
        return cards.concat([
          {
            id: response.data.card.id,
            text: response.data.card.text,
            stage: "options"
          }
        ])
      })
      props.setLastId((lastId: number) => lastId + 1)
    })
    .catch(error => {
      window.alert("We couldn't connect to the server! Try again.\n\n" + error)
    })
    setValue("")
  }

  return (
    <form>
      <input value={value} type="text" onChange={(event) => {setValue(event.currentTarget.value)}} />
      <button onClick={submit}> Add</button>
    </form>
  )
}