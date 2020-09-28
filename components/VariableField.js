import React from 'react';
//varName is prop

export default class VariableField extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event)
        {
            var vars = ['',0];
            vars[0] = this.props.i; 
            vars[1] = event.target.value;
            //alert('A value was submitted:' + vars[0]);
            this.props.handlChange(vars)
        }

    render(){
        //const varInputs = this.state.varInputs;
    
        return(
            <div>         
                <form> 
                    <label>
                        {this.props.name}
                        <input 
                            type = 'text'
                            onChange= {this.handleChange}
                            value = {this.props.varInputs[this.props.i].input}
                        />
                    </label>
                    <label>
                        {' ' + this.props.label}
                    </label>
                </form>
            </div>
        )
    }
}