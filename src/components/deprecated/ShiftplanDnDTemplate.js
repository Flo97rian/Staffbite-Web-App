import React, { useState, useEffect} from "react";
import {
  Col,
  Row,
} from "reactstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import SchichtplanElementEntwurf from "./ShiftplanElementTemplate";
import Spinner from 'react-bootstrap/Spinner';
import ShiftplanElement from "./ShiftplanElement";
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
  }));
return plan;
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

const ShiftplanDnDTemplate = (props) => {
  const [Items, setItems] = useState(getItems(props.shiftplan.plan));
  
  useEffect(() => {
    let newItems = getItems(props.shiftplan.plan)
    setItems(newItems)
  }, [props.shiftplan]);

  useEffect(() => {
    let copyItems = [...Items];
    props.onSwitch(copyItems);
  }, [Items]);

  function onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    if (result.destination.index === 0) {
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
      setItems(items);
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
    return (
      <>
      { Items !== undefined && "id" in Items[0] ?
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <table
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              <tbody>
                {Items.map((item, index) => ( Number(item.id) !== 0 && Number(item.id) !== Items.length - 1 ?
                  <Draggable key={"Entwurf" + String(item.id)} draggableId={item.id} index={index}>
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
                            <ShiftplanElement id={props.id} wochentag={item.Wochentag} index={Number(item.id)} col="Wochentag" anzahl={Items[index].Montag.anzahl} ItemLength={Items.length} currentItem={item} {...props}></ShiftplanElement>
                        </td>
                        <td style={{"padding": "0"}}>
                            <SchichtplanElementEntwurf wochentag={item.Montag} index={Number(item.id)} col="Montag" anzahl={Items[2].Montag} ItemLength={Items.length} currentItem={item} {...props}></SchichtplanElementEntwurf>
                        </td>
                        <td style={{"padding": "0"}}>
                            <SchichtplanElementEntwurf wochentag={item.Dienstag} index={Number(item.id)} col="Dienstag" anzahl={Items[2].Montag} ItemLength={Items.length} currentItem={item} {...props}></SchichtplanElementEntwurf>
                        </td>
                        <td style={{"padding": "0"}}>
                            <SchichtplanElementEntwurf wochentag={item.Mittwoch} index={Number(item.id)} col="Mittwoch" anzahl={Items[2].Montag} ItemLength={Items.length} currentItem={item} {...props}></SchichtplanElementEntwurf>
                        </td>
                        <td style={{"padding": "0"}}>
                            <SchichtplanElementEntwurf wochentag={item.Donnerstag} index={Number(item.id)} col="Donnerstag" anzahl={Items[2].Montag} ItemLength={Items.length} currentItem={item} {...props}></SchichtplanElementEntwurf>
                        </td>
                        <td style={{"padding": "0"}}>
                            <SchichtplanElementEntwurf wochentag={item.Freitag} index={Number(item.id)} col="Freitag" anzahl={Items[2].Montag} ItemLength={Items.length} currentItem={item} {...props}></SchichtplanElementEntwurf>
                        </td>
                        <td style={{"padding": "0"}}>
                            <SchichtplanElementEntwurf wochentag={item.Samstag} index={Number(item.id)} col="Samstag" anzahl={Items[2].Montag} ItemLength={Items.length} currentItem={item} {...props}></SchichtplanElementEntwurf>
                        </td>
                        <td style={{"padding": "0"}}>
                            <SchichtplanElementEntwurf wochentag={item.Sonntag} index={Number(item.id)} col="Sonntag" anzahl={Items[2].Montag} ItemLength={Items.length} currentItem={item} {...props}></SchichtplanElementEntwurf>
                        </td>
                    </tr>
                    )}
                  </Draggable>
                  :
                  <tr>
                    <td color="primary" style={{"padding": "0"}}>
                        <SchichtplanElementEntwurf wochentag={item.Wochentag} index={Number(item.id)} col="Wochentag" anzahl={Items[1].Montag} ItemLength={Items.length} currentItem={item} {...props}></SchichtplanElementEntwurf>
                    </td>
                    <td style={{"padding": "0"}}>
                        <SchichtplanElementEntwurf wochentag={item.Montag} index={Number(item.id)} col="Montag" anzahl={Items[1].Montag} ItemLength={Items.length} currentItem={item} {...props}></SchichtplanElementEntwurf>
                    </td>
                    <td style={{"padding": "0"}}>
                        <SchichtplanElementEntwurf wochentag={item.Dienstag} index={Number(item.id)} col="Dienstag" anzahl={Items[1].Montag} ItemLength={Items.length} currentItem={item} {...props}></SchichtplanElementEntwurf>
                    </td>
                    <td style={{"padding": "0"}}>
                        <SchichtplanElementEntwurf wochentag={item.Mittwoch} index={Number(item.id)} col="Mittwoch" anzahl={Items[1].Montag} ItemLength={Items.length} currentItem={item} {...props}></SchichtplanElementEntwurf>
                    </td>
                    <td style={{"padding": "0"}}>
                        <SchichtplanElementEntwurf wochentag={item.Donnerstag} index={Number(item.id)} col="Donnerstag" anzahl={Items[1].Montag} ItemLength={Items.length} currentItem={item} {...props}></SchichtplanElementEntwurf>
                    </td>
                    <td style={{"padding": "0"}}>
                        <SchichtplanElementEntwurf wochentag={item.Freitag} index={Number(item.id)} col="Freitag" anzahl={Items[1].Montag} ItemLength={Items.length} currentItem={item} {...props}></SchichtplanElementEntwurf>
                    </td>
                    <td style={{"padding": "0"}}>
                        <SchichtplanElementEntwurf wochentag={item.Samstag} index={Number(item.id)} col="Samstag" anzahl={Items[1].Montag} ItemLength={Items.length} currentItem={item} {...props}></SchichtplanElementEntwurf>
                    </td>
                    <td style={{"padding": "0"}}>
                        <SchichtplanElementEntwurf wochentag={item.Sonntag} index={Number(item.id)} col="Sonntag" anzahl={Items[1].Montag} ItemLength={Items.length} currentItem={item} {...props}></SchichtplanElementEntwurf>
                    </td>
                </tr>
                ))}
              </tbody>
            </table>
          )}
        </Droppable>
      </DragDropContext>
      : 
      <>
      <br/>   
      <Row className="text-center">
        <br/>
        <Col xs={12}>
          <Spinner animation="grow" variant="light"/>
        </Col>
      </Row>
      </>
      }
      </>
    );
};

export default ShiftplanDnDTemplate
