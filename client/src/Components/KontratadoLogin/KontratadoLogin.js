import React, { Component } from 'react';
import { Form, InputGroup, Button, Col, Container } from "react-bootstrap";
import API from '../../utils/API';
import './style.css';

class KontratadoLogin extends Component {

    state = {
        validated: false,
        email: '',
        password: '',
        showErrorMessage : false,
        errorMessage : ''
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleSubmit = event => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            this.setState({ validated: true });
        } else {
            event.preventDefault();
            const { email, password } = this.state;
            const kontratado = {
                email,
                password
            };

            API.loginKontratado(kontratado)
                .then(result => {
                    this.props.logKontratado(result.data.kontratadoId);
                })
                .catch(err => {
                    const displayError = err.response.data ? `${err.response.data} : Try again!` : 'Error in user or password : Try again!'
                    this.setState({
                        showErrorMessage:true,
                        errorMessage:displayError
                    })
                });
        }
    }

    render() {
        const { validated } = this.state;
        return (
            <Container>
                <Form
                    noValidate
                    validated={validated}
                    className="profileForm"
                    onSubmit={e => this.handleSubmit(e)}
                    >

                    <Col md={10}>

                        <Form.Row>
                            <Form.Group as={Col} md="12" >
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text className="formIcon" id="inputGroupPrepend">@</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        type="text"
                                        placeholder="Email"
                                        aria-describedby="inputGroupPrepend"
                                        className="formInput"
                                        required
                                        onChange={this.handleInputChange}
                                        name="email"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Favor de ingresar tu dirección de correo electrónico.
                                        </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} md="12" >
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text className="formIcon" id="inputGroupPrepend"><i className="fas fa-key"></i></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        aria-describedby="inputGroupPrepend"
                                        className="formInput"
                                        required
                                        onChange={this.handleInputChange}
                                        name="password"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Favor de ingresar una contraseña
                                        </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <div className="col-md-12 text-center">
                                <Button className="workerProfileBtn" type="submit"><i className="fas fa-sign-in-alt"></i> Ingresar</Button>
                            </div>
                        </Form.Row>

                    </Col>
                </Form>
                <br />
                {this.state.showErrorMessage ? <p className="invalidLogin">{this.state.errorMessage}</p> : <div></div> }

            </Container>
        )
    }
}

export default KontratadoLogin;