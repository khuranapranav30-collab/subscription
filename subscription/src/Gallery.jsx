import g1 from './assets/gallery/g1.jpg'
import g2 from './assets/gallery/g2.jpg'
import g3 from './assets/gallery/g3.jpg'
import g4 from './assets/gallery/g4.jpg'

function Gallery() {
    return (
        <>
            <style>
                {`
                .gallery {
                display:grid;
                grid-template-columns:1fr 1fr 1fr 1fr;
                width:80%;
                column-gap:10px;
                margin:0 10%;
                }
                .gallery img{
                width:100%;
            }
            @media(max-width:800px){
                    .gallery{
                        grid-template-columns: 1fr 1fr;
                        gap:10px;
                    }
            }
            `}
            </style>

            <div className="gallery">
                <img src={g1} />
                <img src={g2} />
                <img src={g3} />
                <img src={g4} />
            </div>
        </>
    )
}

export default Gallery