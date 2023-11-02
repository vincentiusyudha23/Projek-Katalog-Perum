import React, { useState } from 'react';
import '/resources/css/Testing.css'

const TesttingComp = () => {
    const [focusedObj, setFocusedObj] = useState(null);

    const handleFocus = (objId) => {
        setFocusedObj(objId);
    };

    const handleBlur = () => {
        setFocusedObj(null);
    };

    return (
        <div className="overlay-container">
            {/* Konten overlay */}
            <div className="overlay-content">
                {/* Objek pertama */}
                <div
                    className={`overlay-object ${focusedObj === 1 ? 'focused' : ''}`}
                    onClick={() => handleFocus(1)}
                    onBlur={handleBlur}
                    tabIndex={0} // Memastikan objek dapat difokus dengan keyboard
                >
                    <img src='https://picsum.photos/seed/img3/1920/1080' className='w-40'/>
                </div>

                {/* Objek kedua */}
                <div
                    className={`overlay-object ${focusedObj === 2 ? 'focused' : ''}`}
                    onClick={() => handleFocus(2)}
                    onBlur={handleBlur}
                    tabIndex={0}
                >
                    <img src='https://picsum.photos/seed/img4/1920/1080' className='w-40' />
                </div>

                {/* Tambahkan lebih banyak objek di sini */}
            </div>
        </div>
    );
};

export default TesttingComp;
