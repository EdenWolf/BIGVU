import './App.css';
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";
import White from './pages/White';
import Blue from './pages/Blue';
import { useState, useEffect } from 'react';
import { debounce } from "lodash";
import axios from 'axios';

function App() {

  const [imgArr, setImgArr] = useState(null);
  const [color, setColor] = useState({
    white: false,
    blue: false,
  });
  var [image, setImage] = useState("");
  var [alt, setAlt] = useState("");
  var [text, setText] = useState("");
  var [mode23, setMode] = useState(false);
  var canvas = null;
  var ctx = null;
  var img = new Image();

  useEffect(() => {
    axios.get("/presenters.json")
      .then(res => {
        setImgArr(res.data);
      })
  }, []);

  function navClickWhite() {
    if (!color.white) {
      setColor({
        white: true,
        blue: false,
      });

      setImage("");
      setMode(false);
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
      setMode(false);
      setAlt("");
      setText("");
      document.getElementById("input").value = "";
      resetSelectElement();
    }
  }

  function clickImage(imgInd) {
    if (imgInd < imgArr.length && imgInd >= 0) {
      image = (imgArr[imgInd].value);
      alt = (imgArr[imgInd].name);
    }

    canvas = document.getElementById("myCanvas");
    if (canvas) {
      ctx = canvas.getContext('2d');
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawImageOnCanvas();
        if (text !== "") {
          changeText(text);
        }
      }
      img.src = image;
      img.alt = alt;
    }
  }

  const drawImageOnCanvas = () => {
    if (!mode23) {
      ctx.drawImage(img, 0, 0, 640, 360);
    }
    else {
      ctx.drawImage(img, -215, 0, 640, 360);
    }
  }

  function resetSelectElement() {
    let selecElements = document.getElementsByClassName("mySelect");
    if (selecElements[0].selectedIndex !== 0) {
      selecElements[0].selectedIndex = 0;
    }
    selecElements[1].selectedIndex = "0";

  }

  function clickMode(modeInd) {
    if (modeInd === "0") {
      mode23 = false;
      canvas.classList.remove('canvas23');
      changeText(text);
    };
    if (modeInd === "1") {
      mode23 = true;
      canvas.classList.add('canvas23');
      changeText(text);
    };
  }

  const textOnChange = debounce(t => {
    changeText(t);
  }, 500);

  const changeText = t => {
    if (!canvas) {
      canvas = document.getElementById("myCanvas");
      ctx = canvas.getContext('2d');
    }
    if (canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawImageOnCanvas();

      ctx.textAlign = "center";
      ctx.font = "50px Inter";
      if (!mode23) {
        ctx.fillStyle = "white";
        ctx.fillText(t, 320, 180);
      }
      else {
        ctx.fillStyle = "black";
        ctx.fillText(t, 530, 180);
      }
      text = t;
    }
  }

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
            {imgArr ? imgArr.map((img, index) => <option value={index + 1}>{img.name}</option>) : null}
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
          <White />
        </Route>
        <Route path="/blue">
          <Blue />
        </Route>
      </Switch>
    </Router >
  );
}

export default App;
