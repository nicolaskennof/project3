import React from "react"
import WorkerProfileData from "../Components/WorkerProfileData/WorkerProfileData"
import HeroImageProfile from "../Components/HeroImage/HeroImageProfile"
import Footer from "../Components/Footer/Footer"
import Wrapper from "../Components/workersWrapper/commonWrapper"
import Reviews from "../Components/reviews/reviews"


function KontratadoProfile(props) {
    return (
        <div>
            <HeroImageProfile />
            <Wrapper>
                <h1>Tu datos</h1>
                <hr />
                <br />
                <WorkerProfileData kontratadoUpdate={props.kontratadoUpdate} kontratado={props.kontratado} />
                <br />
                <br />
                <h1>Tus reseñas</h1>
                <hr />
                <br />
                <Reviews kontratado={props.kontratado} />
            </Wrapper>
            <Footer />
        </div>
    )
}

export default KontratadoProfile