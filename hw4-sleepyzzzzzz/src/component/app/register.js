import React from 'react';
import { Container, Form, Col, Row } from 'react-bootstrap';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { handleChange, handleRegister, handleReset } from "../../actions";
import "./register.css";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: {},
            accountname: '',
            displayname: '',
            email: '',
            phone: '',
            birthdate: '',
            zipcode: '',
            pwd: '',
            pwdc: '',
            msg: []
        };
    }

    validation = (field, value, reg, msg) => {
        let validate = reg.test(value);
        let idx = msg.indexOf(field);
        if (!validate) {
            if (idx === -1) {
                msg.push(field);
            }
        }
        else {
            if (idx !== -1) {
                msg.splice(idx, 1);
            }
        }
    }

    check_pwd_pwdc = (pwd1, pwd2, msg) => {
        let validate = true;
        if (pwd1 !== pwd2) {
            validate = false;
        }
        let idx1 = msg.indexOf("pwd");
        let idx2 = msg.indexOf("pwdc");
        if (!validate) {
            if (idx1 === -1) {
                msg.push("pwd");
            }
            if (idx2 === -1) {
                msg.push("pwdc");
            }
        }
        else {
            idx1 = msg.indexOf("pwd");
            if (idx1 !== -1) {
                msg.splice(idx1, 1);
            }
            idx2 = msg.indexOf("pwdc");
            if (idx2 !== -1) {
                msg.splice(idx2, 1);
            }
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        this.props.handleChange(e.target.name, e.target.value);
        let field = e.target.name;
        let reg = '';
        let validate = true;
        let msg = this.state.msg;
        switch (field) {
            case "accountname":
                reg = /(^[A-Za-z]+[A-Za-z0-9]+$)|(^[A-Za-z]+$)/;
                this.validation(field, e.target.value, reg, msg);
                break;
            case "email":
                reg = /^[^@]*@[^@]*\.[^@]*$/;
                this.validation(field, e.target.value, reg, msg);
                break;
            case "phone":
                reg = /^\d{3}-\d{3}-\d{4}$/;
                this.validation(field, e.target.value, reg, msg);
                break;
            case "birthdate":
                var today = new Date();
                var todayYear = today.getFullYear();
                var todayMonth = today.getMonth() + 1;
                var todayDay = today.getDate();
                var birthd = e.target.value;
                var bir = birthd.split("-");
                var birthYear = parseInt(bir[0]);
                var birthMonth = parseInt(bir[1]);
                var birthDay = parseInt(bir[2]);
                var age = todayYear - birthYear;
                if (birthMonth === todayMonth) {
                    if (birthDay > todayDay) {
                        age = age - 1;
                    }
                }
                else if (birthMonth > todayMonth) {
                    age = age - 1;
                }
                if (age < 18) {
                    validate = false;
                }
                let idx = msg.indexOf("birthdate");
                if (!validate) {
                    if (idx === -1) {
                        msg.push("birthdate");
                    }
                }
                else {
                    if (idx !== -1) {
                        msg.splice(idx, 1);
                    }
                }
                break;
            case "zipcode":
                reg = /^\d{5}$/;
                this.validation(field, e.target.value, reg, msg);
                break;
            case "pwd":
                let pwd2 = this.state.pwdc;
                this.check_pwd_pwdc(e.target.value, pwd2, msg);
                break;
            case "pwdc":
                let pwd1 = this.state.pwd;
                this.check_pwd_pwdc(pwd1, e.target.value, msg);
                break;
            default:
                break;
        }
        this.setState({ msg: msg });
    }

    notValidate = (field) => {
        return this.state.msg.indexOf(field) !== -1;
    }

    onSubmit = (e) => {
        e.preventDefault();
        let msg = this.state.msg;
        if (this.state.accountname === "" && msg.indexOf("accountname") === -1) {
            msg.push("accountname");
        }
        if (this.state.email === "" && msg.indexOf("email") === -1) {
            msg.push("email");
        }
        if (this.state.phone === "" && msg.indexOf("phone") === -1) {
            msg.push("phone");
        }
        if (this.state.birthdate === "" && msg.indexOf("birthdate") === -1) {
            msg.push("birthdate");
        }
        if (this.state.zipcode === "" && msg.indexOf("zipcode") === -1) {
            msg.push("zipcode");
        }
        if (this.state.pwd === "" && msg.indexOf("pwd") === -1) {
            msg.push("pwd");
            msg.push("pwdc");
        }
        this.setState({ msg: msg });
        if (this.state.msg.length > 0) {
            return false;
        }
        else {
            this.props.handleRegister();
        }
    }

    reset = () => {
        this.setState({
            accountname: '',
            displayname: '',
            email: '',
            phone: '',
            birthdate: '',
            zipcode: '',
            pwd: '',
            pwdc: '',
            msg: []
        });
        this.props.handleReset();
    }

    render() {
        if (this.props.redirect) {
            return <Redirect to={this.props.redirect} />
        }
        return (
            <Container>
                <Form noValidate className="form_reg" onSubmit={this.onSubmit}>
                    <h1 className="formheader">Register</h1>
                    <Form.Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>
                                    Account Name <br></br>
                                (Only upper, lower letters and numbers are accepted)
                            </Form.Label>
                                <Form.Control
                                    className={this.notValidate("accountname") ? "form-control is-invalid" : "form-control"}
                                    value={this.state.accountname}
                                    onChange={this.onChange}
                                    type="text"
                                    id="accountname"
                                    name="accountname"
                                    placeholder="account name"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    account name should only contain upper, lower letters and numbers. Maynot start with a number
                            </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>
                                    Display Name <br></br>
                                (Optional)
                            </Form.Label>
                                <Form.Control
                                    className="form-control"
                                    value={this.state.displayname}
                                    onChange={this.onChange}
                                    type="text"
                                    id="displayname"
                                    name="displayname"
                                    placeholder="display name"
                                />
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Email Address (###@###.##)</Form.Label>
                                <Form.Control
                                    className={this.notValidate("email") ? "form-control is-invalid" : "form-control"}
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    type="text"
                                    id="email"
                                    name="email"
                                    placeholder="###@###.##"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    proper format is ###@##.##
                        </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Phone Number (123-123-1234)</Form.Label>
                                <Form.Control
                                    className={this.notValidate("phone") ? "form-control is-invalid" : "form-control"}
                                    value={this.state.phone}
                                    onChange={this.onChange}
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    placeholder="123-123-1234"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    proper format is 123-123-1234
                        </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Date Of Birth</Form.Label>
                                <Form.Control
                                    className={this.notValidate("birthdate") ? "form-control is-invalid" : "form-control"}
                                    value={this.state.birthdate}
                                    onChange={this.onChange}
                                    type="date"
                                    id="birthdate"
                                    name="birthdate"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Age is below 18; Not allow to register!
                        </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Zipcode (12345)</Form.Label>
                                <Form.Control
                                    className={this.notValidate("zipcode") ? "form-control is-invalid" : "form-control"}
                                    value={this.state.zipcode}
                                    onChange={this.onChange}
                                    type="text"
                                    id="zipcode"
                                    name="zipcode"
                                    placeholder="12345"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    zipcode should be 5 numbers. Proper format is 12345
                        </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    className={this.notValidate("pwd") ? "form-control is-invalid" : "form-control"}
                                    value={this.state.pwd}
                                    onChange={this.onChange}
                                    type="password"
                                    id="pwd"
                                    name="pwd"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Passwords do not match
                        </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Password Confirmation</Form.Label>
                                <Form.Control
                                    className={this.notValidate("pwdc") ? "form-control is-invalid" : "form-control"}
                                    value={this.state.pwdc}
                                    onChange={this.onChange}
                                    type="password"
                                    id="pwdc"
                                    name="pwdc"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Passwords do not match
                        </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <Form.Group>
                                <button className="btn_reg btn-primary" type="submit">
                                    Register
                                </button>
                            </Form.Group>
                            <Row>
                                <span className="info">{this.props.info}</span>
                            </Row>
                        </Col>
                        <Col>
                            <Form.Group>
                                <button className="btn_reg btn-primary" type="reset" onClick={this.reset}>
                                    Clear
                                </button>
                            </Form.Group>
                        </Col>
                    </Form.Row>
                </Form>
            </Container>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        users: state.users,
        accountname: state.accountname,
        displayname: state.displayname,
        email: state.email,
        phone: state.phone,
        birthdate: state.birthdate,
        zipcode: state.zipcode,
        pwd: state.pwd,
        info: state.info,
        redirect: state.redirect
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleChange: (field, value) => dispatch(handleChange(field, value)),
        handleRegister: () => dispatch(handleRegister()),
        handleReset: () => dispatch(handleReset()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);