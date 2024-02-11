import { useState, forwardRef, useImperativeHandle } from "react";

const Toggalable = forwardRef(({ buttonLabel, children }, ref) => {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? "" : "none" };
  const hideWhenVisible = { display: visible ? "none" : "" };
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => ({ whitelistedMethod: toggleVisibility }));

  return (
    <div>
      <div style={hideWhenVisible}>
        <button
          onClick={() => {
            setVisible(true);
          }}
        >
          {buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <div>
          <button onClick={() => setVisible(false)}>Cancle</button>
        </div>
      </div>
    </div>
  );
});

export default Toggalable;
