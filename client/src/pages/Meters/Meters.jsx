import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "./Card";
import { useDrop } from "react-dnd";
import "../../css/Chart.css";
import { Resizable } from "re-resizable";

// import "../App.css";

//Images

const PictureList = [
  {
    id: 1,

    name: "Meter",
  },
  {
    id: 2,

    name: "Meter",
  },
  {
    id: 3,

    name: "Meter",
  },
  {
    id: 4,

    name: "Meter",
  },
  {
    id: 5,

    name: "Meter",
  },
  {
    id: 6,

    name: "Meter",
  },
  {
    id: 7,

    name: "Meter",
  },
  {
    id: 8,

    name: "Meter",
  },
];

const Meters = () => {
  const [board, setBoard] = useState([]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item) => addImageToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addImageToBoard = (id) => {
    const pictureList = PictureList.filter((picture) => id === picture.id);
    setBoard((board) => [...board, pictureList[0]]); //for multiple drag and drop
    //setBoard([pictureList[0]]); // for replacing
  };

  return (
    <>
      <div className="mainMeterContainer">
        <div className="meters" ref={drop}>
          {board.map((picture) => {
            return (
              <>
                <Card
                  // url={linechart}
                  component={picture.component}
                  id={picture.id}
                  name={picture.name}
                />
              </>
            );
          })}
        </div>
        <Resizable className="meterContainer">
          {PictureList.map((picture) => {
            return (
              <>
                <Card url={picture.url} id={picture.id} name={picture.name} />
              </>
            );
          })}
        </Resizable>
      </div>
    </>
  );
};

export default Meters;
