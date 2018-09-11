import React, {Component} from 'react';
import {Button, Col, Container, Form, FormFeedback, FormGroup, Input, Label} from 'reactstrap';
import './Login.css';
import {connect} from "react-redux";
import {Loader} from "../loader/Loader";
import {access, login} from "../../redux/domain/access";

import {persistor} from "../../redux/store";
import {Header} from "../header/Header";
import {Top} from "../header/Top";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            error: null
        };
    }

    validateForm() {
        return this.state.username.length >= 3;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSubmit = async(event) => {
        event.preventDefault();
        await this.props.login(this.state.username, this.state.password);
        if(!this.props.auth_err) {
            persistor.persist();
        }
        this.setState({error: this.props.auth_err})
    };

    render() {
        if(this.props.isLoading) {
            return <Loader/>
        }
        return (
            <div className="around">

             <Top/>
            <Container className="Login">
                <h2>Sign In</h2>
                {this.state.error}
                <Form className="form" onSubmit={this.handleSubmit}>
                    <Col>
                        <FormGroup>
                            <Label>Username</Label>
                            <Input
                                autoFocus
                                type="text"
                                id="username"
                                placeholder="john_doe"
                                value={this.state.username}
                                valid={this.validateForm()}
                                invalid={!this.validateForm()}
                                onChange={this.handleChange}
                            />
                            <FormFeedback valid>
                                That's a tasty looking username you've got there.
                            </FormFeedback>
                            <FormFeedback>
                                Uh oh! Username must be at least 3 characters long.
                            </FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input
                                type="password"
                                id="password"
                                placeholder="********"
                                value={ this.state.password }
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col className="text-center">
                        <Button
                            color="primary"
                            disabled={!this.validateForm()}
                            type="submit">
                            Submit
                        </Button>
                    </Col>
                </Form>
            </Container>
                </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.auth.isLoading,
        auth_err: state.auth.auth_err
    }
};

export default connect(mapStateToProps, {login})(Login);