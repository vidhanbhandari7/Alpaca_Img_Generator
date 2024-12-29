import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  return (
    <div>
      <h1>Alpaca Image Generator</h1>
      <p>This is an Alpaca Image Generator. You will be able to customize
      a picture of an Alpaca using various features in real time. 
      View it below. </p>
      <Alpaca />
    </div>
  );
}

class Alpaca extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eyeColor: 'black',
      furColor: "grey",
      rightHornTilt: 30,
      leftHornTilt: -30
    };
    this.handleEyeColorChange = this.handleEyeColorChange.bind(this);
    this.canvasRef = React.createRef();

  }

  handleEyeColorChange = (color) => {
    this.setState({ eyeColor: color });
  };

  handlefurColorChange = (color) => {
    this.setState({furColor: color});
  };

  

  handleLeftHornTiltChange = (tilt) => {
    if(this.state.leftHornTilt < 0) {
      if(this.state.leftHornTilt > -70) {
        this.setState((state) => ({
        leftHornTilt: state.leftHornTilt + tilt
       }));
      } else if (this.state.leftHornTilt === -70) {
        if(this.state.leftHornTilt + tilt > -70) {
          this.setState((state) => ({
            leftHornTilt: state.leftHornTilt + tilt
           }));
        } else {
          return;
        }
      }
  } else if (this.state.leftHornTilt === 0) {
      if(this.state.leftHornTilt + tilt < 0) {
        this.setState((state) => ({
        leftHornTilt: state.leftHornTilt + tilt
        }));
  } else {
    return;
    }
    } 
  }


  handleRightHornTiltChange = (tilt) => {
    if(this.state.rightHornTilt > 0) {
      if(this.state.rightHornTilt < 70) {
        this.setState((state) => ({
        rightHornTilt: state.rightHornTilt + tilt
       }));
      } else if (this.state.rightHornTilt === 70) {
        if(this.state.rightHornTilt + tilt < 70) {
          this.setState((state) => ({
            rightHornTilt: state.rightHornTilt + tilt
           }));
        } else {
          return;
        }
      }
  } else if (this.state.rightHornTilt === 0) {
      if(this.state.rightHornTilt + tilt > 0) {
        this.setState((state) => ({
        rightHornTilt: state.rightHornTilt + tilt
        }));
  } else {
    return;
    }
    } 
  }

  randomizeAlpaca = () => {
    const randomEyeNumber = Math.floor(Math.random() * 3); 
    const possibleEyeColors = ["black", "brown", "blue"];
    this.setState({ eyeColor: possibleEyeColors[randomEyeNumber] });

    const randomFurNumber = Math.floor(Math.random() * 3);
    const possibleFurColors = ["blue", "grey", "peanut"];
    this.handlefurColorChange(possibleFurColors[randomFurNumber]);

    const leftHornTiltNumber = Math.floor(Math.random() * 8);
    const leftTiltIs = -leftHornTiltNumber * 10;
    this.setState({ leftHornTilt: leftTiltIs })

    const rightHornTiltNumber = Math.floor(Math.random() * 8);
    const rightTiltIs = rightHornTiltNumber * 10;
    this.setState({ rightHornTilt: rightTiltIs })

}

resetAlpaca = () => {
  this.setState({ eyeColor: "black" });
  this.setState({ furColor: "grey" });
  this.setState({ leftHornTilt: -30 });
  this.setState({ rightHornTilt: 30 });
}


  componentDidUpdate() {
    this.renderCanvas();
  }

  renderCanvas = () => {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
  
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Draw the body
    ctx.fillStyle =
      this.state.furColor === "grey"
        ? "rgb(214, 207, 207)"
        : this.state.furColor;
    ctx.beginPath();
    ctx.ellipse(150, 200, 80, 50, 0, 0, Math.PI * 2); // Body ellipse
    ctx.fill();
  
    // Draw the head
    ctx.fillStyle =
      this.state.furColor === "grey"
        ? "rgb(214, 207, 207)"
        : this.state.furColor;
    ctx.beginPath();
    ctx.arc(150, 100, 50, 0, Math.PI * 2); // Head circle
    ctx.fill();
  
    // Draw eyes
    ctx.fillStyle = this.state.eyeColor;
    ctx.beginPath();
    ctx.arc(130, 90, 10, 0, Math.PI * 2); // Left eye
    ctx.fill();
    ctx.beginPath();
    ctx.arc(170, 90, 10, 0, Math.PI * 2); // Right eye
    ctx.fill();
  
    // Draw mouth
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(150, 115, 15, 0, Math.PI, false); // Smile (semi-circle)
    ctx.stroke();
  
    // Draw left horn
    ctx.fillStyle = "rgb(180, 178, 178)"; // Horns are light grey
    ctx.save();
    ctx.translate(120, 40); // Left horn base position
    ctx.rotate((this.state.leftHornTilt * Math.PI) / 180); // Apply tilt
    ctx.fillRect(-5, -40, 10, 80); // Left horn rectangle
    ctx.restore();
  
    // Draw right horn
    ctx.save();
    ctx.translate(180, 40); // Right horn base position
    ctx.rotate((this.state.rightHornTilt * Math.PI) / 180); // Apply tilt
    ctx.fillRect(-5, -40, 10, 80); // Right horn rectangle
    ctx.restore();
  
    // Draw legs
    ctx.fillStyle = this.state.furColor === "grey" ? "rgb(180, 178, 178)" : this.state.furColor;
    ctx.fillRect(110, 250, 20, 70); // Front left leg
    ctx.fillRect(170, 250, 20, 70); // Front right leg
    ctx.fillRect(90, 240, 20, 80); // Rear left leg
    ctx.fillRect(190, 240, 20, 80); // Rear right leg
  };
  

  downloadImage = () => {
    const canvas = this.canvasRef.current;
    const link = document.createElement("a");
    link.download = "custom-alpaca.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  render() {

    
    return (
      
      <div id="alpaca-program">
            <div id="alpaca-image" className="alpaca-entity">
              <div id="alpaca-head" className="alpaca-entity">
                <div id="left-eye" className={`eye-${this.state.eyeColor}`}></div>
                <div id="right-eye" className={`eye-${this.state.eyeColor}`}></div>
                <div id="mouth">
                  <div id="mouth-former"></div>
                </div>
                <div id="left-horn" style={{ transform: `rotate(${this.state.leftHornTilt}deg)` }}></div>
                <div id="right-horn" style={{ transform: `rotate(${this.state.rightHornTilt}deg)` }}></div>
              </div>
              <div id="alpaca-body" className={`alpaca-entity fur-${this.state.furColor}`}></div>
              <div id="alpaca-legs" className="alpaca-entity">
                <div id="front-left-leg"></div>
                <div id="front-right-leg"></div>
                <div id="rear-left-leg"></div>
                <div id="rear-right-leg"></div>
              </div>
              <div id="alpaca-feet" className="alpaca-entity"></div>
            </div>
            <div id="interface">
              <h2>Alpaca Adjustor Controls</h2>
              <div id="adjust-alpaca">
                <div id="eye-adjustors">
                <h3>Adjust Eyes</h3>
              <button className="eye-btn btn" onClick={() => this.handleEyeColorChange('brown')}>Turn its eyes brown!</button>
              <button className="eye-btn btn" onClick={() => this.handleEyeColorChange('black')}>Turn its eyes black!</button>
              <button className="eye-btn btn" onClick={() => this.handleEyeColorChange('blue')}>Turn its eyes blue!</button>
              </div>
              <div id="fur-adjustors">
                <h3>Adjust Fur</h3>
                <button className="fur-btn btn" onClick={() => this.handlefurColorChange("blue")}>Give blue fur</button>
                <button className="fur-btn btn" onClick={() => this.handlefurColorChange("grey")}>Give grey fur</button>
                <button className="fur-btn btn" onClick={() => this.handlefurColorChange("peanut")}>Give peanut fur</button>
              </div>
              <div id="horn-tilt-adjustors">
                <h3>Adjust Horn Tilt</h3>
                <button className="horn-btn btn" onClick={() => this.handleLeftHornTiltChange(10)}>Tilt left horn clockwise</button>
                <button className="horn-btn btn" onClick={() => this.handleLeftHornTiltChange(-10)}>Tilt left horn counterclockwise</button>
                <button className="horn-btn btn" onClick={() => this.handleRightHornTiltChange(10)}> Tilt right horn clockwise</button>
                <button className="horn-btn btn" onClick={() => this.handleRightHornTiltChange(-10)}>Tilt right horn counterclockwise</button>
              </div>
              <div id="randomize-adjustor">
                <h3>Fun</h3>
                <button className="randomize-btn btn" onClick ={() => this.randomizeAlpaca()}>Randomize Alpaca</button>
                <button className="reset-btn btn" onClick={() => this.resetAlpaca()}>Reset Alpaca</button>
              </div>
              </div>
              <button onClick={this.downloadImage} className="download-btn btn">Download Alpaca</button>
            </div>
            <canvas
          ref={this.canvasRef}
          width={300}
          height={300}
          style={{ display: "none" }}
        ></canvas>
            </div>
            
    ); 
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

export default App;