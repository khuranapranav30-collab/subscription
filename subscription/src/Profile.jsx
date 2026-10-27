import gojo from './assets/images/gojoiprofile.png'
import profile1 from './assets/images/profile1.png'
import profile2 from './assets/images/profile2.png'

function Profile() {
    return (
        <>
            <style>
                {`
                .profile-pic{
                    display:block;
                    margin:auto;
                    width:100px;
                    margin-top:60px;
                    border-radius:50%;
                }
                .profile{
                    text-align:center;
                }
                .profile p, h3{
                    color:hsl(190, 97%, 55%);
                }
                .profile1 a, .profile2 a{
                    text-decoration: none;
                    background-color: hsl(190, 97%, 55%);
                    padding:10px;
                    color:white;
                    border:none;
                    border-radius:4px;
                    cursor:pointer;
                    scale:1;
                    transition:scale 0.2s;
                }
                .profile1, .profile2{
                    display:flex;
                    flex-direction:row;
                    justify-content:center;
                    align-items:center;
                }
                .profile1 img, .profile2 img{
                    width:300px;
                }
                .profile .profile1{
                    margin-bottom:20px;
                }
                .profile1 a{
                    margin-left:16px;
                }
                .profile2 a{
                    margin-left:18px;
                }
                .profile-text{
                    color: hsl(190, 97%, 55%);
                    text-align:center;
                }
            `}
            </style>

            <div className="profile">
                <img src={gojo}  className="profile-pic" />
                <p>I am a full-stack develepor based in Karnal, Harayana</p>
                <p>_________________________</p>
                <h3>Heres's what I've done so far</h3>

                <div className="profile1" id="profile1">
                    <img src={profile1} />
                    <a href="https://movie-library-7i835uvdt-acme-5072.vercel.app" target="_blank">Link</a>
                </div>

                <div className="profile2">
                    <img src={profile2} />
                    <a href="https://counter-ky2ti9yea-acme-5072.vercel.app" target="_blank">Link</a>
                </div>
                <p className="profile-text">__________________</p>
                <h3 className="profile-text">Photos</h3>
            </div>
        </>
    )
}

export default Profile