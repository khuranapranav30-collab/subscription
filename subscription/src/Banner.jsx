import underwater from './assets/images/underwater.jpg'

function Banner() {
    return (
        <>
            <style>
                {`
                    .banner-container .banner{
                        width:100%;
                        height:500px;
                        position:relative;
                        cursor:pointer;
                    }
                    .banner-container p{
                        text-align:center;
                        background-color: black;
                        color:white;
                        opacity:0.6;
                        padding:10px;
                        width:98.66%;
                        position:absolute;
                        top:500px;
                        display: none;
                    }
                    .banner-container:hover p{
                        display:block;
                    }
                `}
            </style>

            <div className="banner-container" id="banner-container">
                <img src={underwater} alt="This is the image of a swimmer underwater" className="banner" />
                <div>
                    <p>Hey, I'm Pranav Khurana</p>
                </div>
            </div>

        </>
    )
}

export default Banner;