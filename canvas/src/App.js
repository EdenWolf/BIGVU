import './App.css';
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";
import White from './pages/White';
import Blue from './pages/Blue';
import { useState } from 'react';
import { debounce } from "lodash";

// @TODO: add alt to img
//        get imgArr from api
//        check array

function App() {
  const imgArr = [
    {
      "name": "Daisi",
      "value": "https://bigvu-interviews-assets.s3.amazonaws.com/images/Daisi.png"
    },
    {
      "name": "Shiri",
      "value": "https://bigvu-interviews-assets.s3.amazonaws.com/images/Shiri.png"
    },
    {
      "name": "Sarha",
      "value": "https://bigvu-interviews-assets.s3.amazonaws.com/images/Sarha.png"
    },
    {
      "name": "Rivka",
      "value": "https://bigvu-interviews-assets.s3.amazonaws.com/images/Rivka.png"
    },
    {
      "name": "Noa",
      "value": "https://bigvu-interviews-assets.s3.amazonaws.com/images/Noa.png"
    },
    {
      "name": "Erika",
      "value": "https://bigvu-interviews-assets.s3.amazonaws.com/images/Erika.png"
    },
    {
      "name": "Eli",
      "value": "https://bigvu-interviews-assets.s3.amazonaws.com/images/Eli.png"
    }
  ];




  const [color, setColor] = useState({
    white: false,
    blue: false,
  });
  const [image, setImage] = useState("");
  const [alt, setAlt] = useState("");
  const [text, setText] = useState("");
  const [mode, setMode] = useState("0");

  function navClickWhite() {
    if (!color.white) {
      setColor({
        white: true,
        blue: false,
      });

      setImage("");
      setMode("0");
      setAlt("");
      setText("");
      document.getElementById("input").value = "";
      resetSelectElement();
    }
  }

  function navClickBlue() {
    if (!color.blue) {
      setColor({
        white: false,
        blue: true,
      })

      setImage("");
      setMode("0");
      setAlt("");
      setText("");
      document.getElementById("input").value = "";
      resetSelectElement();
    }
  }

  function clickImage(imgInd) {
    if (imgInd < imgArr.length && imgInd >= 0) {
      setImage(imgArr[imgInd].value);
      setAlt(imgArr[imgInd].name);
    }
    var img = new Image();
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext('2d');
    img.onload = () => {
      console.log(img.alt);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, 640, 360);
    }
    img.src = image;
    img.alt = alt;
  }

  function resetSelectElement() {
    let selecElements = document.getElementsByClassName("mySelect");
    if (selecElements[0].selectedIndex !== 0) {
      selecElements[0].selectedIndex = 0;
    }
    selecElements[1].selectedIndex = "0";

  }

  function clickMode(modeInd) {
    if (modeInd === "0") setMode("0");
    if (modeInd === "1") setMode("1");
  }

  const textOnChange = debounce(text => { setText(text) }, 500);

  const pathname = window.location.pathname;

  return (
    <Router>
      <div className="header">
        <nav>
          <ul>
            <li><Link to="/white" onClick={navClickWhite} id={pathname === "/white" ? "chosencolor" : ""}>White</Link></li>
            <li><Link to="/blue" onClick={navClickBlue} id={pathname === "/blue" ? "chosencolor" : ""}>Blue</Link></li>
          </ul>
        </nav>
      </div>
      <div className="container">
        <div className="menuItem">
          <select className="mySelect" id="mySelect" onChange={e => clickImage(e.target.value - 1)}>
            <option value="0">Choose Background</option>
            {imgArr.map((img, index) => <option value={index + 1}>{img.name}</option>)}
          </select>
        </div>
        <div className="menuItem">
          <input id="input" type="text" name="name" autoComplete="off" onChange={e => textOnChange(e.target.value)} placeholder="Display Text" />
        </div>
        <div className="menuItem">
          <select className="mySelect" onChange={e => clickMode(e.target.value)}>
            <option value="0">Normal Mode</option>
            <option value="1">2/3 Mode</option>
          </select>
        </div>
      </div>
      <Switch>
        <Route path="/white">
          <White image={image} imageText={text} imageAlt={alt} mode={mode} />
        </Route>
        <Route path="/blue">
          <Blue image={image} imageText={text} imageAlt={alt} mode={mode} />
        </Route>
      </Switch>
    </Router >
  );
}

export default App;
