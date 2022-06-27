import React, { useState, useImperativeHandle, useEffect} from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { Button, Col, Row } from "reactstrap";

// fake data generator
const getItems = (employees = {}, index) => {
  if (Object.keys(employees).length > 0) {
    return employeesSet(employees, index);
  } else {
    return noEmployeesSet(index);
  }};

const validateHasAfterPublish = (isPublished, showAfterPublish, applyed, applicantsAfterPublish) => {
  if(isPublished && showAfterPublish) return applicantsAfterPublish
  return applyed
}

  const noEmployeesSet = (index) => {
    const array = [{
      id: String(index),
      content: "Leer"
    }];
    return array;
  };

  const employeesSet = (employees, index) => {
    const array = Array.from({ length: Object.keys(employees).length }, (v, k) => k).map(k => ({
      id: index + Object.keys(employees)[k],
      content: employees[Object.keys(employees)[k]]
    }));
    return array;
  };

  //Ziel: Filter von allen Employees diejenigen mit der akutellen Position
  const getEmployees = (employees, index, targetPosition) => {
    let copyEmployees = [...employees];

      function createEmployeesIndexes (copyEmployees) {
        let array = Array.from({ length: copyEmployees.length }, (v, k) => k).map(k => (
          { 
            id: index + String(copyEmployees[k].id),
            content: copyEmployees[k].name
          }
        ));
        return array;
      }

    let employeesArray = createEmployeesIndexes(copyEmployees);
    return employeesArray
      };

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const grid = 12;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: `${grid} ${grid} ${grid} ${grid}` ,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "#2dce89" : "#f6f9fc",

  // styles we need to apply on draggables
  ...draggableStyle,

});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "#fff" : "#fff",
  border: "1px solid #e9ecef",
  padding: grid,
  width: 250
});

const getEmployeeStyle = (empSchichtenWocheBisher, empSchichtenWoche, alreadySetToday) => {
  if (empSchichtenWocheBisher > empSchichtenWoche) {
    return "text-warning";
  } else if(alreadySetToday.length > 0) {
    return "text-warning"
  } else if (empSchichtenWocheBisher < empSchichtenWoche ) {
    return "";
  } else {
    return ""
  }
};


const EmployeesDnD = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const employees = useSelector(state => state.demo.demoEmployees);
  const event = useSelector(state => state.demo.demoPlans.find(event => event.id === state.temporary.eventId));
  const [state, setState] = useState([getEmployees(employees, 0), getItems(event.applicants, 1), getItems(event.setApplicants, 2)]);
  const [Employees, setEmployees] = useState(employees);
  console.log(Employees, state);
  const [showMore, setShowMore] = useState(false);

  useImperativeHandle(ref, () => (state[2]), [state]);

  useEffect(() => {
    console.log(employees);
    setEmployees(employees);
  }, [employees])


  function onDragEnd(result, employees) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;
    const catchdouble = catchDouble(result.draggableId, state[dInd])

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
    } else if (catchdouble.length > 0) {
        console.error("already set");
    } else {
      const moved = move(state[sInd], state[dInd], source, destination, result.draggableId, Employees);
      const newState = [...state];
      newState[sInd] = moved[0][sInd];
      newState[dInd] = moved[0][dInd];
      setState(newState);
    }
  }

  const move = (source, destination, droppableSource, droppableDestination, empId, employees) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    empId = empId.substring(1)
    if(employees && employees[empId]) {
      if (destClone[0].id.length === 1) {
        const employee = sourceClone[droppableSource.index];
        const newid = droppableDestination.droppableId + empId;
        destClone.splice(0,1, {id: newid, content: employee.content});
      } else {
        const employee = sourceClone[droppableSource.index];
        const newid = droppableDestination.droppableId + empId;
        destClone.splice(droppableDestination.index ,0, {id: newid, content: employee.content});
      }
      //dispatch(settingEmployeeDummyShift(empId));
    }
    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
    return [result, employees];
  };

  const getItemContent = (item, ind, index, employees) => {
    let IsEmpty = item.id.length === 1;
    let empId = item.id.substring(1);
    if (!IsEmpty && employees) {
      if(employees[empId]) {
          let empName = employees[empId].name;
          let dummyshifts = 0;
          if(employees[empId]?.dummyshifts) {
            dummyshifts = dummyshifts + employees[empId].dummyshifts
          }
          const empSchichtenWoche = employees[empId].schichtenwoche
          const employeeQualification = employees[empId].erfahrung;
          const currentZeitraumSchichten = []
          let alreadySetToday = [];
          const empSchichtenWocheBisher = currentZeitraumSchichten.length + dummyshifts;
          return <div className="m-0 px-3 py-2 pr-0">
                  <Row className="">
                    <Col xs="8" className="pr-0">
                      <p className={"m-0 p-0"}>
                        {empName}{" "} 
                      </p>
                    </Col>
                    <Col>
                      <Row className="text-right">
                        <Col>
                          <small>
                            <i
                              hidden={!(Number(ind) === 2 && item.content !== "Leer")}
                              className="fas fa-user-minus m-0 p-0"
                              onClick={() => {handleDelete(ind, index, item)}}
                            >
                            </i>
                          </small>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="9" className="pr-0">
                      <small className={getEmployeeStyle(empSchichtenWocheBisher, empSchichtenWoche, alreadySetToday)}>
                        <br/>
                        <i className={"fas fa-user-clock mr-1 "}></i>{ empSchichtenWocheBisher}{" Schichten"}
                        <br/>
                        {alreadySetToday.length > 0 && ind === 2 ? "heute bereits eingetragen" : <></> }
                      </small>
                    </Col>
                  </Row>
                </div>
        }
        if(empId === "TENANT") {
          let empName = "Eigentümer"
          return (
            <div className="m-0 px-3 py-2 pr-0">
          <Row className="">
                    <Col xs="8" className="pr-0">
                      <p className={"m-0 p-0"}>
                        {empName}{" "} 
                      </p>
                    </Col>
                    <Col>
                      <Row className="text-right">
                        <Col>
                          <small>
                            <i
                              hidden={!(Number(ind) === 2 && item.content !== "Leer")}
                              className="fas fa-user-minus m-0 p-0"
                              onClick={() => {handleDelete(ind, index, item)}}
                            >
                            </i>
                          </small>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                  <Col className="pr-0">
                    <small>
                      Eigentümer
                    </small>
                    </Col>
                </Row>
              </div>
            )
        }
      
        if(empId && !employees[empId]) {
          return <small>{""}<br/><small>Mitarbeiter existiert nicht.</small></small>
        }
    }
  };

  function catchDouble(id, items) {
    const emp = id.substring(1);
    const result = items.filter(item => item.id.substring(1) === emp);
    return result;
  }

  function renderTitle(index) {
    if(index === 0) {
      return (
        <p>{title[index]}</p>
      )
    } else if(index === 2) {
      return (
        <p>{title[index]}</p>
      )
    } else if (index === 1) {
      return (
        <p>
        </p>
      )
    } else {
      return (
        <p>Bewerber</p>
      )
    }
  }

  function removeEmployee(ind, index) {
    const newState = [...state];
    if (newState[ind].length === 1) {
      newState[ind][index].id = String(ind);
      newState[ind][index].content = "Leer";
    } else {
      newState[ind].splice(index, 1);
    }
    setState(newState);
  }

  function handleDelete(ind, index, item) {
    const newState = [...state];
    if(item.id.substring(1) !== "TENANT") {
      //dispatch(resettingEmployeeDummyShift(item.id.substring(1)));
    }
    if (newState[ind].length === 1) {
      newState[ind][index].id = String(ind);
      newState[ind][index].content = "Leer";
    } else {
      newState[ind].splice(index, 1);
    }
    setState(newState);
  }

  const Mitarbeitercount = state[2][0].id.length === 1 ? 0 : state[2].length
  const title = ["Alle Mitarbeiter", "Alle Bewerber", "Eingesetzte Mitarbeiter " + Mitarbeitercount + "/" + event?.NumberOfEmployees]

  return (
    <>
      <div style={{ display: "flex", height: "450px"}}>
        <DragDropContext onDragEnd={onDragEnd} >
          {state.map((el, ind) => (
            <Droppable key={ind} droppableId={`${ind}`}>
              {(provided, snapshot) => (
                <div
                  className="list-group"
                  ref={provided.innerRef}
                  style={{...getListStyle(snapshot.isDraggingOver), ...{overflowY: "scroll"}}}
                  {...provided.droppableProps}
                >
                <p>{renderTitle(ind)}</p>
                  {el.map((item, index) => {

                     return (
                      <>
                      <Draggable
                        className="list-group-item"
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => {
                          if (snapshot.isDragging) {
                            provided.draggableProps.style.left = provided.draggableProps.style.offsetLeft;
                            provided.draggableProps.style.top = Number(provided.draggableProps.style.top) - 15;
                          }
                          return ( 
                          <div
                            className="list-group"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <div>
                            {getItemContent(item, ind, index, Employees)}
                            </div>
                          </div>
                          )}}
                      </Draggable>
                    </>
                    )}
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </>
  );
})
export default EmployeesDnD;