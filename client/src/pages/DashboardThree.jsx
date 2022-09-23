import React, { useState, useEffect, useContext } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Container, Row, Col } from "react-bootstrap";
import "../css/DashboardOne.css";
import uuid from "uuid/v4";
import styles from "../components/Navbar/Navbar.module.scss";
import { motion } from "framer-motion";

//Light Chart
import LineChartSingleValue from "../chartsEMS/LineChartSingleValue";
import LineAreaChartSingleValue from "../chartsEMS/LineAreaChartSingleValue";

//Dark Chart
import { Resizable } from "re-resizable";
import ChartDataContextAPI from "../Context/ChartDataContext/ChartDataContextAPI";

function DashboardThree() {
  const context = useContext(ChartDataContextAPI);

  const itemsLeftSide = [
    {
      id: uuid(),
      content: (
        <LineChartSingleValue
          name="Active Power"
          timestamp1={context.dateTime}
          parameterChart1={context.dataMeter.Active_Power_Total}
        />
      ),
    },

    {
      id: uuid(),
      content: (
        <LineAreaChartSingleValue
          name="Active Energy"
          timestamp1={context.dateTime}
          parameterChart1={context.dataMeter.Active_Energy}
        />
      ),
    },
  ];

  const columnsFromBackend = {
    [uuid()]: {
      items: itemsLeftSide,
    },
  };
  const [columns, setColumns] = useState(columnsFromBackend);
  console.log(columns);
  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  //   useEffect(() => {
  //     // setInterval(() => {
  //     //   setData();
  //     // }, 2000);
  //     setData();
  //   }, []);

  return (
    <>
      {/* <button onClick={change}>hello</button> */}

      <div
        style={
          window.innerWidth < 1024
            ? {
                display: "flex",
                maxWidth: "100vw",
                flexDirection: "column",
                justifyContent: "space-around",
              }
            : {
                display: "flex",
                maxWidth: "100vw",
                justifyContent: "space-around",
              }
        }
      >
        {/* <h1 className={styles.hello}>hello</h1> */}

        <DragDropContext
          DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div id="chartCard" key={columnId}>
                <h2>{column.name}</h2>
                <div style={{ margin: 0 }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <>
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={
                              window.innerWidth > 1024
                                ? {
                                    borderRadius: "10px",
                                    background: snapshot.isDraggingOver
                                      ? "lightblue"
                                      : "",
                                    padding: 4,
                                    width: "80vw",
                                    minHeight: 500,
                                  }
                                : {
                                    borderRadius: "10px",
                                    background: snapshot.isDraggingOver
                                      ? "lightblue"
                                      : "",
                                    padding: 4,
                                    width: "97vw",
                                    minHeight: 500,
                                  }
                            }
                          >
                            {column.items.map((item, index) => {
                              return (
                                <Draggable
                                  key={item.id}
                                  draggableId={item.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <>
                                        <Container fluid>
                                          <motion.div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            id="chartColor"
                                            style={{
                                              borderRadius: "10px",
                                              userSelect: "none",
                                              padding: 16,
                                              margin: "0 0 8px 0",
                                              // minHeight: "50px",
                                              // backgroundColor:
                                              //   snapshot.isDragging
                                              //     ? "white"
                                              //     : "white",
                                              // color: "white",
                                              ...provided.draggableProps.style,
                                            }}
                                            // animate={{ scale: 1 }}
                                            // initial={{ scale: 0.9 }}
                                            transition={{
                                              ease: "easeOut",
                                              duration: 0.65,
                                            }}
                                          >
                                            {item.content}
                                          </motion.div>
                                        </Container>
                                      </>
                                    );
                                  }}
                                </Draggable>
                              );
                            })}
                            {provided.placeholder}
                          </div>
                        </>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </>
  );
}

export default DashboardThree;
