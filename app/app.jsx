import React from 'react';
import ReactDOM  from 'react-dom';
import Game from "./components/Game.jsx";

ReactDOM.render(
    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        width: '100%', height: '100%'}}>
        <div id='startDiv'>
            <h1>БУНКЕР</h1>
            <form id='form'>
                <div>
                    <label>Количество игроков: </label>
                    <select name='count' style={{marginRight: '10px'}}>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                    </select>
                    <input type='radio' id='type1' name='type' value='Рандом' checked={true}/>
                    <label htmlFor="type1">Рандом</label>
                    <input type='radio' id='type2' name='type' value='Баланс'/>
                    <label htmlFor="type2">Баланс</label>
                </div>
                <br/>
                <input id='startButton' type='button' onClick={startGame} value='начать игру'/><br/>
                <a id='rules' href='#' target='_blank'>
                    <input type='button' value='правила' style={{marginTop: '10px'}}/>
                </a>
            </form>
        </div>
    </div>,
    document.getElementById("container")
);

function startGame() {
    ReactDOM.render(
        <Game count={document.forms.form.elements.count.value}
              type={document.forms.form.elements.type[0].checked === true ? 'Рандом' : 'Баланс'}/>,
        document.getElementById("container")
    );
}