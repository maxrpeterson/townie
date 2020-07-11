import React from 'react';  
import './style.css';  

class Popup extends React.Component {  
  render() {  
    return (  
        <div className='popup'>  
        <div className='popup\_inner'>  
            <h1>{"yo yo yo yo"}</h1>  
            <button onClick={this.props.closePopup}>close me</button>  
        </div>  
        </div>  
        );  
    }  
}  

export default Popup;