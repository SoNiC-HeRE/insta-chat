import { useState, useEffect } from "react";

function Loader() {
  const [loading, setLoading] = useState(true);
  return (
    <div className="parent-loader">
      <div className="loader"></div>
    </div>
  );
}

export default Loader;
