import React, { Component } from 'react';
import Fade from 'react-reveal/Fade'
import FormField from '../../ui/formField'
import { validate } from '../../ui/misc'
import { firebasePromotions } from '../../../firebase'


class Enroll extends Component {
    
    state = {
        formError: false,
        formSuccess:'',
        formdata:{
            email:{
                element: 'input',
                value: '',
                config:{
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter you email'
                },
                validation:{
                    required: true,
                    email: true
                },
                valid: false,
                validationMessage:''
            }
        }
    }

    updateForm(element){
        // console.log(element)
        const newFormdata = {...this.state.formdata}
        const newElement = { ...newFormdata[element.id]}

        newElement.value = element.event.target.value

        let validData = validate(newElement)
        // console.log(validData)
        newElement.valid = validData[0]
        newElement.validationMessage = validData[1]

        newFormdata[element.id] = newElement
        // console.log(newFormdata)

        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    resetFormSuccess(){
        const newFormdata = {...this.state.formdata}

        for(let key in newFormdata){
            newFormdata[key].value = ''
            newFormdata[key].valid = false
            newFormdata[key].validationMessage = ''
        }

        this.setState({
            formError: false,
            formdata: newFormdata,
            formSuccess: 'Congrats, your email has been submitted.'
        })
        this.clearSuccessMessage()
    }

    clearSuccessMessage(){
        setTimeout(()=>{
            this.setState({
               formSuccess: '' 
            })
        }, 2000)
    }

    submitForm(event){
        event.preventDefault()

        let dataToSubmit = {}
        let formIsValid = true

        for(let key in this.state.formdata){
            dataToSubmit[key] = this.state.formdata[key].value
            formIsValid = this.state.formdata[key].valid && formIsValid
        }

        if(formIsValid){
            // console.log(dataToSubmit)
            
            // this.resetFormSuccess()
        }else {
            // console.log('error')
            this.setState({
                formError: true
            })
        }
        
    }
    
    render() {
        return (
            <Fade>
                <div className="enroll_wrapper">
                    <form onSubmit={ (event)=> this.submitForm(event)}>
                        <div className="enroll_title">
                            Enter your email
                        </div>
                        <div className="enroll_input">
                            <FormField
                                id={'email'}
                                formdata={this.state.formdata.email}
                                change={(element)=> this.updateForm(element)}
                            />
                            { this.state.formError ? 
                                <div className="error_label">Something is wrong, try again.</div>
                                :null}
                            
                            <div className="success_label">{this.state.formSuccess}</div>
                            <button onClick={(event)=> this.submitForm(event)}>Enroll</button>
                        </div>
                    </form>
                </div>
            </Fade>
        );
    }
}

export default Enroll;