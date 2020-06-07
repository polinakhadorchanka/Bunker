import React from 'react';

export default class UserCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='userCard'>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <div>
                        <b>Игрок {this.props.index + 1}</b><br/>
                        <a download={`Игрок${this.props.index+1}.txt`} id={`Игрок${this.props.index+1}`} href="#"
                           onClick={(e) => e.target.style.color = 'blue'}>Скачать</a>
                    </div>
                    <div style={{marginLeft: 'auto', width: '170px'}}>
                        <select id={'select' + this.props.index} name='count' style={{marginRight: '10px', height: '21px', width: '100%', marginBottom: '5px'}}>
                            <option>Биологические данные</option>
                            <option>Профессия</option>
                            <option>Фобия</option>
                            <option>Состояние здоровья</option>
                            <option>Багаж</option>
                            <option>Хобби</option>
                            <option>Черта характера</option>
                            <option>Доп. информация</option>
                            <option>Все характеристики</option>
                        </select><br/>
                        <input type='button' value='Изменить' style={{width: '100%'}}
                               onClick={(e) => this.props.editUserCard(e, this.props.index,
                                   document.getElementById(`select${this.props.index}`).value)}/>
                    </div>
                </div>
                <br/>
                <div style={this.props.open !== true ? {display: 'none'} : undefined}>
                    <b>Пол, возраст: </b>{this.props.userCard.gender.value}
                    {this.props.userCard.childfree === true ?
                        <i>, Чайлдфри</i> : undefined}<br/>
                    <b>Профессия: </b>{this.props.userCard.profession.value} <br/>
                    <b>Состояние здоровья: </b>{this.props.userCard.health.value} <br/>
                    <b>Фобия: </b>{this.props.userCard.phobia.value} <br/>
                    <b>Хобби: </b>{this.props.userCard.hobby.value} <br/>
                    <b>Черта зарактера: </b>{this.props.userCard.character.value} <br/>
                    <b>Доп. информация:</b> {this.props.userCard.info.value} <br/>
                    <b>Багаж: </b>{this.props.userCard.baggage.value} <br/>
                    <b>Карта действий №1: </b>{this.props.userCard.action1.value} <br/>
                    <b>Карта действий №2: </b>{this.props.userCard.action2.value}
                    {this.props.userCard.card1 === true ?
                        <div><br/><i>Справа от вас друг. Если он не попадает в бункер, вы проигрываете.</i></div> : undefined}
                    {this.props.userCard.card2 === true ?
                        <div><br/><i>Слева от вас друг. Если он не попадает в бункер, вы проигрываете.</i></div> : undefined}
                    {this.props.userCard.card3 === true && this.props.userCard.card1 !== true ?
                        <div><br/><i>Справа от вас враг. Если он попадает в бункер вместе с вами, вы проигрываете.</i></div> : undefined}
                    {this.props.userCard.card4 === true  && this.props.userCard.card2 !== true ?
                        <div><br/><i>Слева от вас враг. Если он попадает в бункер вместе с вами, вы проигрываете.</i></div> : undefined}
                </div>
            </div>

        );
    }
}