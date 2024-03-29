import React, { useState, useImperativeHandle} from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";

// fake data generator
const getItems = (employees = {}, index) => {
  if (  Object.keys(employees).length > 0) {
    return employeesSet(employees, index);
  } else {
    return noEmployeesSet(index);
  }};

const validateHasAfterPublish = (isPublished, applyed, applicantsAfterPublish) => {
  if(isPublished) return applicantsAfterPublish
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
    let copyEmployees = {...employees};

      function filterEmployeesWithTargetedPosition (copyEmployees, targetPosition) {
          for (let [employeeId, EmployeeValues] of Object.entries(copyEmployees)) {
              if ( !(EmployeeValues.position.includes(targetPosition))) {
                delete copyEmployees[employeeId];
        }}
        return copyEmployees;
      }

      function createEmployeesIndexes (copyEmployees) {
        let array = Array.from({ length: Object.keys(copyEmployees).length }, (v, k) => k).map(k => (
          { 
            id: index + Object.keys(copyEmployees)[k],
            content: employees[Object.keys(copyEmployees)[k]].name
          }
        ));
        return array;
      }

    filterEmployeesWithTargetedPosition(copyEmployees, targetPosition);
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
    if (employees[empId]["dummyshifts"]){
      employees[empId].dummyshifts = employees[empId].dummyshifts + 1;
    } else {
      employees[empId].dummyshifts = 1;
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
  padding: grid * 2,
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

const getItemContent = (item, employees) => {
  let IsEmpty = item.id.length === 1
  let empName = item.content;
  let empId = item.id.substring(1)
  if (!IsEmpty && employees) {
    if(employees[empId]) {
      if(employees[empId]["dummyshifts"]) {
        if (employees[empId].dummyshifts !== undefined) {
          const empErfahrung = employees[item.id.substring(1)].erfahrung;
          const empName = item.content;
          const empSchichtenWoche = employees[item.id.substring(1)].schichtenwoche;
          const empSchichtenBisher = employees[item.id.substring(1)].dummyshifts;
          return <small>{empName}<br/><small>{ empErfahrung }{" "}{ empSchichtenBisher + "/" + empSchichtenWoche }</small></small>
        }
      }
      else {
        const empErfahrung = employees[item.id.substring(1)].erfahrung
        const empSchichtenWoche = employees[item.id.substring(1)].schichtenwoche
        return <small>{empName}<br/><small>{ empErfahrung }{" "}{ "0/" + empSchichtenWoche }</small></small>
      }
    }
  }
  else {
    return <small>{empName}<br/><small>Schicht nicht belegt</small></small>
  }
}

const SelectEmployeesForShift = React.forwardRef((props, ref) => {
    const applicants = useSelector(state => state.Shiftplan.plan[state.shiftSlot.index][state.shiftSlot.day].applicants)
    const applicantsAfterPublish = useSelector(state => state.Shiftplan.plan[state.shiftSlot.index][state.shiftSlot.day].applicantsAfterPublish)
    const setApplicants = useSelector(state => state.Shiftplan.plan[state.shiftSlot.index][state.shiftSlot.day].setApplicants)
    const employees = useSelector(state => state.DB.employees);
    const position = useSelector(state => state.Shiftplan.plan[state.shiftSlot.index].Wochentag.ShiftPosition);
    const anzahl = useSelector(state => state.Shiftplan.plan[state.shiftSlot.index][state.shiftSlot.day].anzahl)
    const isPublished = useSelector(state => state.Shiftplan.id.split("#")[1] === "Veröffentlicht");
    const [state, setState] = useState(
                                [
                                    getEmployees(employees, 0, position),
                                    getItems(validateHasAfterPublish(isPublished, applicants, applicantsAfterPublish), 1),
                                    getItems(setApplicants, 2)
                                ]);
    const [Employees, setEmployees] = useState(employees);

  useImperativeHandle(ref, () => (state[2]), [state]);


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
    } else if (index === 1 && props.isPublished) {
      return (
        <p>Bewerber seit Veröffentlichung</p>
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
    newEmployees[item.id.substring(1)].dummyshifts = newEmployees[item.id.substring(1)].dummyshifts - 1;
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
  const title = ["Alle Mitarbeiter", "Alle Bewerber", "Eingesetzte Mitarbeiter " + Mitarbeitercount + "/" + anzahl]

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
                  {el.map((item, index) => (
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
                            style={{
                              display: "flex",
                              justifyContent: "space-around"
                            }}
                          >
                            {getItemContent(item, Employees)}
                            {Number(ind) === 2 && Employees[item.id.substring(1)] ? <span
                              className="fas fa-user-times float-right"
                              onClick={() => handleDelete(ind, index, item)
                              }
                            >
                            </span> : <></>}
                          </div>
                        </div>
                        )}}
                    </Draggable>
                  ))}
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
export default SelectEmployeesForShift