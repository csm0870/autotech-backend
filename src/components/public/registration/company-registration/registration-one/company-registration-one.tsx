import { Col, Container, Row } from "reactstrap";
import { AlertMessage } from "../../../../alert-message/alert-message";
import { EmailInput } from "../../../../fields/email-input/email-input";
import { PasswordInput } from "../../../../fields/password-input/password-input";
import { TextInput } from "../../../../fields/text-input/text-input";
import './company-registration-one.css';
import { Textarea } from "../../../../fields/text-area/text-area";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import { hideAlertMessage, showAlertMessage } from "../../../../../redux/reducer/alert-message.reducer";
import { isValidEmail } from "../../../../../utils/is-valid-email/is-valid-email";
import { setCompanyRegistrationData } from "../../../../../redux/reducer/registration.reducer";
import { useNavigate } from "react-router-dom";
import { networkCall } from "../../../../../utils/network-call/network-call";
import { showDefaultErrorMessages } from "../../../../../utils/show-default-error-message/show-default-error-messages";
import { AxiosResponse } from "axios";

export const CompanyRegistrationOne = () => {
    const { companyRegistrationData } = useSelector((state: RootState) => state.registration);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: {
            value: companyRegistrationData.email,
            error: ''
        },
        password: {
            value: companyRegistrationData.password,
            error: ''
        },
        name: {
            value: companyRegistrationData.name,
            error: ''
        },
        shortDescription: {
            value: companyRegistrationData.shortDescription,
            error: ''
        },
        headquarters: {
            value: companyRegistrationData.headquarters,
            error: ''
        },
        taxNumber: {
            value: companyRegistrationData.taxNumber,
            error: ''
        }
    });

    const handleChange = (name: string, value: string) => {
        const newForm = JSON.parse(JSON.stringify(form));
        newForm[name].value = value;
        newForm[name].error = '';
        setForm(newForm);
    };


    const validateForm = async () => {
        const newForm = JSON.parse(JSON.stringify(form));

        // clear errors
        dispatch(hideAlertMessage());
        for (const key in newForm) {
            newForm[key].error = '';
        }

        let valid = true;
        for (const key in newForm) {
            if (key !== 'shortDescription' && (newForm[key].value === '' || newForm[key].value === null)) {
                valid = false;
                newForm[key].error = 'Mező kitöltése kötelező.';
            }
        }
        
        if (!valid) {
            setForm(newForm);
            dispatch(showAlertMessage({
                alertMessageText: 'Hibásan megadott beviteli mezők.',
                alertMessageType: 'error'
            }));
            return false;
        }

        if (!isValidEmail(newForm.email.value)) {
            newForm.email.error = 'Nem megfelelő formátum.';
            setForm(newForm);
            dispatch(showAlertMessage({
                alertMessageText: 'Hibásan megadott beviteli mezők.',
                alertMessageType: 'error'
            }));
            return false;
        }

        if (newForm.password.value.length < 8) {
            newForm.password.error = 'Legalább 8 karaktert kell tartalmaznia.';
            setForm(newForm);
            dispatch(showAlertMessage({
                alertMessageText: 'Hibásan megadott beviteli mezők.',
                alertMessageType: 'error'
            }));
            return false;
        }

        let regexp = new RegExp("[A-ZÁÖÜÓŐÚÉŰÍ]+");
        if (!regexp.test(form.password.value as string)) {
            newForm.password.error = 'Legalább egy nagybetűt kell tartalmaznia.';
            setForm(newForm);
            dispatch(showAlertMessage({
                alertMessageText: 'Hibásan megadott beviteli mezők.',
                alertMessageType: 'error'
            }));
            return false;
        }

        regexp = new RegExp("[0-9]+");
        if (!regexp.test(form.password.value as string)) {
            newForm.password.error = 'Legalább egy számot kell tartalmaznia.';
            setForm(newForm);
            dispatch(showAlertMessage({
                alertMessageText: 'Hibásan megadott beviteli mezők.',
                alertMessageType: 'error'
            }));
            return false;
        }

        regexp = new RegExp("^([0-9]{10,11})|([0-9]{8}-[0-9]{1}-[0-9]{2})|([A-Za-z]{2,4}[0-9]{3,11})$");
        if (!regexp.test(form.taxNumber.value as string)){
            newForm.taxNumber.error = 'Nem megfelelő formátum. Pl. 26165532-2-11, 26165532211, HU99999999';
            setForm(newForm);
            dispatch(showAlertMessage({
                alertMessageText: 'Hibásan megadott beviteli mezők.',
                alertMessageType: 'error'
            }));
            return false;
        }

        let response = await networkCall('/users/email-exists', {
            method: 'POST',
            body: {
                email: form.email.value
            }
        });

        let messageShowed = showDefaultErrorMessages(response);
        if(messageShowed) return false;

        if (response?.status === 201) {

            const res = response as AxiosResponse<boolean>;
            if(res.data) {
                newForm.email.error = 'Ezzel az email címmel már regisztráltak.';
                setForm(newForm);
                dispatch(showAlertMessage({
                    alertMessageText: 'Hibásan megadott beviteli mezők.',
                    alertMessageType: 'error'
                }));
                return false;
            }

        } else {
            return false;
        }

        // adószám ellenőrzés
        response = await networkCall('/companies/tax-number-exists', {
            method: 'POST',
            body: {
                taxNumber: form.taxNumber.value
            }
        });

        messageShowed = showDefaultErrorMessages(response);
        if(messageShowed) return false;

        if (response?.status === 201) {
            
            const res = response as AxiosResponse<boolean>;
            if(res.data) {
                newForm.taxNumber.error = 'Ezzel az adószámmal már regisztráltak.';
                setForm(newForm);
                dispatch(showAlertMessage({
                    alertMessageText: 'Hibásan megadott beviteli mezők.',
                    alertMessageType: 'error'
                }));
                return false;
            }

        } else {
            return false;
        }

        // cégnév ellenőrzés
        response = await networkCall('/companies/name-exists', {
            method: 'POST',
            body: {
                name: form.name.value
            }
        });

        messageShowed = showDefaultErrorMessages(response);
        if(messageShowed) return false;

        if (response?.status === 201) {
            
            const res = response as AxiosResponse<boolean>;
            if(res.data) {
                newForm.email.error = 'Ezzel a névvel már regisztráltak.';
                setForm(newForm);
                dispatch(showAlertMessage({
                    alertMessageText: 'Hibásan megadott beviteli mezők.',
                    alertMessageType: 'error'
                }));
                return false;
            }

        } else {
            return false;
        }

        return true;
    };

    const handleNextClick = async () => {
        if(!await validateForm()) return;
        
        dispatch(setCompanyRegistrationData({
            email: form.email.value,
            password: form.password.value,
            name: form.name.value,
            shortDescription: form.shortDescription.value,
            headquarters: form.headquarters.value,
            taxNumber: form.taxNumber.value
        }));

        navigate('/company-registration-two');
    };

    return (
        <Container className='company-registration-one'>

            <Row>

                <Col xs='12'>

                    <p className='csak-lepesrol-lepesr'>
                        Csak lépésről lépésre…
                    </p>

                    <p className='kerlek-add-meg-az-al'>
                        Kérlek add meg a cég adatait!
                    </p>

                    <AlertMessage />

                    <p className='sub-title'>
                        Belépési adatok:
                    </p>

                    <Row>
                        <Col xs='12' md='6' style={{ marginTop: '20px' }}>
                            <EmailInput
                                defaultValue={form.email.value}
                                error={form.email.error}
                                placeholder='Email cím'
                                required
                                onChange={(value) => handleChange('email', value)}
                            />
                        </Col>

                        <Col xs='12' md='6' style={{ marginTop: '20px' }}>
                            <PasswordInput
                                defaultValue={form.password.value}
                                error={form.password.error}
                                placeholder='Jelszó'
                                required
                                onChange={(value) => handleChange('password', value)}
                            />
                        </Col>
                    </Row>

                    <p className='sub-title'>
                        Cég adatok:
                    </p>

                    <div style={{ marginTop: '20px' }}>
                        <TextInput
                            defaultValue={form.name.value}
                            error={form.name.error}
                            placeholder='Név'
                            required
                            onChange={(value) => handleChange('name', value)}
                        />
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <Textarea
                            defaultValue={form.shortDescription.value}
                            error={form.shortDescription.error}
                            placeholder='Rövid leírás'
                            onChange={(value) => handleChange('shortDescription', value)}
                        />
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <TextInput
                            defaultValue={form.headquarters.value}
                            error={form.headquarters.error}
                            placeholder='Székhely'
                            required
                            onChange={(value) => handleChange('headquarters', value)}
                        />
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <TextInput
                            defaultValue={form.taxNumber.value}
                            error={form.taxNumber.error}
                            placeholder='Adószám'
                            required
                            onChange={(value) => handleChange('taxNumber', value)}
                        />
                    </div>

                    <div className="process-circles">
                        <span></span>
                        <span className="active"></span>
                        <span></span>
                        <span></span>
                    </div>

                </Col>

                <Col xs={{ size: 12, offset: 0 }} sm={{ size: 4, offset: 7 }} style={{ marginTop: '30px' }}>
                    <button className='button' onClick={handleNextClick}>Tovább</button>
                </Col>

            </Row>

        </Container>
    );
};