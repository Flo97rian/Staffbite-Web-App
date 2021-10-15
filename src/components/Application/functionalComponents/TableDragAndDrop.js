import React, { useState, useEffect, useImperativeHandle} from "react";
import {
  Col,
  Row,
} from "reactstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { SchichtplanElement } from "../../Admin/SchichtplanErstellen/SchichtplanListe/SchichtplanElement";
import store from "../../../store";
import { handleSwitchShiftOrder } from "../../Admin/SchichtplanErstellen/processing/handleSwitchShiftOrder";
import Spinner from 'react-bootstrap/Spinner'
// fake data generator
const getItems = (shiftsplan) => {
    const plan = shiftsplan.map((shift, index) => ({
    id: String(index),
    Wochentag: shift.Wochentag,
    Montag: shift.Montag,
    Dienstag: shift.Dienstag,
    Mittwoch: shift.Mittwoch,
    Donnerstag: shift.Donnerstag,
    Freitag: shift.Freitag,
    Samstag: shift.Samstag,
    Sonntag: shift.Sonntag
  }))
return plan
};

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};


const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: 0,

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  padding: 8,
  width: "100%"
});

const TableDnD = (props) => {
  const [Items, setItems] = useState(getItems(props.plaene[props.plan].plan))
  const [Valid, setItemsValid] = useState(!1)

  useEffect(() => {
      setItems(getItems(props.plaene[props.plan].plan));
      }, [props.plaene]);

  useEffect(() => {
    setItems(getItems(props.plaene[props.plan].plan));
    }, [props.plan]);

  useEffect(() => {
    props.onSwitch(Items)
    }, [Items]);

  function onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    if (result.destination.index === 0) {
      return;
    }
    if (result.destination.index === 1) {
      return;
    }
    if (result.destination.index === Items.length - 1) {
      return;
    }

    const items = reorder(
      Items,
      result.source.index,
      result.destination.index
    );
      setItems(items)
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
    return (
      <>
      { Valid ?
        <>
        <br/>   
        <Row className="text-center">
          <br/>
          <Col xs={12}>
            <Spinner animation="grow" variant="light"/>
          </Col>
        </Row>
        </>
      :
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <table
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              <tbody>
                {Items.map((item, index) => ( item.id !== "0" && item.id !== "1" && item.id !== String(Items.length - 1) ?
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                     {(provided, snapshot) => (
                      <tr>
                        <td color="primary"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}>
                            <SchichtplanElement wochentag={item.Wochentag} index={Number(item.id)} col="Wochentag" anzahl={"anzahl" in Items[2].Montag ? Items[2].Montag.anzahl : !1} ItemLength={Items.length} currentItem={item} {...props}></SchichtplanElement>
                        </td>
                        <td style={{"padding": "0"}}>
                            <SchichtplanElement wochentag={item.Montag} index={Number(item.id)} col="Montag" anzahl={"anzahl" in Items[2].Montag ? Items[2].Montag.anzahl : !1} ItemLength={Items.length} currentItem={item} {...props}></SchichtplanElement>
                        </td>
                        <td style={{"padding": "0"}}>
                            <SchichtplanElement wochentag={item.Dienstag} index={Number(item.id)} col="Dienstag" anzahl={"anzahl" in Items[2].Montag ? Items[2].Montag.anzahl : !1} ItemLength={Items.length} currentItem={item} {...props}></SchichtplanElement>
                        </td>
                        <td style={{"padding": "0"}}>
                            <SchichtplanElement wochentag={item.Mittwoch} index={Number(item.id)} col="Mittwoch" anzahl={"anzahl" in Items[2].Montag ? Items[2].Montag.anzahl : !1} ItemLength={Items.length} currentItem={item} {...props}></SchichtplanElement>
                        </td>
                        <td style={{"padding": "0"}}>
                            <SchichtplanElement wochentag={item.Donnerstag} index={Number(item.id)} col="Donnerstag" anzahl={"anzahl" in Items[2].Montag ? Items[2].Montag.anzahl : !1} ItemLength={Items.length} currentItem={item} {...props}></SchichtplanElement>
                        </td>
                        <td style={{"padding": "0"}}>
                            <SchichtplanElement wochentag={item.Freitag} index={Number(item.id)} col="Freitag" anzahl={"anzahl" in Items[2].Montag ? Items[2].Montag.anzahl : !1} ItemLength={Items.length} currentItem={item} {...props}></SchichtplanElement>
                        </td>
                        <td style={{"padding": "0"}}>
                            <SchichtplanElement wochentag={item.Samstag} index={Number(item.id)} col="Samstag" anzahl={"anzahl" in Items[2].Montag ? Items[2].Montag.anzahl : !1} ItemLength={Items.length} currentItem={item} {...props}></SchichtplanElement>
                        </td>
                        <td style={{"padding": "0"}}>
                            <SchichtplanElement wochentag={item.Sonntag} index={Number(item.id)} col="Sonntag" anzahl={"anzahl" in Items[2].Montag ? Items[2].Montag.anzahl : !1} ItemLength={Items.length} currentItem={item} {...props}></SchichtplanElement>
                        </td>
                    </tr>
                    )}
                  </Draggable>
                  :
                  <tr>
                    <td color="primary" style={{"padding": "0"}}>
                        <SchichtplanElement wochentag={item.Wochentag} index={Number(item.id)} col="Wochentag" anzahl={"anzahl" in Items[2].Montag ? Items[2].Montag.anzahl : !1} ItemLength={Items.length} currentItem={item} {...props}></SchichtplanElement>
                    </td>
                    <td style={{"padding": "0"}}>
                        <SchichtplanElement wochentag={item.Montag} index={Number(item.id)} col="Montag" anzahl={"anzahl" in Items[2].Montag ? Items[2].Montag.anzahl : !1} ItemLength={Items.length} currentItem={item} {...props}></SchichtplanElement>
                    </td>
                    <td style={{"padding": "0"}}>
                        <SchichtplanElement wochentag={item.Dienstag} index={Number(item.id)} col="Dienstag" anzahl={"anzahl" in Items[2].Montag ? Items[2].Montag.anzahl : !1} ItemLength={Items.length} currentItem={item} {...props}></SchichtplanElement>
                    </td>
                    <td style={{"padding": "0"}}>
                        <SchichtplanElement wochentag={item.Mittwoch} index={Number(item.id)} col="Mittwoch" anzahl={"anzahl" in Items[2].Montag ? Items[2].Montag.anzahl : !1} ItemLength={Items.length} currentItem={item} {...props}></SchichtplanElement>
                    </td>
                    <td style={{"padding": "0"}}>
                        <SchichtplanElement wochentag={item.Donnerstag} index={Number(item.id)} col="Donnerstag" anzahl={"anzahl" in Items[2].Montag ? Items[2].Montag.anzahl : !1} ItemLength={Items.length} currentItem={item} {...props}></SchichtplanElement>
                    </td>
                    <td style={{"padding": "0"}}>
                        <SchichtplanElement wochentag={item.Freitag} index={Number(item.id)} col="Freitag" anzahl={"anzahl" in Items[2].Montag ? Items[2].Montag.anzahl : !1} ItemLength={Items.length} currentItem={item} {...props}></SchichtplanElement>
                    </td>
                    <td style={{"padding": "0"}}>
                        <SchichtplanElement wochentag={item.Samstag} index={Number(item.id)} col="Samstag" anzahl={"anzahl" in Items[2].Montag ? Items[2].Montag.anzahl : !1} ItemLength={Items.length} currentItem={item} {...props}></SchichtplanElement>
                    </td>
                    <td style={{"padding": "0"}}>
                        <SchichtplanElement wochentag={item.Sonntag} index={Number(item.id)} col="Sonntag" anzahl={"anzahl" in Items[2].Montag ? Items[2].Montag.anzahl : !1} ItemLength={Items.length} currentItem={item} {...props}></SchichtplanElement>
                    </td>
                </tr>
                ))}
              </tbody>
            </table>
          )}
        </Droppable>
      </DragDropContext>
      }
      </>
    );
};

export default TableDnD

