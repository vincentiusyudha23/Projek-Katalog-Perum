import React from 'react'

const MapsUrlView = ({ UrlMaps }) => {
    return (
        <>
            {
                UrlMaps ? (<iframe
                    className='maps-view'
                    src={UrlMaps}
                    width="100%"

                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade" ></iframe>) : (
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22796.74847816696!2d105.0685308693799!3d-5.392947401429683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40d25fa28dc0cf%3A0xcd0378ad73f1cb22!2sKantor%20Bupati%20Pesawaran!5e0!3m2!1sid!2sid!4v1696678696159!5m2!1sid!2sid"
                        width="100%"
                        height="500"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"></iframe>
                )
            }
        </>
    )
}

export default MapsUrlView