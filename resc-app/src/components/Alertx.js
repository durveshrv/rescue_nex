import React, { useState, useEffect } from 'react';

export default function Alertx(props) {
  const Capitalize=(word)=>{
    const lower=word.toLowerCase();
    return lower.charAt(0).toUpperCase()+lower.slice(1);
  }
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000); // 3000 milliseconds (3 seconds)

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <div style={{ height: '50px' }}>
      {isVisible && props.type && (
        <div className={`alert alert-${props.type} alert-dismissible fade show`} role="alert">
          {/* Alert content */}
          <strong>{Capitalize(props.type)}</strong>:{props.msg}
          <button
            type="button"
            className="btn-close"
            onClick={() => setIsVisible(false)}
          ></button>
        </div>
      )}
    </div>
  );
}
