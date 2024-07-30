import { Col, Container, Row } from "reactstrap";
import { AlertMessage } from "../../../../alert-message/alert-message";
import { TextInput } from "../../../../fields/text-input/text-input";
import './company-registration-two.css';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import { hideAlertMessage, showAlertMessage } from "../../../../../redux/reducer/alert-message.reducer";
import { setCompanyRegistrationData } from "../../../../../redux/reducer/registration.reducer";
import { useNavigate } from "react-router-dom";
import { ProcessCircles } from "../../../process-circles/process-circles";
import { FileInput } from "../../../../fields/file-input/file-input";
import { useImmer } from "use-immer";

export const CompanyRegistrationTwo = () => {
    const { companyRegistrationData } = useSelector((state: RootState) => state.registration);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, updateForm] = useImmer({
        logo: {
            value: companyRegistrationData.logo,
            error: ''
        },
        gdpr: {
            value: companyRegistrationData.gdpr,
            error: ''
        },
        webSite: {
            value: companyRegistrationData.webSite,
            error: ''
        },
        facebook: {
            value: companyRegistrationData.facebook,
            error: ''
        }
    });

    const handleChange = (name: string, value: string | FileList | null) => {
        if (name === 'logo') {
            updateForm(draft => {
                draft.logo.value = value ? value as FileList : null;
                draft.logo.error = '';
            });
        } else if (name === 'gdpr') {
            updateForm(draft => {
                draft.gdpr.value = value ? value as FileList : null;
                draft.gdpr.error = '';
            });
        } else if (name === 'webSite') {
            updateForm(draft => {
                draft.webSite.value = (value === null || value === undefined) ? null : value as string;
                draft.webSite.error = '';
            });
        } else if (name === 'facebook') {
            updateForm(draft => {
                draft.facebook.value = (value === null || value === undefined) ? null : value as string;
                draft.facebook.error = '';
            });
        }
    };


    const validateForm = () => {

        // clear errors
        dispatch(hideAlertMessage());
        updateForm(draft => {
            draft.logo.error = '';
            draft.gdpr.error = '';
            draft.webSite.error = '';
            draft.facebook.error = '';
        });

        let valid = true;
        
        if(!form.webSite.value) {
            updateForm(draft => {
                draft.webSite.error = 'Mező kitöltése kötelező.';
            });
            valid = false;
        }

        if(!form.logo.value || form.logo.value.length === 0) {
            updateForm(draft => {
                draft.logo.error = 'Fájl kiválasztása kötelező.';
            });
            valid = false;
        }

        if(!form.gdpr.value || form.gdpr.value.length === 0) {
            updateForm(draft => {
                draft.gdpr.error = 'Fájl kiválasztása kötelező.';
            });
            valid = false;
        }

        if (!valid) {
            dispatch(showAlertMessage({
                alertMessageText: 'Hibásan megadott beviteli mezők.',
                alertMessageType: 'error'
            }));
            return false;
        }

        if (!(form.logo.value as FileList)[0].type.includes('image')) {
            valid = false;
            updateForm(draft => {
                draft.logo.error = 'Csak képfájl lehet.';
            });
        }

        if ((form.gdpr.value as FileList)[0].name.match('\.(pdf|doc|docx)$') === null) {
            valid = false;
            updateForm(draft => {
                draft.gdpr.error = 'Csak .pdf, .doc, .docx lehet a fájl kiterjesztése.';
            });
        }

        const regExp = /(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/;
        if (regExp.test(form.webSite.value as string) === false) {
            valid = false;
            updateForm(draft => {
                draft.webSite.error = 'Helytelen url formátum.';
            });
        }

        if(form.facebook.value && regExp.test(form.facebook.value) === false){
            valid = false;
            updateForm(draft => {
                draft.facebook.error = 'Helytelen url formátum.';
            });
        }

        if(!valid) {
            dispatch(showAlertMessage({
                alertMessageText: 'Hibásan megadott beviteli mezők.',
                alertMessageType: 'error'
            }));
            return false;
        }

        return true;
    };

    const handleNextClick = async () => {
        if(!validateForm()) return;
        
        dispatch(setCompanyRegistrationData({
            logo: form.logo.value,
            gdpr: form.gdpr.value,
            webSite: form.webSite.value,
            facebook: form.facebook.value
        }));

        navigate('/company-registration-three');
    };

    return (
        <Container className='company-registration-two'>

            <Row>

                <Col xs='12'>

                    <p className='tovabbi-cegadatok'>
                        További cégadatok…
                    </p>

                    <p className='kerlek-add-meg-az-el'>
                        Kérlek add meg a cég elérhetőségeit!
                    </p>

                    <AlertMessage />

                    <div style={{ marginTop: '20px' }}>
                        <FileInput
                            id="logo"
                            defaultValue={form.logo.value}
                            label='Logó (csak képfájl lehet)'
                            error={form.logo.error}
                            accept="image/*"
                            required
                            onChange={(value) => handleChange('logo', value)}
                        />
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <FileInput
                            id="gdpr"
                            defaultValue={form.gdpr.value}
                            label='GDPR nyilatkozat (.pdf, .doc, .docx)'
                            error={form.gdpr.error}
                            required
                            accept=".pdf, .doc, .docx"
                            onChange={(value) => handleChange('gdpr', value)}
                        />
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <TextInput
                            defaultValue={form.webSite.value}
                            error={form.webSite.error}
                            placeholder='Weboldal'
                            required
                            onChange={(value) => handleChange('webSite', value)}
                        />
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <TextInput
                            defaultValue={form.facebook.value}
                            error={form.facebook.error}
                            placeholder='Facebook'
                            onChange={(value) => handleChange('facebook', value)}
                        />
                    </div>

                    <ProcessCircles countOfCircles={4} activeCircle={2} style={{ marginTop: '250px', marginBottom: '30px' }} />

                </Col>

                <Col xs={{ size: 12, offset: 0 }} sm={{ size: 3, offset: 1 }} style={{ marginTop: '30px' }}>
                    <button className='button back-button' onClick={() => navigate('/company-registration-one')}>Vissza</button>
                </Col>

                <Col xs={{ size: 12, offset: 0 }} sm={{ size: 4, offset: 3 }} style={{ marginTop: '30px' }}>
                    <button className='button' onClick={handleNextClick}>Tovább</button>
                </Col>

            </Row>

        </Container>
    );
};