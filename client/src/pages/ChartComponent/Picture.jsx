import React from "react";
import { useDrag } from "react-dnd";
import { motion } from "framer-motion";

function Picture({ id, url, component, name }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <>
      {/* <img
        ref={drag}
        src={url}
        width="150px"
        style={{ border: isDragging ? "5px solid pink" : "0px" }}
      /> */}
      <div
        ref={drag}
        style={{
          border: isDragging ? "2px solid #9C9EFE" : "0px",
          borderRadius: isDragging ? "5px" : "0px",
          backgroundColor: isDragging ? "lightblue" : "transparent",
        }}
      >
        <motion.img
          animate={{ scale: 1 }}
          initial={{ scale: 0.5 }}
          transition={{
            ease: "easeOut",
            duration: 0.65,
          }}
          ref={drag}
          src={url}
          // width="200px"
          style={{
            padding: "0.5rem",
            cursor: "pointer",
            borderRadius: "5px",
            // width: "50%",
            backgroundColor: isDragging ? "lightblue" : "transparent",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          }}
        />

        <div
          style={{ backgroundColor: isDragging ? "lightblue" : "transparent" }}
        >
          <h5 id="chartName">{name}</h5>
          {component}
        </div>
      </div>
    </>
  );
}

export default Picture;
