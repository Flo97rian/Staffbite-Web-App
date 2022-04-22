import React, { useState, useImperativeHandle} from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Button, Row, Col } from "reactstrap";

// fake data generator
const getItems = (employees = {}, index) => {
  if (Object.keys(employees).length > 0) {
    return employeesSet(employees, index);
  } else {
    return noEmployeesSet(index);
  }};

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
      content: employees[k]
    }));
    return array;
  };

  //Ziel: Filter von allen Employees diejenigen mit der akutellen Position
  const getEmployees = (employees, index, targetPosition) => {
    let copyEmployees = [...employees];

      function createEmployeesIndexes (copyEmployees) {
        let array = Array.from({ length: copyEmployees.length }, (v, k) => k).map(k => (
          { 
            id: index + copyEmployees[k].SK,
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
const move = (source, destination, droppableSource, droppableDestination, empId, employees) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  empId = empId.substring(1)
  let filterEmployees = employees.filter(employee => employee.SK === empId);
  let indexOfEmployee = employees.indexOf(filterEmployees[0]);
  if(employees && employees[indexOfEmployee]) {
    if (destClone[0].id.length === 1) {
      const employee = sourceClone[droppableSource.index];
      const newid = droppableDestination.droppableId + empId;
      destClone.splice(0,1, {id: newid, content: employee.content});
    } else {
      const employee = sourceClone[droppableSource.index];
      const newid = droppableDestination.droppableId + empId;
      destClone.splice(droppableDestination.index ,0, {id: newid, content: employee.content});
    }
  }
  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;
  return [result, employees];
};
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

const getEmployeeStyle = (empSchichtenWocheBisher, empSchichtenWoche) => {
  if (empSchichtenWocheBisher > empSchichtenWoche) {
    return "text-warning font-weight-bold";
  } else if (empSchichtenWocheBisher < empSchichtenWoche ) {
    return "text-success font-weight-bold";
  } else {
    return "";
  }
};


const DragAndDropMitarbeiter = React.forwardRef((props, ref) => {
  const [state, setState] = useState([getEmployees(props.employees, 0), getItems(props.applicants, 1), getItems(props.setApplicants, 2)]);
  const [Employees, setEmployees] = useState(props.employees)
  const [showMore, setShowMore] = useState(false);
  useImperativeHandle(ref, () => (state[2]), [state]);


  const getItemContent = (item, employees, ind, index) => {
    let IsEmpty = item.id.length === 1
    let empId = item.id.substring(1)
    if (!IsEmpty && employees) {
      let filterEmployees = employees.filter(employee => employee.SK === empId);
      let indexOfEmployee = employees.indexOf(filterEmployees[0]);
      if(employees[indexOfEmployee]) {
          let empName = employees[indexOfEmployee].name;
          const empSchichtenWoche = employees[indexOfEmployee].schichtenwoche
          let dummyShifts = 0;
          if(Object.keys(item).includes("dummyShifts")) {
            dummyShifts = item.dummyShifts;
          }
          const empSchichtenWocheBisher = employees[indexOfEmployee].schichten.length + dummyShifts;
          return <div className="m-0 p-3 pr-0">
                  <Row className="">
                    <Col className="pr-0">
                      <p className={"m-0 p-0 " + getEmployeeStyle(empSchichtenWocheBisher, empSchichtenWoche)}>
                        {empName}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="8" className="pr-0">
                      <small className={getEmployeeStyle(empSchichtenWocheBisher, empSchichtenWoche)}>
                        { "Fortgeschritten" }
                        {" "}
                        { empSchichtenWocheBisher + "/" + empSchichtenWoche }
                      </small>
                    </Col>
                    <Col className="pl-0">
                      <Row className="m-0 p-0 text-sm-right">
                        <Col className="p-0">
                          {empSchichtenWocheBisher > empSchichtenWoche ? <i className="fas fa-exclamation text-warning m-0 p-0 pr-2"></i> : <></> }
                          {Number(ind) === 2 && item.content !== "Leer" ? 
                        <span
                          className="fas fa-user-times m-0 p-0"
                          onClick={() => handleDelete(ind, index, item)}
                        >
                        </span>
                        :
                        <></>}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
        }
    }
    else {
      return <small>Schicht nicht belegt</small>
    }
  }

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
      let filterNewEmployee = newState[dInd].filter(employee => state[dInd].indexOf(employee) === -1);
      filterNewEmployee.forEach(employee => {
        if(Object.keys(employee).includes("dummyShifts") === false) {
          let index = newState[dInd].indexOf(employee);
          newState[dInd][index]["dummyShifts"] = 1;
        }
        if(Object.keys(employee).includes("dummyShifts") === true) {
          let index = newState[dInd].indexOf(employee);
          newState[dInd][index]["dummyShifts"] = 1;
        }
      });
      setState(newState);
    }
  }

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
    } else {
      return (
        <p>Bewerber</p>
      )
    }
  }

  function handleDelete(ind, index, item) {
    const newState = [...state];
    const newEmployees = Employees;
    setEmployees(newEmployees);
    if (newState[ind].length === 1) {
      newState[ind][index].id = String(ind);
      newState[ind][index].content = "Leer";
    } else {
      newState[ind].splice(index, 1);
    }
    setState(newState);
  }
  const Mitarbeitercount = state[2][0].id.length === 1 ? 0 : state[2].length
  const title = ["Alle Mitarbeiter", "Alle Bewerber", "Eingesetzte Mitarbeiter " + Mitarbeitercount + "/" + props.anzahl]

  return (
    <>
      <div style={{ display: "flex"}}>
        <DragDropContext onDragEnd={onDragEnd}>
          {state.map((el, ind) => (
            <Droppable key={ind} droppableId={`${ind}`}>
              {(provided, snapshot) => (
                <div
                  className="list-group"
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
                >
                <p>{renderTitle(ind)}</p>
                  {el.map((item, index) => {
                      if(index === 3 && !showMore) return <div
                      onClick={() => setShowMore(true)}
                      color="primary"
                      style={{
                        display: "flex",
                        justifyContent: "space-around"
                      }}
                      className="mx-3"
                    >
                    <p className="text-primary">
                      Mehr anzeigen
                    </p>
                    </div>;
                      if(index > 3 && !showMore) return null;
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
                          <div
                          >
                            {getItemContent(item, Employees, ind, index)}
                          </div>
                        </div>
                        )}}
                    </Draggable>
                    {Object.keys(el).length - 1 === index && index > 3 ?<div
                      onClick={() => setShowMore(false)}
                      color="primary"
                      style={{
                        display: "flex",
                        justifyContent: "space-around"
                      }}
                      className="mx-3"
                    >
                    <p className="text-primary">
                      Weniger anzeigen
                    </p>
                    </div>
                    : 
                    <></>
                    }
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
export default DragAndDropMitarbeiter