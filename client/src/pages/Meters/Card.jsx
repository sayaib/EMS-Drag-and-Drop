import React from "react";
import { useDrag } from "react-dnd";
import { motion } from "framer-motion";
import GasMeterIcon from "@mui/icons-material/GasMeter";
import { Resizable } from "re-resizable";

function Card({ id, url, component, name }) {
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
        className="item"
        ref={drag}
        style={{
          border: isDragging ? "2px solid #9C9EFE" : "0px",
          borderRadius: isDragging ? "5px" : "0px",
          backgroundColor: isDragging ? "lightblue" : "transparent",
        }}
      >
        <motion.div
          animate={{ scale: 1 }}
          initial={{ scale: 0.5 }}
          transition={{
            ease: "easeOut",
            duration: 0.65,
          }}
          ref={drag}
          className="meterCard"
        >
          <p>
            <GasMeterIcon />
          </p>
          <h6 id="chartName">
            {id}. {name}
          </h6>
        </motion.div>

        {/* <div
          style={{ backgroundColor: isDragging ? "lightblue" : "transparent" }}
        >
          
          {component}
        </div> */}
      </div>
    </>
  );
}

export default Card;
