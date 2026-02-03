import { useState } from "react";
import {
  motion,
  useAnimate,
  useDragControls,
  useMotionValue,
} from "framer-motion";
import React, { useImperativeHandle } from "react";
import useMeasure from "react-use-measure";

const DragModal = React.forwardRef(({ children, showDragger = true }, ref) => {
  const [open, setOpen] = useState(false);
  const controls = useDragControls();
  const [scope, animate] = useAnimate();
  const [drawerRef, { height }] = useMeasure();

  const y = useMotionValue(0);
  const handleClose = async () => {
    animate(scope.current, {
      opacity: [1, 0],
    });
    const yStart = typeof y.get() === "number" ? y.get() : 0;
    await animate("#drawer", {
      y: [yStart, height],
    });
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  useImperativeHandle(ref, () => {
    return {
      openMobileDrawer: () => {
        handleOpen();
      },
      closeMobileDrawer: handleClose,
    };
  });

  return (
    <div>
      {open && (
        <motion.div
          onClick={handleClose}
          className="fixed inset-0 bg-neutral-950/70 z-[9998]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          ref={scope}
          transition={{ ease: "easeInOut", duration: 0.3 }}
        >
          <motion.div
            id="drawer"
            ref={drawerRef}
            onClick={(e) => e.stopPropagation(e)}
            initial={{ y: "100%" }}
            animate={{ y: "0" }}
            transition={{ ease: "easeInOut" }}
            className="absolute bottom-0 h-[60vh] w-full overflow-hidden rounded-t-3xl bg-white z-[9999] overflow-y-auto "
            style={{ y }}
            drag={"y"}
            dragControls={controls}
            dragListener={false}
            dragConstraints={{
              top: 0,
              bottom: 0,
            }}
            dragElastic={{
              top: 0,
              bottom: 0.5,
            }}
            onDragEnd={() => {
              console.log(y.get());
              if (y.get() >= 100) handleClose();
            }}
          >
            {showDragger && (
              <div className="absolute left-0 right-0  top-0 z-[10000] flex justify-center  p-4 ">
                <button
                  onPointerDown={(e) => {
                    controls.start(e);
                  }}
                  className="h-2 w-14 cursor-grab touch-none rounded-full bg-purple active:cursor-grabbing"
                />
              </div>
            )}
            <div className="px-4 relative pt-12 h-full ">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
});
export default DragModal;

/*Come back to test why relative */
