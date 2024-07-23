import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import './registration-chooser.css';

export const RegistrationChooser = () => {
    const navigate = useNavigate();

    return (
        <Container className='registration-chooser-container'>

            <Row>

                <Col xs='12' className='legy-reszese-a-vr-bo'>
                    Légy részese a VR börzének!
                </Col>

                <Col xs="12" className="kerlek-valassz-hogy">
                    Kérlek válassz, hogy milyen felhasználóként<br/>szeretnél regisztrálni!
                </Col>

                <Col xs={{ size: 12, offset: 0 }} md={{ size: 4, offset: 2 }}>
                    <div className='registration-link-container' onClick={() => navigate('/job-seeker-registration-one')}>
                        <span>Állláskereső</span>
                    </div>
                </Col>

                <Col xs={{ size: 12, offset: 0 }} md={{ size: 4 }}>
                    <div className='registration-link-container' onClick={() => navigate('/company-registration-one')}>
                        <span>Álláshirdető cég</span>
                    </div>
                </Col>

            </Row>

        </Container>
    );
};