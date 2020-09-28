import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import './index.css';
import VariableField from './components/VariableField';
import ResetButton from './components/ResetButton';

//https://www.omnicalculator.com/physics/suvat

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      varInputs: [
        {id: 'Displacement (s): ', value: null, input: '', unit: 'm'},
        {id: 'Initial Velocity (u): ', value: null, input: '', unit: 'm/s'}, 
        {id: 'Final Velocity (v): ', value: null, input: '', unit: 'm/s'}, 
        {id: 'Acceleration (a): ', value: null, input: '', unit: 'm/s²'}, 
        {id: 'Time (t): ', value: null, input: '', unit: 's'}],
      numSubmitted: 0,
    };
    this.baseState = this.state;
  }

  //Functions
  calculatedSolutions(){
    let varInputs= this.state.varInputs;

    var d = varInputs[0].value //displacement
    var u = varInputs[1].value //initial velocity
    var v = varInputs[2].value //final velocity
    var a = varInputs[3].value //acceleration
    var t = varInputs[4].value //time

    if (!d){ //displacement is unknown
      if (!u){
        d = v*t - 0.5*a*t**2; 
      }
      else if (!v){
        d = (u - a*t**2)/2*t
      }
      else if (!a){
        d = 0.5*t*(u + v)
      }
      else if (!t){
        d = (u**2 + v**2)/2*a
      }
      else{
        d = (u**2 + v**2)/2*a
      }
    }
    if (!u){ //initial velocity is unknown
      if (!v){
        u = (d - 0.5*a*(t**2))/t; 
      }
      else if (!a){
        u = 2*d/t + v;
      }
      else if (!t){
        u = (2*a*d - v**2)**0.5
      }
      else{
        u = (2*a*d - v**2)**0.5
      }
    }
    if (!v){ //final velocity is unknown
      if (!a){
        v = (2*d)/t - u
      }
      else if (!t){
        v = (u**2 + 2*a*d)**0/5
      }
      else{
        v = (u**2 + 2*a*d)**0/5
      }
    }
    if (!a && a !== 0){ //acceleration is unknown
        a = (v**2 - u**2)/(2*d); 
    } 
    if (!t && t !== 0){ //time is unknown
      t = (v - u)/a
    }

    var isRealNumbers = true; //false if faulty input that cannot generate real numbers
    if (isNaN(d) || isNaN(u) || isNaN(v) || isNaN(a) || isNaN(t)){ //checking if any input was faulty (ex. letters were inputted)
      isRealNumbers = false;
    }

    if (isRealNumbers){
      return(
        <div>
          <div>Displacement: {d} </div>
          <div>Initial Velocity: {u}</div>
          <div>Final Velocity: {v}</div>
          <div>Acceleration: {a}</div>
          <div>Time: {t}</div>
        </div>
      );
    }
    else{
      return(<div className = 'Answers'>{'Oops! Please check for an incorrectly entered value!'}</div>)
    }
  }

  outputSolutions(){
    if (this.state.numSubmitted < 3){
      return(
        <div className = 'Solutions-header'>{'Please enter numerical values into three fields so that calculations can be made!'}</div>
      );
    }
    else if (this.state.numSubmitted === 3){
      return(
        <div>
          <div className = 'Solutions-header'> 
            {'Solutions:'}
          </div>
          <div className = 'Answers'> 
            {this.calculatedSolutions()}
          </div>
        </div>
      )
    }
    else{
      return(
        <div className = 'Answers'> {'Oops! Please ensure that only three fields are filled in.'}</div>
      )
    }
  }

  countNumSubmitted(){
    let numSubmitted = this.state.numSubmitted;
    let varInputs = this.state.varInputs;
    let numInputs = 0

    for (const object of varInputs){
        if(object.value){ // !== (null || '')
          numInputs += 1;
        }
    }
    numSubmitted = numInputs;
    this.setState({numSubmitted});
    this.outputSolutions()
  }

  handlChange(vars)
  {
    let varInputs = this.state.varInputs;
    varInputs[vars[0]].value = vars[1];
    varInputs[vars[0]].input = vars[1];
    this.setState({varInputs});
    this.countNumSubmitted();
  }

  resetData(){
    this.setState(this.baseState);
    appRender();
  }

  createVarField(i)
  {
    return(
      <div>
          <VariableField 
            i={i} 
            handlChange = {(val) => this.handlChange(val)}//{(input) => this.setState({input})}
            input = {this.state.varInputs[i].input}
            varInputs = {this.state.varInputs}
            name = {this.state.varInputs[i].id}
            label = {this.state.varInputs[i].unit}
          />
        </div>
    );
  }

  render(){
    return (
      <div className="App">

        <div className = "App-header" >
          {'Kinematics Calculator'}
        </div>

        <div className = "App-description">
          {'A tool for making calculations related to uniformly-accelerated motion.'}
        </div>

        <div className = "Reset-button">
          <ResetButton
            resetData = {() => this.resetData()}
          />
        </div>

        <div className = "Variable-fields">
          {this.createVarField(0)}
          {this.createVarField(1)}
          {this.createVarField(2)}
          {this.createVarField(3)}
          {this.createVarField(4)}
        </div>

        <div>
          <div>{this.outputSolutions()}</div>
        </div>
        <div className = "Reference-equations">
          {"For Reference: Galileo Galilei's Equations of Motion"}
          <p>{"(v) = (u) + (a)(t)"}</p>
          <p>{"(v²) = (u²) + (2)(a)(s)"}</p>
          <p>{"(s = (u)(t) + (0.5)(a)(t²)"}</p>
          <p>{"(s) = (v)(t) + (0.5)(a)(t²)"}</p>
          <p>{"(s) = (0.5)((u) + (v))(t)"}</p>
          <p>{'Source: '}<a href="https://physics.info/motion-equations/">https://physics.info/motion-equations/</a></p>
        </div>
        

      </div>
    );
  }
}



function appRender () {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
}
export default App;

//<div className = "Github-link">
//{'Check out my GitHub! '}<a href="https://github.com/jenniferchen11/my-repository">https://github.com/jenniferchen11/my-repository</a>
//</div>