import React, { FormEvent, ReactElement } from "react"
import { JsxElement } from "typescript"
import { getCardsFromBackend } from "../../api/Kanban/getCards"
import { saveCard } from "../../api/Kanban/saveCard"
import { updateCard } from "../../api/Kanban/updateCard"

export type KanbanCard = {
  id: number
  order: number
  text: string
  stage: string
}

export default function Kanban() {
  var initCards: KanbanCard[] = []

  const [cards, setCards] = React.useState(initCards)

  function filteredCards(stage: string) {
    return cards.filter((card: KanbanCard) => card.stage === stage)
  }

  const [draggedCardId, setDraggedCardId] = React.useState(0)

  React.useEffect(() => {
      getCardsFromBackend().then((response) => {
        setCards(response.data.cards)
      }).catch(error => {
        window.alert("We couldn't connect to the server! Try again.\n\n" + error)
      })
  }, [])

  function updateCardStage(stage: string) {
    // const draggedCard = cards.find(card => card.id === draggedCardId) as KanbanCard
    // if (draggedCard.stage === stage) {
    //   updateOrder(stage)
    // } else {
      updateStage(stage)
    // }
  }

  function updateCardOrder(stage: string, cardId: number) {
    const draggedCard = cards.find(card => card.id === draggedCardId) as KanbanCard
    const droppedCard = cards.find(card => card.id === cardId) as KanbanCard
    if (draggedCard.stage !== stage) {
      updateStage(stage)
    } else {
      updateCard(draggedCardId, stage, droppedCard.order).then((response) => {

      }).catch(error => {
        window.alert("We couldn't connect to the server! Try again.\n\n" + error)
      })
    }
  }

  function updateStage(stage: string) {
    updateCard(draggedCardId, stage, 0).then((response) => {
      setCards((prevState: KanbanCard[]) => {
        return prevState.map((card: KanbanCard) => {
          if (card.id === draggedCardId) {
            return {...card, stage}
          }
          return card
        })
      })
    }).catch(error => {
      window.alert("We couldn't connect to the server! Try again.\n\n" + error)
    })
  }

  function updateCardOrderWhileDragging(draggedOverCardId: number) {
    console.log("updateCardOrderWHielDragigin")
    console.log(draggedCardId, draggedOverCardId)
    console.log(cards)
    const draggedCard = cards.find(card => card.id === draggedCardId) as KanbanCard
    const draggedOverCard = cards.find(card => card.id === draggedOverCardId) as KanbanCard

    setCards((prevState: KanbanCard[]) => {
      const nextState =  prevState.map(card => {
        if (card.id == draggedCardId) {
          return {...card, order: draggedOverCard.order}
        }
        if (card.id == draggedOverCardId) {
          return {...card, order: draggedCard.order}
        }
        return card
      })
      // its not working because the vars are not observing state. 
      console.log(nextState)
      return nextState
    })
  }

  return (
    <div className="grow basis-11/12 flex">
      <Spacer />

      <CardGrouper name="options" cards={filteredCards("options")} updateCardStage={updateCardStage} updateCardOrder={updateCardOrder} updateCardOrderWhileDragging={updateCardOrderWhileDragging} setDraggedCardId={setDraggedCardId}>
        <AddNewCard setCards={setCards} />
      </CardGrouper>

      <Spacer />

      <CardGrouper name="doing" cards={filteredCards("doing")} updateCardStage={updateCardStage} updateCardOrder={updateCardOrder} updateCardOrderWhileDragging={updateCardOrderWhileDragging} setDraggedCardId={setDraggedCardId}>
        <div></div>
      </CardGrouper>

      <Spacer />

      <CardGrouper name="done" cards={filteredCards("done")} updateCardStage={updateCardStage} updateCardOrder={updateCardOrder} updateCardOrderWhileDragging={updateCardOrderWhileDragging} setDraggedCardId={setDraggedCardId}>
        <div></div>
      </CardGrouper>
    </div>
  )
}

function CardGrouper(props: {name: string, cards: KanbanCard[], updateCardStage: Function, updateCardOrder: Function, updateCardOrderWhileDragging: Function, setDraggedCardId: Function, children: ReactElement}) {
  function handleDragStart(e: React.DragEvent<HTMLDivElement>, card: KanbanCard) {
    e.currentTarget.style.opacity = '0.4';
    e.dataTransfer.effectAllowed = 'move';
    props.setDraggedCardId(card.id)
  }
  
  function handleDragEnd(e: React.DragEvent<HTMLDivElement>) {
    e.currentTarget.style.opacity = '1';
    props.setDraggedCardId(0)
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.stopPropagation();
    props.updateCardStage(props.name)
    return false;
  }

  function handleDropOnCard(e: React.DragEvent<HTMLDivElement>, card: KanbanCard) {
    e.stopPropagation();
    props.updateCardOrder(props.name, card.id)
    return false;
  }

  function handleDragEnter(e: React.DragEvent<HTMLDivElement>, draggedOverCard: KanbanCard) {
    props.updateCardOrderWhileDragging(draggedOverCard.id)
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>, draggedOverCard: KanbanCard) {
    e.preventDefault()
    return false
  }

  return (
    <div onDrop={handleDrop} onDragOver={(e) => {e.preventDefault()}} className="basis-3/12" style={{backgroundColor: "#faffee"}}>
      <div className="justify-center flex text-xl">
        {props.name}
      </div>
      {props.cards.sort((cardA, cardB) => cardA.order - cardB.order).map((card: KanbanCard) => {
        return (
          <div 
            className="bg-slate-100 m-1 p-1 cursor-move"
            draggable={true}
            onDragOver={(e: React.DragEvent<HTMLDivElement>) => handleDragOver(e, card)}
            onDragStart={(e: React.DragEvent<HTMLDivElement>) => handleDragStart(e, card)}
            onDragEnd={handleDragEnd}
            onDrop={(e: React.DragEvent<HTMLDivElement>) => handleDropOnCard(e, card)}
            onDragEnter={(e: React.DragEvent<HTMLDivElement>) => handleDragEnter(e, card)}
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

function AddNewCard(props: {setCards: Function}) {
  const [value, setValue] = React.useState("")

  function submit(event: FormEvent) {
    event.preventDefault()

    saveCard(value).then((response) => {
      props.setCards((cards: KanbanCard[]) => {
        return cards.concat([
          {
            id: response.data.card.id,
            text: response.data.card.text,
            stage: "options",
            order: response.data.card.order,
          }
        ])
      })
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